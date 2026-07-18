export const ENV = {
  PIXABAY_API_URL:
    import.meta.env.VITE_PIXABAY_API_URL || 'https://pixabay.com/api/',
  PIXABAY_API_KEY: import.meta.env.VITE_PIXABAY_API_KEY,
  IS_PROD: import.meta.env.PROD,
} as const;
