import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Search } from '@/components/Search/Search';

function AppLayout() {
  return (
    <div className="bg-surface selection:bg-brand/30 flex min-h-dvh w-full flex-col pt-16">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Search />} />
        {/* We can map other routes here later if needed */}
      </Route>
    </Routes>
  );
}
