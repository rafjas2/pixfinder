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
        }
      ]
    };

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockReponse,
    } as unknown as Response);

    const result = await fetchImages('nature');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error if the network response is not ok', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Rate Limit Exceeded',
    } as unknown as Response);

    await expect(fetchImages('test')).rejects.toThrow('API Error: Rate Limit Exceeded');
  });
});
