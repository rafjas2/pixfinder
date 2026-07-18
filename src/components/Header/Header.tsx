import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-brand shadow-brand/20 fixed inset-x-0 top-0 z-50 flex h-16 items-center px-6 shadow-md">
      <Link
        to="/"
        className="focus-visible:ring-offset-brand flex items-center gap-2 rounded-md px-2 py-1 text-white transition-colors hover:text-white/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Camera className="size-8" aria-hidden="true" />
        <h1 className="font-logo text-3xl tracking-wide">PixFinder</h1>
      </Link>
    </header>
  );
}
