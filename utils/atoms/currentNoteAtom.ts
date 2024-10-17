import { atom } from "jotai";
import { Note } from "@/types/Note";

export const currentNoteAtom = atom<Note>()