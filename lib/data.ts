import type { MDXModule } from "mdx/types";

export type Item = {
  id: string;
  title: string;
  type: Type;
  rating?: number;
  date?: string;
  description?: MDXModule;
  year?: number;
  genre?: string;
  author?: string;
  image?: string;
};

export type Type = "Book" | "Game" | "Movie" | "Album";

export type Book = Item & {
  author: string;
};
