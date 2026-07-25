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

  const {
    data: images,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['images', query],
    queryFn: () => fetchImages(query),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: (failureCount, err) => {
      if (
        err instanceof Error &&
        (err.message.includes('Rate limit') ||
          err.message.includes('authentication'))
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawSearchQuery = formData.get('searchData');
    const searchQuery =
      typeof rawSearchQuery === 'string' ? rawSearchQuery : '';

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
    <main className="flex w-full flex-1 flex-col font-sans">
      {!isSearched && <Hero />}

      <div
        className={cn(
          'z-20 flex w-full justify-center px-4',
          isSearched
            ? 'bg-surface/80 sticky top-16 py-4 shadow-sm backdrop-blur-md'
            : 'absolute top-[72%] left-0 -translate-y-1/2 md:top-[68%]'
        )}
      >
        <form
          onSubmit={handleSubmit}
          role="search"
          className="group relative w-full max-w-lg"
        >
          <div className="relative flex items-center">
            <SearchIcon
              aria-hidden="true"
              className="text-muted group-focus-within:text-brand absolute left-3.5 size-5 transition-colors"
            />
            <input
              ref={inputRef}
              name="searchData"
              id="search-input"
              aria-label="Search high-resolution images"
              defaultValue={query}
              className="border-brand text-text placeholder:text-muted focus-visible:border-brand-hover focus-visible:ring-brand/30 w-full appearance-none rounded-xl border-2 bg-white py-2.5 pr-12 pl-10 text-base leading-normal shadow-sm transition-all focus-visible:ring-4 focus-visible:outline-none"
              placeholder="Search high-resolution images..."
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted hover:text-text focus-visible:ring-brand absolute right-3 rounded-full p-1 transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Clear search"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </form>
      </div>

      {isSearched && (
        <div className="w-full flex-1 pt-8 pb-16">
          {isLoading ? (
            <div className="text-brand flex w-full flex-col items-center justify-center py-20">
              <Loader2 className="size-12 animate-spin motion-reduce:animate-none" />
              <p className="mt-4 text-lg font-medium">
                Fetching amazing images...
              </p>
            </div>
          ) : isError ? (
            <div className="border-danger/20 bg-danger/5 text-danger mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-xl border p-8 text-center">
              <AlertCircle className="size-10" />
              <p className="mt-4 text-lg font-medium">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          ) : images && images.length > 0 ? (
            <Gallery images={images} />
          ) : (
            <div className="text-muted flex w-full flex-col items-center justify-center py-20">
              <SearchIcon className="size-12 opacity-50" />
              <p className="mt-4 text-lg font-medium">
                No images found for "{query}"
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
