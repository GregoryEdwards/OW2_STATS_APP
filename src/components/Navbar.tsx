import { Link, NavLink } from 'react-router-dom';
import { useCompare } from '@/hooks/useCompare';

const linkClass = ({ isActive }: { isActive: boolean }): string =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-ow-border text-white' : 'text-slate-300 hover:text-white'
  }`;

/** Top navigation with a live count of heroes queued for comparison. */
export function Navbar() {
  const { selectedIds } = useCompare();
  return (
    <header className="sticky top-0 z-10 border-b border-ow-border bg-ow-dark/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-white">
          <span className="text-ow-orange">OW2</span>
          <span>Support Stats</span>
        </Link>
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Heroes
          </NavLink>
          <NavLink to="/compare" className={linkClass}>
            Compare
            {selectedIds.length > 0 && (
              <span className="ml-1.5 rounded-full bg-ow-orange px-1.5 py-0.5 text-xs font-bold text-ow-dark">
                {selectedIds.length}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
