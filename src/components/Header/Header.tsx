import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center bg-brand px-6 shadow-md shadow-brand/20">
      <Link 
        to="/" 
        className="flex items-center gap-2 text-white hover:text-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand rounded-md px-2 py-1"
      >
        <Camera className="size-8" aria-hidden="true" />
        <h1 className="font-logo text-3xl tracking-wide">PixFinder</h1>
      </Link>
    </header>
  );
}
