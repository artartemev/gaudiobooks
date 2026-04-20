import { atom } from "jotai";
import type { Book } from "./data";

export const currentBookAtom = atom<Book | null>(null);
