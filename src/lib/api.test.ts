import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchImages } from './api';

// Mock the global fetch
global.fetch = vi.fn();

describe('fetchImages API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty array if query is empty', async () => {
    const result = await fetchImages('');
    expect(result).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('fetches images successfully', async () => {
    const mockReponse = {
      total: 100,
      totalHits: 100,
      hits: [
        {
          id: 1,
          webformatURL: 'https://pixabay.com/photo-1',
          largeImageURL: 'https://pixabay.com/photo-1-hd',
          tags: 'nature, forest',
          user: 'John',
          userImageURL: 'https://example.com/john.jpg',
        },
      ],
    };

    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response(JSON.stringify(mockReponse))
    );

    const result = await fetchImages('nature');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('maps 429 status code to a friendly rate limit message', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response('Rate Limit Exceeded', { status: 429 })
    );

    await expect(fetchImages('test')).rejects.toThrow(
      'Rate limit exceeded. Please try again in a few minutes.'
    );
  });

  it('parses JSON errors from proxy and strips prefix', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'Pixabay API error: Some random error' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    await expect(fetchImages('test')).rejects.toThrow('Some random error');
  });

  it('maps 504 status code to friendly timeout message', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response('Gateway Timeout', { status: 504 })
    );

    await expect(fetchImages('test')).rejects.toThrow(
      'Pixabay service timed out. Please try again in a few moments.'
    );
  });

  it('maps 503 status code to friendly service unavailable message', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response('Service Unavailable', { status: 503 })
    );

    await expect(fetchImages('test')).rejects.toThrow(
      'Pixabay service is temporarily unavailable. Please try again later.'
    );
  });

  it('falls back to raw text for unknown errors', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response('Unrecognized raw error text', { status: 400 })
    );

    await expect(fetchImages('test')).rejects.toThrow(
      'Unrecognized raw error text'
    );
  });
});
