import { Route, Routes } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HeroListPage } from '@/pages/HeroListPage';
import { HeroDetailPage } from '@/pages/HeroDetailPage';
import { ComparePage } from '@/pages/ComparePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<HeroListPage />} />
          <Route path="/hero/:id" element={<HeroDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500">
        Stats curated from the Overwatch wiki, approximate as of the early-2026 patch. Not
        affiliated with Blizzard Entertainment.
      </footer>
    </div>
  );
}
