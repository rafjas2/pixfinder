export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const perPage = searchParams.get('per_page') || '24';
  
  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter "q" is required' }), { status: 400 });
  }

  // Use standard Node.js process.env format for Vercel hosted functions
  const apiKey = process.env.PIXABAY_API_KEY || (import.meta as any).env?.VITE_PIXABAY_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key is not configured on the server' }), { status: 500 });
  }

  const pixabayUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true`;

  try {
    const response = await fetch(pixabayUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: `Pixabay API error: ${errorText}` }), { status: response.status });
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
    return new Response(JSON.stringify({ error: 'Internal server error while fetching data' }), { status: 500 });
  }
}
