export type Item = {
  id: string;
  title: string;
  slug: string;
  type: Type;
  rating?: number;
  date?: number;
  // Can't get the right MDXModule type here.
  description?: any;
  htmlDescription?: string;
  year?: number;
  genre?: string;
  author?: string;
  image?: string;
};

export type Type = "Book" | "Game" | "Movie" | "Album" | "Play" | "Television";

export type Book = Item & {
  author: string;
};
