import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  key?: React.Key;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  dataCursor?: string;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.35,
  as = 'button',
  href,
  target,
  rel,
  id,
  onMouseEnter,
  onMouseLeave,
  dataCursor = 'open',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (clientX - centerX) * strength;
    const distanceY = (clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    onMouseLeave?.();
  };

  const Component = motion[as as keyof typeof motion] as any;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className="inline-block"
    >
      <Component
        id={id}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        data-cursor={dataCursor}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.1 }}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
}
