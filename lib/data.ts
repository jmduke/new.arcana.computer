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
  status: Status;
};

export type Status =
  | "Abandoned"
  | "Not started"
  | "In progress"
  | "Finished"
  | "Shelved"
  | "";

export type Type = "Book" | "Game" | "Movie" | "Album" | "Play" | "Television";

export type Book = Item & {
  author: string;
};

export const CONTENT_TYPE_TO_TYPE_SLUG: { [key in Type]: string } = {
  Book: "books",
  Game: "games",
  Movie: "movies",
  Album: "music",
  Television: "television",
  Play: "plays",
};
