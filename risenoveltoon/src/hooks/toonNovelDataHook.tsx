import { useToonNovelStore } from '../store/useToonNovelStore.ts';
import {useEffect, useRef} from "react";
import { mainToonNovelApi } from '../api/toonNovelApi.tsx';

export function useToonNovelData() {

    const calledRef = useRef(false);
    const { toonNovelData, setToonNovelData } = useToonNovelStore();

    useEffect(() => {
    
            if (toonNovelData.length > 0) return;
    
            if (calledRef.current) return;
            calledRef.current = true;
            
            async function useToonNovelData() {
                try {
                    const response = await mainToonNovelApi();
                    console.log(response.data)
                    setToonNovelData(response.data); 
                } catch(error : any) {
    
                }
            }
            useToonNovelData();
        }, [toonNovelData.length, setToonNovelData]);
        
    return toonNovelData;
}