// Generates themed SVG portrait files committed under public/portraits/.
// These are real, local image assets (no external dependencies). The app's
// HeroPortrait component additionally falls back to initials if an image is
// ever missing at runtime.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/portraits');

// id, display name, two accent colors for the gradient.
const HEROES = [
  ['ana', 'Ana', '#5b6ee1', '#2c3e80'],
  ['baptiste', 'Baptiste', '#3fb6c4', '#1c6b78'],
  ['brigitte', 'Brigitte', '#c98a4b', '#7a4d22'],
  ['illari', 'Illari', '#f2a73d', '#b35f1a'],
  ['juno', 'Juno', '#e26d8f', '#8c3a5a'],
  ['kiriko', 'Kiriko', '#e0556b', '#7d2438'],
  ['lifeweaver', 'Lifeweaver', '#d76fb0', '#7c3a73'],
  ['lucio', 'Lúcio', '#7bc043', '#3c6b1f'],
  ['mercy', 'Mercy', '#f5d76e', '#b89a2e'],
  ['moira', 'Moira', '#8b5cf6', '#4c2a8a'],
  ['wuyang', 'Wuyang', '#4aa3e0', '#1f5d8c'],
  ['zenyatta', 'Zenyatta', '#f0c14b', '#9c7a1e'],
];

const initials = (name) =>
  name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const svg = (name, c1, c2) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#g)"/>
  <circle cx="160" cy="128" r="68" fill="#ffffff" opacity="0.14"/>
  <text x="160" y="150" font-family="Inter, system-ui, sans-serif" font-size="96" font-weight="700" fill="#ffffff" text-anchor="middle">${initials(name)}</text>
  <text x="160" y="250" font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="600" fill="#ffffff" opacity="0.92" text-anchor="middle">${name}</text>
</svg>
`;

mkdirSync(outDir, { recursive: true });
for (const [id, name, c1, c2] of HEROES) {
  writeFileSync(resolve(outDir, `${id}.svg`), svg(name, c1, c2));
}
console.log(`Generated ${HEROES.length} portraits in ${outDir}`);
