import { ReactNode } from 'react';
import { THEME_STYLES } from '@/styles/theme';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Consistent Page Layout with Stunning Blue/White Theme
 * Use this for ALL pages to maintain consistent design
 */
export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`min-h-screen relative text-white overflow-x-hidden ${className}`}>
      {/* Navy Blue Gradient Background */}
      <div className="absolute inset-0" style={THEME_STYLES.background}></div>

      {/* Subtle Cyan/Blue Glow Overlay */}
      <div className="absolute inset-0 opacity-40" style={THEME_STYLES.glowOverlay}></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
