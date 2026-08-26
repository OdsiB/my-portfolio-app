import React, { useEffect, useRef } from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

// Color definitions for each theme mode tailored to the dripping slime effect
interface SlimeThemePalette {
  canvasBg: string;
  gradient: {
    start: string; // Left/Top (e.g. Cyan)
    mid1: string;  // Mid-upper (e.g. Sky Blue / Purple)
    mid2: string;  // Mid-lower (e.g. Neon Magenta)
    end: string;   // Bottom / Drips (e.g. Hot Pink)
  };
  highlightLight: string; // Top rim highlight
  highlightAccent: string; // Bottom rim highlight
  holeRimCyan: string;
  holeRimPink: string;
  bubbleColor: string;
  glowColor: string;
}

const SLIME_PALETTES: Record<ThemeMode, SlimeThemePalette> = {
  'black-blue': {
    canvasBg: '#090a12',
    gradient: {
      start: '#00f0ff',   // Electric Cyan
      mid1: '#2563eb',    // Vibrant Royal Blue
      mid2: '#9333ea',    // Neon Purple
      end: '#ec4899',     // Vivid Hot Magenta
    },
    highlightLight: 'rgba(255, 255, 255, 0.95)',
    highlightAccent: 'rgba(255, 120, 230, 0.85)',
    holeRimCyan: 'rgba(0, 240, 255, 0.75)',
    holeRimPink: 'rgba(236, 72, 153, 0.8)',
    bubbleColor: 'rgba(200, 245, 255, 0.8)',
    glowColor: 'rgba(0, 240, 255, 0.25)',
  },
  'black-red': {
    canvasBg: '#0a0507',
    gradient: {
      start: '#ff3366',   // Neon Coral Rose
      mid1: '#ef4444',    // Bright Red
      mid2: '#b91c1c',    // Deep Crimson
      end: '#701a28',     // Dark Burgundy Wine
    },
    highlightLight: 'rgba(255, 255, 255, 0.95)',
    highlightAccent: 'rgba(255, 100, 130, 0.85)',
    holeRimCyan: 'rgba(255, 100, 140, 0.75)',
    holeRimPink: 'rgba(255, 50, 80, 0.8)',
    bubbleColor: 'rgba(255, 220, 230, 0.8)',
    glowColor: 'rgba(239, 68, 68, 0.25)',
  },
  'black-teal': {
    canvasBg: '#050c0c',
    gradient: {
      start: '#00ffd5',   // Bright Neon Teal
      mid1: '#0d9488',    // Deep Jade
      mid2: '#059669',    // Vivid Emerald
      end: '#064e3b',     // Deep Pine Green
    },
    highlightLight: 'rgba(255, 255, 255, 0.95)',
    highlightAccent: 'rgba(45, 212, 191, 0.85)',
    holeRimCyan: 'rgba(0, 255, 213, 0.75)',
    holeRimPink: 'rgba(16, 185, 129, 0.8)',
    bubbleColor: 'rgba(200, 255, 240, 0.8)',
    glowColor: 'rgba(13, 148, 136, 0.25)',
  },
  'black-white': {
    canvasBg: '#0a0a0a',
    gradient: {
      start: '#ffffff',   // Pure White
      mid1: '#cbd5e1',    // Slate Silver
      mid2: '#64748b',    // Chrome Steel
      end: '#1e293b',     // Deep Charcoal
    },
    highlightLight: 'rgba(255, 255, 255, 0.95)',
    highlightAccent: 'rgba(203, 213, 225, 0.85)',
    holeRimCyan: 'rgba(255, 255, 255, 0.75)',
    holeRimPink: 'rgba(148, 163, 184, 0.7)',
    bubbleColor: 'rgba(255, 255, 255, 0.8)',
    glowColor: 'rgba(255, 255, 255, 0.15)',
  },
  'editorial': {
    canvasBg: '#f6f5f0',
    gradient: {
      start: '#44403c',   // Warm Charcoal
      mid1: '#78716c',    // Warm Taupe
      mid2: '#a8a29e',    // Stone
      end: '#d6d3d1',     // Soft Sand
    },
    highlightLight: 'rgba(255, 255, 255, 0.9)',
    highlightAccent: 'rgba(214, 211, 209, 0.85)',
    holeRimCyan: 'rgba(120, 113, 108, 0.7)',
    holeRimPink: 'rgba(87, 83, 78, 0.75)',
    bubbleColor: 'rgba(255, 255, 255, 0.9)',
    glowColor: 'rgba(120, 113, 108, 0.15)',
  },
};

interface Particle {
  xPct: number;
  yPct: number;
  size: number;
  phase: number;
  speed: number;
  baseAlpha: number;
}

interface DetachedDrop {
  xPct: number;
  yPct: number;
  baseYPct: number;
  radiusX: number;
  radiusY: number;
  phase: number;
  speed: number;
  colorType: 'cyan' | 'pink' | 'purple';
}

interface SlimeHole {
  cxPct: number;
  cyPct: number;
  rxPct: number;
  ryPct: number;
  rotation: number;
  phase: number;
  speed: number;
  rimColor: 'cyan' | 'pink';
}

export const LiveBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.2,
    targetX: 0.5,
    targetY: 0.2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Floating shiny specks / sparkles inside the slime
    const particles: Particle[] = Array.from({ length: 42 }, () => ({
      xPct: 0.05 + Math.random() * 0.9,
      yPct: 0.02 + Math.random() * 0.48,
      size: 1.2 + Math.random() * 2.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.004,
      baseAlpha: 0.3 + Math.random() * 0.55,
    }));

    // Hanging & dripping detached droplets (as in the reference image)
    const detachedDrops: DetachedDrop[] = [
      { xPct: 0.33, yPct: 0.76, baseYPct: 0.76, radiusX: 9, radiusY: 16, phase: 0.5, speed: 0.0025, colorType: 'pink' },
      { xPct: 0.67, yPct: 0.72, baseYPct: 0.72, radiusX: 6, radiusY: 10, phase: 1.8, speed: 0.003, colorType: 'cyan' },
      { xPct: 0.66, yPct: 0.25, baseYPct: 0.25, radiusX: 7, radiusY: 12, phase: 3.1, speed: 0.002, colorType: 'cyan' },
      { xPct: 0.64, yPct: 0.12, baseYPct: 0.12, radiusX: 5, radiusY: 8, phase: 4.2, speed: 0.0035, colorType: 'cyan' },
      { xPct: 0.41, yPct: 0.09, baseYPct: 0.09, radiusX: 6, radiusY: 10, phase: 2.2, speed: 0.0028, colorType: 'cyan' },
      { xPct: 0.56, yPct: 0.53, baseYPct: 0.53, radiusX: 7, radiusY: 5, phase: 1.1, speed: 0.002, colorType: 'pink' },
    ];

    // Webbed Negative Oval Holes (Cutouts in the slime web)
    const holes: SlimeHole[] = [
      // Left wing holes (elongated diagonal slits)
      { cxPct: 0.05, cyPct: 0.14, rxPct: 0.065, ryPct: 0.045, rotation: -0.4, phase: 0.2, speed: 0.0018, rimColor: 'cyan' },
      { cxPct: 0.13, cyPct: 0.18, rxPct: 0.055, ryPct: 0.038, rotation: 0.35, phase: 1.1, speed: 0.0015, rimColor: 'cyan' },
      { cxPct: 0.06, cyPct: 0.26, rxPct: 0.048, ryPct: 0.032, rotation: 0.1, phase: 2.3, speed: 0.002, rimColor: 'pink' },
      { cxPct: 0.18, cyPct: 0.31, rxPct: 0.075, ryPct: 0.04, rotation: -0.3, phase: 3.4, speed: 0.0016, rimColor: 'pink' },
      { cxPct: 0.28, cyPct: 0.43, rxPct: 0.08, ryPct: 0.042, rotation: 0.48, phase: 0.8, speed: 0.0017, rimColor: 'pink' },

      // Center deep hanging cavity (The big center dark opening)
      { cxPct: 0.52, cyPct: 0.28, rxPct: 0.11, ryPct: 0.16, rotation: 0.05, phase: 1.5, speed: 0.0012, rimColor: 'cyan' },
      { cxPct: 0.41, cyPct: 0.29, rxPct: 0.024, ryPct: 0.09, rotation: -0.1, phase: 2.1, speed: 0.0019, rimColor: 'pink' },
      { cxPct: 0.65, cyPct: 0.56, rxPct: 0.052, ryPct: 0.025, rotation: -0.45, phase: 2.8, speed: 0.0022, rimColor: 'pink' },

      // Right wing holes (slits branching out)
      { cxPct: 0.79, cyPct: 0.15, rxPct: 0.07, ryPct: 0.055, rotation: 0.45, phase: 0.7, speed: 0.0016, rimColor: 'cyan' },
      { cxPct: 0.88, cyPct: 0.23, rxPct: 0.06, ryPct: 0.04, rotation: -0.35, phase: 1.9, speed: 0.0018, rimColor: 'cyan' },
      { cxPct: 0.96, cyPct: 0.22, rxPct: 0.045, ryPct: 0.035, rotation: 0.2, phase: 3.2, speed: 0.0021, rimColor: 'cyan' },
      { cxPct: 0.83, cyPct: 0.35, rxPct: 0.065, ryPct: 0.032, rotation: 0.4, phase: 2.5, speed: 0.0015, rimColor: 'cyan' },
    ];

    let animId: number;

    const render = (time: number) => {
      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const palette = SLIME_PALETTES[theme] || SLIME_PALETTES['black-blue'];

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Canvas Dark Base Background
      ctx.fillStyle = palette.canvasBg;
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric deep ambient gradient
      const ambientGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        width * 0.05,
        width * 0.5,
        height * 0.35,
        width * 0.7
      );
      ambientGlow.addColorStop(0, palette.glowColor);
      ambientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Build Slime Main Body Shape
      // We calculate a series of undulating Bézier control points across the width
      const mouseInfluenceX = (mouseRef.current.x - 0.5) * 40;
      const mouseInfluenceY = (mouseRef.current.y - 0.2) * 50;

      // Base drip parameters for the 5 hanging major tendrils
      const t = time * 0.001;

      // Slime Body Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);

      // Right drip edge down
      const rightEdgeY = height * 0.65 + Math.sin(t * 1.2 + 2) * 12;
      ctx.lineTo(width, rightEdgeY);

      // Step along bottom contour using smooth cubic beziers
      // Segment 5 (Rightmost arch)
      const p5_end_x = width * 0.78;
      const p5_end_y = height * 0.28 + Math.sin(t * 1.1 + 1) * 10;
      const p5_cp1_x = width * 0.94;
      const p5_cp1_y = height * 0.42 + Math.cos(t * 0.9 + 2) * 15;
      const p5_cp2_x = width * 0.85;
      const p5_cp2_y = height * 0.29 + Math.sin(t * 1.3) * 12;
      ctx.bezierCurveTo(p5_cp1_x, p5_cp1_y, p5_cp2_x, p5_cp2_y, p5_end_x, p5_end_y);

      // Segment 4 (Right-center lobe)
      const p4_end_x = width * 0.62;
      const p4_end_y = height * 0.46 + Math.cos(t * 0.8 + 4) * 14 + mouseInfluenceY * 0.2;
      const p4_cp1_x = width * 0.72;
      const p4_cp1_y = height * 0.31 + Math.sin(t * 1.2 + 3) * 10;
      const p4_cp2_x = width * 0.67;
      const p4_cp2_y = height * 0.48 + Math.cos(t * 1.4) * 12;
      ctx.bezierCurveTo(p4_cp1_x, p4_cp1_y, p4_cp2_x, p4_cp2_y, p4_end_x, p4_end_y);

      // Segment 3 (The Deep Center Dripping Hanging U-Sag)
      const centerDipX = width * 0.48 + mouseInfluenceX * 0.3;
      const centerDipY = height * 0.72 + Math.sin(t * 0.9 + 1) * 18 + mouseInfluenceY * 0.4;
      const p3_cp1_x = width * 0.58;
      const p3_cp1_y = height * 0.55 + Math.sin(t * 1.1 + 2) * 15;
      const p3_cp2_x = width * 0.53 + mouseInfluenceX * 0.2;
      const p3_cp2_y = centerDipY + 6;
      ctx.bezierCurveTo(p3_cp1_x, p3_cp1_y, p3_cp2_x, p3_cp2_y, centerDipX, centerDipY);

      // Segment 2 (Left-center ascending U-curve)
      const p2_end_x = width * 0.22;
      const p2_end_y = height * 0.34 + Math.cos(t * 1.2 + 2) * 12;
      const p2_cp1_x = width * 0.38 - mouseInfluenceX * 0.1;
      const p2_cp1_y = centerDipY - 8;
      const p2_cp2_x = width * 0.31;
      const p2_cp2_y = height * 0.45 + Math.sin(t * 1.0 + 4) * 14;
      ctx.bezierCurveTo(p2_cp1_x, p2_cp1_y, p2_cp2_x, p2_cp2_y, p2_end_x, p2_end_y);

      // Segment 1 (Leftmost drooping wing)
      const p1_end_x = 0;
      const p1_end_y = height * 0.68 + Math.sin(t * 1.1) * 14;
      const p1_cp1_x = width * 0.14;
      const p1_cp1_y = height * 0.31 + Math.cos(t * 1.3) * 10;
      const p1_cp2_x = width * 0.05;
      const p1_cp2_y = height * 0.45 + Math.sin(t * 0.9 + 1) * 12;
      ctx.bezierCurveTo(p1_cp1_x, p1_cp1_y, p1_cp2_x, p1_cp2_y, p1_end_x, p1_end_y);

      ctx.closePath();

      // Multi-stop Rich Slime Gradient across the canvas
      const slimeGrad = ctx.createLinearGradient(0, 0, width, height * 0.75);
      slimeGrad.addColorStop(0.0, palette.gradient.start);  // Cyan
      slimeGrad.addColorStop(0.35, palette.gradient.mid1);  // Royal Blue
      slimeGrad.addColorStop(0.65, palette.gradient.mid2);  // Neon Purple
      slimeGrad.addColorStop(1.0, palette.gradient.end);    // Hot Pink

      ctx.fillStyle = slimeGrad;
      ctx.fill();

      // 3. Cut out the Webbed Oval Slits (Holes in the slime web)
      // We use 'destination-out' compositing to punch clean holes through the slime
      ctx.globalCompositeOperation = 'destination-out';

      holes.forEach((hole) => {
        const hTime = t * hole.speed * 1000 + hole.phase;
        const wobbleX = Math.sin(hTime) * (hole.rxPct * 0.12 * width);
        const wobbleY = Math.cos(hTime * 0.8) * (hole.ryPct * 0.12 * height);

        const hx = hole.cxPct * width + (mouseRef.current.x - 0.5) * 15;
        const hy = hole.cyPct * height + (mouseRef.current.y - 0.2) * 18;
        const hrx = Math.max(8, hole.rxPct * width + wobbleX);
        const hry = Math.max(8, hole.ryPct * height + wobbleY);

        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(hole.rotation + Math.sin(hTime * 0.5) * 0.08);

        ctx.beginPath();
        ctx.ellipse(0, 0, hrx, hry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.restore(); // Restore globalCompositeOperation to 'source-over'

      // 4. Render Glowing Gloss Rims Around the Cutout Holes (The Cel-shaded 3D look)
      ctx.save();
      holes.forEach((hole) => {
        const hTime = t * hole.speed * 1000 + hole.phase;
        const wobbleX = Math.sin(hTime) * (hole.rxPct * 0.12 * width);
        const wobbleY = Math.cos(hTime * 0.8) * (hole.ryPct * 0.12 * height);

        const hx = hole.cxPct * width + (mouseRef.current.x - 0.5) * 15;
        const hy = hole.cyPct * height + (mouseRef.current.y - 0.2) * 18;
        const hrx = Math.max(8, hole.rxPct * width + wobbleX);
        const hry = Math.max(8, hole.ryPct * height + wobbleY);

        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(hole.rotation + Math.sin(hTime * 0.5) * 0.08);

        // Highlight rim on top-left of the hole
        ctx.beginPath();
        ctx.ellipse(0, 0, hrx + 1.5, hry + 1.5, 0, Math.PI * 0.8, Math.PI * 1.6);
        ctx.strokeStyle = hole.rimColor === 'cyan' ? palette.holeRimCyan : palette.holeRimPink;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Subtle specular glint arc on the inner border
        ctx.beginPath();
        ctx.ellipse(-hrx * 0.1, -hry * 0.1, hrx * 0.75, hry * 0.75, 0, Math.PI * 0.9, Math.PI * 1.35);
        ctx.strokeStyle = palette.highlightLight;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.restore();
      });
      ctx.restore();

      // 5. Render Specular Gloss Highlights on Main Slime Surface Curves
      ctx.save();

      // Top wave specular highlight stroke (Cyan / White glassy light ribbon)
      ctx.beginPath();
      const topWaveY = height * 0.06 + Math.sin(t * 0.8) * 6;
      ctx.moveTo(width * 0.08, topWaveY);
      ctx.bezierCurveTo(
        width * 0.25,
        height * 0.08 + Math.sin(t) * 8,
        width * 0.45,
        height * 0.04 + Math.cos(t * 0.9) * 7,
        width * 0.65,
        height * 0.09 + Math.sin(t * 1.1) * 9
      );
      ctx.strokeStyle = palette.highlightLight;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Secondary glossy rim along bottom center lobe
      ctx.beginPath();
      ctx.arc(centerDipX, centerDipY - 14, Math.min(width * 0.14, 110), 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.strokeStyle = palette.highlightAccent;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // White inner specular glint on the big center hanging bulb
      ctx.beginPath();
      ctx.ellipse(centerDipX - 12, centerDipY - 24, 18, 9, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fill();

      // Specular glare spots on the left and right tendrils
      ctx.beginPath();
      ctx.ellipse(width * 0.26, height * 0.52, 14, 7, -0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(width * 0.71, height * 0.28, 12, 6, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();

      ctx.restore();

      // 6. Draw Detached Dripping / Floating Droplets (with 3D glassy reflections)
      detachedDrops.forEach((drop) => {
        const dPhase = t * drop.speed * 1000 + drop.phase;
        const bobY = Math.sin(dPhase) * 14;
        const stretchY = 1 + Math.cos(dPhase) * 0.15;
        const stretchX = 1 - Math.cos(dPhase) * 0.1;

        const dx = drop.xPct * width + (mouseRef.current.x - 0.5) * 12;
        const dy = drop.baseYPct * height + bobY;

        ctx.save();
        ctx.translate(dx, dy);

        // Droplet body gradient
        const dropGrad = ctx.createLinearGradient(0, -drop.radiusY, 0, drop.radiusY);
        if (drop.colorType === 'cyan') {
          dropGrad.addColorStop(0, palette.gradient.start);
          dropGrad.addColorStop(1, palette.gradient.mid1);
        } else {
          dropGrad.addColorStop(0, palette.gradient.mid2);
          dropGrad.addColorStop(1, palette.gradient.end);
        }

        ctx.beginPath();
        ctx.ellipse(0, 0, drop.radiusX * stretchX, drop.radiusY * stretchY, 0, 0, Math.PI * 2);
        ctx.fillStyle = dropGrad;
        ctx.fill();

        // Droplet top-left specular highlight dot
        ctx.beginPath();
        ctx.ellipse(
          -drop.radiusX * 0.35,
          -drop.radiusY * 0.35,
          drop.radiusX * 0.3,
          drop.radiusY * 0.2,
          -0.3,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Droplet outer glowing rim
        ctx.beginPath();
        ctx.ellipse(0, 0, drop.radiusX * stretchX, drop.radiusY * stretchY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = palette.highlightLight;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

      // 7. Render Glowing Sparkling Micro-Specks inside the slime
      ctx.save();
      particles.forEach((p) => {
        const pTime = t * p.speed * 1000 + p.phase;
        const alpha = p.baseAlpha * (0.4 + 0.6 * Math.sin(pTime));
        const px = p.xPct * width + Math.sin(pTime * 0.5) * 8;
        const py = p.yPct * height + Math.cos(pTime * 0.5) * 8;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = palette.bubbleColor.replace('0.8', alpha.toFixed(3));
        ctx.fill();

        // Star sparkle cross for larger specks
        if (p.size > 2.2) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.8).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(px - p.size * 2, py);
          ctx.lineTo(px + p.size * 2, py);
          ctx.moveTo(px, py - p.size * 2);
          ctx.lineTo(px, py + p.size * 2);
          ctx.stroke();
        }
      });
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, [theme]);

  return (
    <div
      id="live-slime-background"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* High-DPI Dripping Neon Slime Goo Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-25 sm:opacity-30 transition-opacity duration-700"
      />

      {/* Atmospheric Contrast Shield & Vignette Overlay for Crisp Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-canvas)]/40 to-[var(--bg-canvas)]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_var(--bg-canvas)_100%)] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
    </div>
  );
};

