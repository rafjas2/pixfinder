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
    let errorMessage = '';

    try {
      const errorJson = JSON.parse(errorText);
      if (
        errorJson &&
        typeof errorJson === 'object' &&
        'error' in errorJson &&
        typeof errorJson.error === 'string'
      ) {
        errorMessage = errorJson.error.trim();
      } else {
        errorMessage = errorText.trim();
      }
    } catch {
      errorMessage = errorText.trim();
    }

    if (!errorMessage) {
      errorMessage = `API Error: ${response.status} ${response.statusText}`;
    }

    // Map common error patterns or status codes to friendly user messages
    if (response.status === 504 || errorMessage.includes('504')) {
      throw new Error('Pixabay service timed out. Please try again in a few moments.');
    }
    if (
      response.status === 429 ||
      errorMessage.includes('429') ||
      errorMessage.toLowerCase().includes('rate limit')
    ) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.');
    }
    if (
      response.status === 502 ||
      response.status === 503 ||
      errorMessage.includes('502') ||
      errorMessage.includes('503')
    ) {
      throw new Error('Pixabay service is temporarily unavailable. Please try again later.');
    }
    if (
      response.status === 401 ||
      response.status === 403 ||
      errorMessage.toLowerCase().includes('key') ||
      errorMessage.toLowerCase().includes('invalid')
    ) {
      throw new Error('Pixabay API authentication failed. Please check your API key configuration.');
    }

    // Strip "Pixabay API error:" prefix if it is at the start of the message (we want clean message in UI)
    if (errorMessage.startsWith('Pixabay API error: ')) {
      errorMessage = errorMessage.replace('Pixabay API error: ', '');
    }

    throw new Error(errorMessage);
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
