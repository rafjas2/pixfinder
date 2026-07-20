export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
    });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const perPage = searchParams.get('per_page') || '24';

  if (!query) {
    return new Response(
      JSON.stringify({ error: 'Query parameter "q" is required' }),
      { status: 400 }
    );
  }

  // Use standard Node.js process.env format for Vercel hosted functions
  const apiKey =
    process.env.PIXABAY_API_KEY || process.env.VITE_PIXABAY_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key is not configured on the server' }),
      { status: 500 }
    );
  }

  const pixabayApiUrl =
    process.env.PIXABAY_API_URL || 'https://pixabay.com/api/';
  const pixabayUrl = `${pixabayApiUrl}/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true`;

  try {
    const response = await fetchWithRetry(pixabayUrl);

    if (!response.ok) {
      const errorText = (await response.text()).trim();
      let friendlyError = `Pixabay API error: ${errorText}`;
      
      if (response.status === 504 || errorText.includes('504')) {
        friendlyError = 'Pixabay search timed out. Please try again in a few moments.';
      } else if (response.status === 429 || errorText.toLowerCase().includes('rate limit')) {
        friendlyError = 'Rate limit exceeded. Please try again in a few minutes.';
      } else if (response.status === 502 || response.status === 503) {
        friendlyError = 'Pixabay service is temporarily unavailable. Please try again later.';
      }

      return new Response(
        JSON.stringify({ error: friendlyError }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=86400', // Cache at edge for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error fetching from Pixabay:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error while fetching data' }),
      { status: 500 }
    );
  }
}

async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = 2,
  delay = 200
): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);
      // Only retry on transient 5xx status codes (like 502, 503, 504)
      const isTransientError =
        response.status === 502 ||
        response.status === 503 ||
        response.status === 504;

      if (isTransientError && i < retries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      return response;
    } catch (error) {
      if (i < retries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      throw error;
    }
  }
  throw new Error('Request failed after all retries');
}
