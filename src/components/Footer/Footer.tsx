

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 flex min-h-[3rem] items-center justify-center gap-6 bg-brand py-2 px-6 text-sm text-white/90 shadow-[0_-4px_6px_-1px_oklch(0%_0_0_/_0.1)] sm:h-12 sm:py-0">
      <p className="text-center leading-relaxed">
        &copy; {currentYear} Designed by <strong>Rafal Jasinski</strong>. <span className="block sm:inline">All rights reserved.</span>
      </p>
      <a 
        href="https://github.com/rafjas2/pixfinder" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand rounded p-1"
      >
        <svg 
          className="size-9 fill-current" 
          aria-hidden="true"
          viewBox="0 0 347.24 446.46"
        >
          <path d="M173.62,61.763c-91.671,0-166.675,75.004-166.675,166.677c0,70.836,44.446,131.256,106.255,155.563
            c6.251-1.389,11.807-6.943,11.807-13.889v-30.557H106.95c-13.195,0-24.307-6.25-29.862-15.973c-1.39-2.779-2.778-6.252-4.167-9.725
            c-2.778-7.639-6.251-15.973-13.195-20.834c-2.778-2.082-4.167-6.25-3.473-9.723c1.39-3.473,4.861-6.25,11.112-5.555
            c6.944,0.693,17.361,8.334,23.612,16.666c5.556,6.945,9.723,11.113,18.056,11.113h2.084c6.25,0,21.529,0,24.307-2.779l0,0
            c2.084-2.777,3.473-4.861,5.556-6.943c-41.669-8.334-65.281-32.641-65.281-69.449c0-12.501,3.473-25.002,11.112-36.113
            c-2.778-10.418-9.028-37.502,4.167-49.309l2.083-2.083h2.778c18.057,0,31.251,7.639,39.585,13.89
            c24.307-9.028,52.086-9.028,76.393,0c7.639-6.251,20.834-13.89,39.586-13.89h2.777l2.084,2.083
            c13.195,12.501,6.943,38.891,4.166,49.309c6.945,11.111,11.111,23.612,11.111,36.113c0,36.809-23.611,61.115-64.586,69.449
            c10.418,11.111,15.973,27.779,15.973,40.973v34.031c0,6.943,4.861,12.5,11.807,13.889c61.113-25.002,105.561-85.422,105.561-156.258
            C340.295,136.767,265.291,61.763,173.62,61.763z" />
        </svg>
        <span className="sr-only">GitHub Repository</span>
      </a>
    </footer>
  );
}
