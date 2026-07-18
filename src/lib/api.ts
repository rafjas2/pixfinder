import { pixabayResponseSchema, type PixabayHit } from '@/types/pixabay';
import { ENV } from '@/config/env';

export async function fetchImages(
  query: string,
  perPage = 24
): Promise<PixabayHit[]> {
  if (!query) return [];

  // Use Vercel Serverless proxy in production to hide API key
  const isProd = ENV.IS_PROD;
  let url = '';

  if (isProd) {
    url = `/api/search?q=${encodeURIComponent(query)}&per_page=${perPage}`;
  } else {
    url = `${ENV.PIXABAY_API_URL}?key=${ENV.PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${errorText}`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error('Failed to parse server response as JSON');
  }

  // Validate using zod
  const parsed = pixabayResponseSchema.safeParse(data);

  if (!parsed.success) {
    console.error('API matching validation failed', parsed.error);
    throw new Error('Invalid data format received from API');
  }

  return parsed.data.hits;
}
