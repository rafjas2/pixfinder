import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Search } from '@/components/Search/Search';

export function App() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-surface pt-16 pb-12 selection:bg-brand/30">
      <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        {/* We can map other routes here later if needed */}
      </Routes>
      <Footer />
    </div>
  );
}
