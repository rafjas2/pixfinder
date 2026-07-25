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
        <Route
          path="*"
          element={
            <div className="text-text flex flex-1 flex-col items-center justify-center py-20 text-center">
              <h2 className="text-4xl font-bold">404</h2>
              <p className="text-muted mt-2">Page not found</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
