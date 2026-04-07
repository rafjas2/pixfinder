import { type FormEvent, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon, Loader2, AlertCircle, X } from 'lucide-react';
import { Gallery } from '@/components/Gallery/Gallery';
import { Hero } from '@/components/Hero/Hero';
import { fetchImages } from '@/lib/api';
import { cn } from '@/lib/utils';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync url param with input value if users navigate back/forward
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== query) {
      inputRef.current.value = query;
    }
  }, [query]);

  const { data: images, isLoading, isError, error } = useQuery({
    queryKey: ['images', query],
    queryFn: () => fetchImages(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('searchData') as string;
    
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchParams({});
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const isSearched = query.length > 0;

  return (
    <main className="flex min-h-dvh w-full flex-col font-sans">
      {!isSearched && <Hero />}
      
      <div 
        className={cn(
          "flex w-full justify-center px-4 z-20",
          isSearched 
            ? "sticky top-16 bg-surface/80 py-4 shadow-sm backdrop-blur-md" 
            : "absolute left-0 top-[72%] md:top-[68%] -translate-y-1/2"
        )}
      >
        <form onSubmit={handleSubmit} className="relative w-full max-w-lg group">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3.5 size-5 text-muted group-focus-within:text-brand transition-colors" />
            <input
              ref={inputRef}
              name="searchData"
              defaultValue={query}
              className="w-full appearance-none rounded-xl border-2 border-brand bg-white py-2.5 pl-10 pr-12 text-base leading-normal text-text placeholder:text-muted shadow-sm transition-all focus-visible:border-brand-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
              placeholder="Search high-resolution images..."
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 rounded-full p-1 text-muted transition-colors hover:bg-black/5 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label="Clear search"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </form>
      </div>

      {isSearched && (
        <div className="flex-1 w-full pt-8 pb-16">
          {isLoading ? (
            <div className="flex w-full flex-col items-center justify-center py-20 text-brand">
              <Loader2 className="size-12 animate-spin motion-reduce:animate-none" />
              <p className="mt-4 text-lg font-medium">Fetching amazing images...</p>
            </div>
          ) : isError ? (
            <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-xl border border-danger/20 bg-danger/5 p-8 text-center text-danger">
              <AlertCircle className="size-10" />
              <p className="mt-4 text-lg font-medium">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          ) : images && images.length > 0 ? (
            <Gallery images={images} />
          ) : (
            <div className="flex w-full flex-col items-center justify-center py-20 text-muted">
              <SearchIcon className="size-12 opacity-50" />
              <p className="mt-4 text-lg font-medium">No images found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
