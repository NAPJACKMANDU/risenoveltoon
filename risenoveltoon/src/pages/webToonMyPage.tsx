import '../css/webToonMyPageCss.css';
import "../css/componentsCss.css"
import { useNavigate } from "react-router-dom";
import {
    FiChevronRight,
    FiChevronDown,
    FiChevronUp
} from 'react-icons/fi';
import {ToonMainBottom} from "../common/webToonMainCom";
import {BackButton, CategoryButton} from "../hooks/functionComHook";
import {useEffect, useState} from "react";
import { myPageApi } from "../api/JoinLogin/joinLoginApi";
import type {UserFormData} from "../interface/types/auth.tsx";
import { PurchaseModal } from '../common/modalCom.tsx';

export const MyPage = () => { {}
    // 샘플 데이터 배열
    const navigate = useNavigate();
    const [categoryId, setActiveTab] = useState('all');
    const [modalMessage, setModalMessage] = useState('');
    const [isInfoNotTokenModalOpen, setIsInfoNotTokenModalOpen] = useState(false);

    const handleConfirmAndNavigate = () => {
            setIsInfoNotTokenModalOpen(false); // 모달 닫고
    };

    const [isBuyListOpen,setIsBuyListOpen] = useState(true);
    const [userData, setUserData] = useState<UserFormData | null>(null);
    const buyListUpDown = () => {
        setIsBuyListOpen(!isBuyListOpen);
    }

    const storedUser = localStorage.getItem("userInfo")
    const myPageInfo = storedUser ? JSON.parse(storedUser) : null;

    const buyList = [
        { id: 1, title: '말강즈', tag: '#CP', type: 'webtoon', img: ''},
        { id: 2, title: '빈앤톤89듀오', tag: '#CP', type: 'webtoon', img: ''},
        { id: 3, title: '제목입니당ㅇ!', tag: '#CP', type: 'novel', img: ''},
        { id: 4, title: '송은석이찬영투톤즈ㅋㅋ', tag: '#CP', type: 'webtoon', img: ''},
        { id: 5, title: '또리토리또토리', tag: '#CP', type: 'novel', img: ''},
    ];

    const categoryTitle = [
        { id: "all", title: "📋 전체" },
        { id: "webtoon", title: "📔 웹툰" },
        { id: "novel", title: "📖 소설" }
    ];

    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       const response = await myPageApi();
    //       setUserData(response.data.data);
    //     } catch (error : any) {
    //         setModalMessage(error.response?.data?.detail);
    //         setIsInfoNotTokenModalOpen(true)
    //     }
    //   }

    //     fetchData(); // 비동기 함수 호출
    // }, []);

    return (
        <div className="mypage-container">
            {/* 상단 헤더 */}
            <header className="myPageHeader">
                    <BackButton backtype ="마이페이지"/> {/*뒤로가기*/}
            {/* 프로필 섹션 */}
            <div className="mypage-content">
            <section className="profile-section">
                <div className="profile-info">
                    <div className="profile-image-wrapper">
                        {/* 임시 캐릭터 이미지 대체 */}
                        <div className="profile-img">🐰</div>
                    </div>
                    <div className="profile-text">
                        <h2 className="nickname">{myPageInfo.nickname}</h2>
                        <span className="hashtag">{myPageInfo.cpName}</span>
                    </div>
                </div>
                <button onClick={() => navigate("/webToonEditInfo")}  className="edit-btn">정보 수정</button>
            </section>

            {/* 잔액 섹션 */}
            <section className="balance-section">
                <span className="balance-label">잔액</span>
                <button onClick={() => navigate("/pointShop")} className="balance-value-btn">
                    <span className="balance-amount">{myPageInfo.currentBalance}</span>
                    <FiChevronRight size={20} className="arrow-icon" />
                </button>
            </section>

            {/* 구매 목록 섹션 */}
            <section className="purchase-section">
                <div className="purchase-header">
                    <span className="section-title">구매 목록</span>
                    {isBuyListOpen ?
                        ( <FiChevronUp onClick={buyListUpDown} size={20} className="arrow-icon"/> )
                        : (<FiChevronDown onClick={buyListUpDown} size={20} className="arrow-icon"/>)}
                </div>
            </section>
                </div>
            </header>
                {/* 3. 필터 카테고리 탭 */}

            {isBuyListOpen && (
                <>
                <div className="myPageCategory-wrapper">
                    <div className="myPageCategory">
                        {categoryTitle.map((cat) => (
                            <button
                                key={cat.id}
                                className={`tab-btn ${categoryId === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(cat.id)}>
                                {cat.title}
                            </button>
                        ))}
                    </div>
                    <FiChevronRight onClick={() => navigate("/buyToonList")}  size={20} className="arrow-icon" />
                </div>
            {/* 리스트 목록 */}
            <CategoryButton listData = {buyList} categoryId={categoryId} />
                </>
            )}
                <ToonMainBottom/>

            <PurchaseModal 
                    modalProps = {{
                        isOpen: isInfoNotTokenModalOpen,
                        description: modalMessage,
                        cancelText : "닫기",
                        onCancel : handleConfirmAndNavigate
                        }}/>
        </div>
    );
};

export default MyPage;