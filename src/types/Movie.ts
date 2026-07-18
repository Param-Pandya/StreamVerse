export interface Movie {
  id: string | number;
  title: string;
  poster: string;
  backdrop: string;
  overview: string;
  genres: string[];
  runtime: string;
  releaseYear: string;
  rating: number;
  category: string;
  youtubeTrailerId: string | null;
}
