import { atom } from "jotai";
import { Note } from "@/types/Note";

export const currentNoteAtom = atom<Note>({
  _id: "",
  title: "",
  isFavorite: false,
  userId: "",
  html: "",
  content: "",
  categories: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  importance: 0,
});
