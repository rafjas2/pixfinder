import { z } from 'zod';

export const pixabayHitSchema = z.object({
  id: z.number(),
  webformatURL: z.string().url(),
  largeImageURL: z.string().url(),
  tags: z.string(),
  user: z.string(),
  userImageURL: z.string().url().or(z.string().length(0)), // Can be empty string
});

export const pixabayResponseSchema = z.object({
  total: z.number(),
  totalHits: z.number(),
  hits: z.array(pixabayHitSchema),
});

export type PixabayHit = z.infer<typeof pixabayHitSchema>;
export type PixabayResponse = z.infer<typeof pixabayResponseSchema>;
