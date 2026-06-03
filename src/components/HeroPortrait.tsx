import { useState } from 'react';
import { heroAccent } from '@/utils/colors';

interface HeroPortraitProps {
  id: string;
  name: string;
  src: string;
  className?: string;
}

/** Initials shown on the placeholder tile (up to two characters). */
const initials = (name: string): string =>
  name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Renders a hero portrait image, falling back to a role-themed initials tile if
 * the image is missing or fails to load — so the UI never shows a broken image.
 */
export function HeroPortrait({ id, name, src, className = '' }: HeroPortraitProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center font-bold text-ow-dark ${className}`}
        style={{ backgroundColor: heroAccent(id) }}
        role="img"
        aria-label={`${name} portrait placeholder`}
      >
        <span className="text-[1.5em]">{initials(name)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} portrait`}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
