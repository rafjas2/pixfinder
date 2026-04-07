import bgImage from '@/images/hero-bg.webp';

export function Hero() {
  return (
    <section 
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center bg-surface bg-cover bg-center bg-no-repeat pt-16"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      <div className="relative z-10 flex w-full max-w-[90%] flex-col items-center justify-center p-4 text-center -translate-y-24 md:-translate-y-20">
        <h2 className="font-heading text-5xl text-transparent sm:text-6xl md:text-7xl lg:text-8xl text-balance bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-md">
          Discover Inspiration
        </h2>
        <h3 className="mt-4 font-sans text-xl font-medium text-transparent sm:text-2xl pt-2 text-pretty bg-clip-text bg-gradient-to-br from-white to-gray-200 drop-shadow-md max-w-prose">
          Search for high-quality, stunning images powered by Pixabay
        </h3>
      </div>
    </section>
  );
}
