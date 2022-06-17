export type Item = {
  id: string;
  title: string;
  type: Type;
  rating?: number;
  date?: number;
  // Can't get the right MDXModule type here.
  description?: any;
  year?: number;
  genre?: string;
  author?: string;
  image?: string;
};

export type Type = "Book" | "Game" | "Movie" | "Album";

export type Book = Item & {
  author: string;
};
