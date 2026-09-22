import { useToonNovelStore } from '../store/useToonNovelStore.ts';
import {useEffect, useRef, useState} from "react";
import { mainToonNovelApi } from '../api/toonNovelApi.tsx';
import type { MyPageData } from '../interface/types/auth.tsx';
import { myPageApi } from '../api/joinLoginApi.tsx';
import { PurchaseModal } from '../common/modalCom.tsx';

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
                    setToonNovelData(response.data); 
                } catch(error : any) {
    
                }
            }
            useToonNovelData();
        }, [toonNovelData.length, setToonNovelData]);
        
    return toonNovelData;
}

// 마이페이지 데이터
export function useMyPageData() {
    const calledRef = useRef(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isInfoNotTokenModalOpen, setIsInfoNotTokenModalOpen] = useState(false);
    const [userData, setUserData] = useState<MyPageData[] | null>(null);

    const handleConfirmAndNavigate = () => {
        setIsInfoNotTokenModalOpen(false);
    };

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;

        async function fetchData() {
            try {
                const response = await myPageApi();
                setUserData(response.data.data);
            } catch (error: any) {
                setModalMessage(error.response?.data?.detail ?? "정보를 불러오지 못 했습니다.");
                setIsInfoNotTokenModalOpen(true);
            }
        }
        fetchData();
    }, []);

    return {
        userData,
        setUserData,
        modalProps: {
            isOpen: isInfoNotTokenModalOpen,
            description: modalMessage,
            cancelText: "닫기",
            onCancel: handleConfirmAndNavigate
        }
    };
}