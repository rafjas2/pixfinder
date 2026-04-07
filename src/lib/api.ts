import { pixabayResponseSchema, type PixabayHit } from '@/types/pixabay';

const pixabayApiUrl = import.meta.env.VITE_PIXABAY_API_URL || 'https://pixabay.com/api/';
const pixabayToken = import.meta.env.VITE_PIXABAY_API_KEY;

export async function fetchImages(query: string, perPage = 24): Promise<PixabayHit[]> {
  if (!query) return [];
  
  // Use Vercel Serverless proxy in production to hide API key
  const isProd = import.meta.env.PROD;
  let url = '';
  
  if (isProd) {
    url = `/api/search?q=${encodeURIComponent(query)}&per_page=${perPage}`;
  } else {
    url = `${pixabayApiUrl}?key=${pixabayToken}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${errorText}`);
  }

  const data = await response.json();
  
  // Validate using zod
  const parsed = pixabayResponseSchema.safeParse(data);
  
  if (!parsed.success) {
    console.error('API matching validation failed', parsed.error);
    throw new Error('Invalid data format received from API');
  }

  return parsed.data.hits;
}
