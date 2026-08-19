import { create } from 'zustand';
import type { novelToonMainData } from '../interface/types/novelToon'; // 실제 경로로 수정

interface ToonNovelStore {
    toonNovelData: novelToonMainData[];
    setToonNovelData: (data: novelToonMainData[]) => void;
}

export const useToonNovelStore = create<ToonNovelStore>((set) => ({
    toonNovelData: [],
    setToonNovelData: (data) => set({ toonNovelData: data }),
}));