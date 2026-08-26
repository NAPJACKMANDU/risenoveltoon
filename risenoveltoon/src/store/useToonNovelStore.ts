import { create } from 'zustand';
import type { novelToonMainData } from '../interface/types/novelToon';

interface ToonNovelStore {
    toonNovelData: novelToonMainData[];
    setToonNovelData: (data: novelToonMainData[]) => void;
}

export const useToonNovelStore = create<ToonNovelStore>((set) => ({
    toonNovelData: [],
    setToonNovelData: (data) => set({ toonNovelData: data }),
}));