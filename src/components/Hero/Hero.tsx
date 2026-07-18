import bgImage from '@/images/hero-bg.webp';

export function Hero() {
  return (
    <section className="bg-surface relative flex h-[100dvh] w-full flex-col items-center justify-center pt-16">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      <div className="relative z-10 flex w-full max-w-[90%] -translate-y-24 flex-col items-center justify-center p-4 text-center md:-translate-y-20">
        <h2 className="font-heading bg-gradient-to-br from-white to-gray-300 bg-clip-text text-5xl text-balance text-transparent drop-shadow-md sm:text-6xl md:text-7xl lg:text-8xl">
          Discover Inspiration
        </h2>
        <h3 className="mt-4 max-w-prose bg-gradient-to-br from-white to-gray-200 bg-clip-text pt-2 font-sans text-xl font-medium text-pretty text-transparent drop-shadow-md sm:text-2xl">
          Search for high-quality, stunning images powered by Pixabay
        </h3>
      </div>
    </section>
  );
}
