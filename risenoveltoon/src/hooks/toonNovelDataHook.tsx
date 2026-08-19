import { useToonNovelStore } from '../store/useToonNovelStore.ts';
import {useEffect, useRef} from "react";
import { mainToonNovelApi } from '../api/toonNovelApi.tsx';

export function toonNovelDataApi() {

    const calledRef = useRef(false);
    const { toonNovelData, setToonNovelData } = useToonNovelStore();

    useEffect(() => {
    
            if (toonNovelData.length > 0) return;
    
            if (calledRef.current) return;
            calledRef.current = true;
            
            async function toonNovelDataApi() {
                try {
                    const response = await mainToonNovelApi();
                    console.log(response.data)
                    setToonNovelData(response.data); 
                } catch(error : any) {
    
                }
            }
            toonNovelDataApi();
        }, [toonNovelData.length, setToonNovelData]);
        
    return toonNovelData;
}