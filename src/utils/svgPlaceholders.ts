/**
 * Generates minimalist, editorial SVG placeholder graphics.
 * These act as clean, crisp visual placeholders until real project media is inserted.
 */

export function createEditorialPoster(
  title: string,
  category: string,
  year: string,
  accent = '#2563EB',
  variant: 'video' | 'graphic' | 'thesis' | 'ui' | 'portrait' | 'in-production' | 'empty' = 'graphic',
  aspect: 'portrait' | 'landscape' | 'square' | 'wide' = 'landscape'
): string {
  const width = aspect === 'portrait' ? 800 : aspect === 'wide' ? 1400 : aspect === 'square' ? 900 : 1200;
  const height = aspect === 'portrait' ? 1200 : aspect === 'wide' ? 700 : aspect === 'square' ? 900 : 800;

  const bgTone = variant === 'video' || variant === 'in-production' || variant === 'empty' ? '#0f1117' : variant === 'thesis' ? '#141414' : '#f0eee8';
  const textTone = variant === 'video' || variant === 'thesis' || variant === 'in-production' || variant === 'empty' ? '#f5f4ef' : '#141413';
  const subtleTone = variant === 'video' || variant === 'thesis' || variant === 'in-production' || variant === 'empty' ? '#717888' : '#8c8a82';
  const gridTone = variant === 'video' || variant === 'thesis' || variant === 'in-production' || variant === 'empty' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';

  const isDark = variant === 'video' || variant === 'thesis' || variant === 'in-production' || variant === 'empty';

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${bgTone}"/>
  
  <!-- Subtle Architectural Grid -->
  <line x1="40" y1="40" x2="${width - 40}" y2="40" stroke="${gridTone}" stroke-width="1"/>
  <line x1="40" y1="${height - 40}" x2="${width - 40}" y2="${height - 40}" stroke="${gridTone}" stroke-width="1"/>
  <line x1="40" y1="40" x2="40" y2="${height - 40}" stroke="${gridTone}" stroke-width="1"/>
  <line x1="${width - 40}" y1="40" x2="${width - 40}" y2="${height - 40}" stroke="${gridTone}" stroke-width="1"/>
  
  <!-- Center Axis Markers -->
  <line x1="${width / 2}" y1="40" x2="${width / 2}" y2="${height - 40}" stroke="${gridTone}" stroke-width="1" stroke-dasharray="4 8"/>
  <line x1="40" y1="${height / 2}" x2="${width - 40}" y2="${height / 2}" stroke="${gridTone}" stroke-width="1" stroke-dasharray="4 8"/>
  
  <!-- Geometric Editorial Composition -->
  ${variant === 'in-production' || variant === 'empty' ? `
    <!-- Film slate and film reel in-production graphics -->
    <rect x="${width * 0.25}" y="${height * 0.28}" width="${width * 0.5}" height="${height * 0.44}" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="6 6"/>
    <circle cx="${width / 2}" cy="${height / 2}" r="65" fill="none" stroke="${gridTone}" stroke-width="2"/>
    <circle cx="${width / 2}" cy="${height / 2}" r="6" fill="${accent}"/>
    
    <!-- Status Pill in Center -->
    <rect x="${width / 2 - 110}" y="${height / 2 + 35}" width="220" height="30" fill="rgba(37,99,235,0.15)" stroke="${accent}" stroke-width="1"/>
    <text x="${width / 2}" y="${height / 2 + 55}" font-family="monospace" font-size="11" font-weight="700" fill="${accent}" text-anchor="middle" letter-spacing="2">IN POST-PRODUCTION</text>
    
    <!-- Timecode / Slot ID -->
    <text x="64" y="80" font-family="monospace" font-size="12" fill="${subtleTone}" letter-spacing="2">ARCHIVE SLOT // ASSET RESERVED</text>
    <text x="${width - 64}" y="80" font-family="monospace" font-size="12" fill="${accent}" text-anchor="end" letter-spacing="1">STATUS: IN PROGRESS</text>
  ` : variant === 'video' ? `
    <!-- Playframe timecode markers & aperture lines -->
    <circle cx="${width / 2}" cy="${height / 2}" r="80" fill="none" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.8"/>
    <circle cx="${width / 2}" cy="${height / 2}" r="4" fill="${accent}"/>
    <polygon points="${width / 2 - 12},${height / 2 - 20} ${width / 2 - 12},${height / 2 + 20} ${width / 2 + 18},${height / 2}" fill="${textTone}" fill-opacity="0.9"/>
    
    <!-- Timecode & Format Badge -->
    <text x="64" y="80" font-family="monospace" font-size="13" fill="${subtleTone}" letter-spacing="2">REC [00:24:16:08]</text>
    <text x="${width - 64}" y="80" font-family="monospace" font-size="13" fill="${accent}" text-anchor="end" letter-spacing="1">4K • 24 FPS</text>
  ` : variant === 'thesis' ? `
    <!-- Blueprint / System Architecture lines -->
    <rect x="${width * 0.2}" y="${height * 0.28}" width="${width * 0.6}" height="${height * 0.44}" fill="none" stroke="${gridTone}" stroke-width="2"/>
    <rect x="${width * 0.24}" y="${height * 0.33}" width="${width * 0.22}" height="${height * 0.34}" fill="none" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.7"/>
    <rect x="${width * 0.54}" y="${height * 0.33}" width="${width * 0.22}" height="${height * 0.34}" fill="none" stroke="${subtleTone}" stroke-width="1" stroke-dasharray="3 3"/>
    
    <text x="64" y="80" font-family="monospace" font-size="13" fill="${subtleTone}" letter-spacing="2">STAGE ARCHITECTURE // SYSTEM DESIGN</text>
    <text x="${width - 64}" y="80" font-family="monospace" font-size="13" fill="${accent}" text-anchor="end" letter-spacing="1">COMPLETED 04/2026</text>
  ` : `
    <!-- Graphic Composition / Layout Frames -->
    <rect x="${width * 0.15}" y="${height * 0.22}" width="${width * 0.7}" height="${height * 0.56}" fill="none" stroke="${gridTone}" stroke-width="1.5"/>
    <circle cx="${width * 0.35}" cy="${height * 0.48}" r="110" fill="none" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
    <line x1="${width * 0.15}" y1="${height * 0.22}" x2="${width * 0.85}" y2="${height * 0.78}" stroke="${gridTone}" stroke-width="1"/>
    
    <text x="64" y="80" font-family="monospace" font-size="13" fill="${subtleTone}" letter-spacing="2">STUDIO ARCHIVE // EDITORIAL</text>
    <text x="${width - 64}" y="80" font-family="monospace" font-size="13" fill="${subtleTone}" text-anchor="end" letter-spacing="1">VOL. ${year}</text>
  `}

  <!-- Title & Category typography block -->
  <g transform="translate(64, ${height - 90})">
    <text x="0" y="0" font-family="system-ui, sans-serif" font-weight="800" font-size="${width < 900 ? '22' : '30'}" fill="${textTone}" letter-spacing="-0.5">${title.toUpperCase()}</text>
    <text x="0" y="30" font-family="system-ui, sans-serif" font-weight="500" font-size="13" fill="${subtleTone}" letter-spacing="1.5">${category.toUpperCase()} • ${year}</text>
  </g>

  <!-- Corner Crop Marks -->
  <path d="M 24 40 L 40 40 M 40 24 L 40 40" stroke="${isDark ? '#444' : '#bbb'}" stroke-width="1.5"/>
  <path d="M ${width - 24} 40 L ${width - 40} 40 M ${width - 40} 24 L ${width - 40} 40" stroke="${isDark ? '#444' : '#bbb'}" stroke-width="1.5"/>
  <path d="M 24 ${height - 40} L 40 ${height - 40} M 40 ${height - 24} L 40 ${height - 40}" stroke="${isDark ? '#444' : '#bbb'}" stroke-width="1.5"/>
  <path d="M ${width - 24} ${height - 40} L ${width - 40} ${height - 40} M ${width - 40} ${height - 24} L ${width - 40} ${height - 40}" stroke="${isDark ? '#444' : '#bbb'}" stroke-width="1.5"/>
</svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
