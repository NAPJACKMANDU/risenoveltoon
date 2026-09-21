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
import {useState} from "react";
import { PurchaseModal } from '../common/modalCom.tsx';
import { useMyPageData } from '../hooks/toonNovelDataHook.tsx';
import { useWindowScrollTop } from '../common/common.tsx';

export const MyPage = () => {
    // 샘플 데이터 배열
    const navigate = useNavigate();
    const [isBuyListOpen,setIsBuyListOpen] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
    const cpName = userInfo?.cpName ?? "";


    const buyListUpDown = () => {
        setIsBuyListOpen(!isBuyListOpen);
    }

    const categoryTitle = [
        { id: "all", title: "📋 전체" },
        { id: "WEBTOON", title: "📔 웹툰" },
        { id: "NOVEL", title: "📖 소설" }
    ];  

    // 스크롤 상단으로 이동
    const { categoryId, handleScrollTopAndTab } = useWindowScrollTop();
    const { userData, modalProps } = useMyPageData();

   // 로딩 중이거나 데이터가 없을 때의 처리
    if (!userData) {
        return (
            <div className="mypage-container">
                {/* 스켈레톤 UI 또는 에러 모달 */}
                <PurchaseModal modalProps={modalProps} />
            </div>
        );
    }
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
                        <h2 className="nickname">{userData?.[0]?.nickname}</h2>
                        <span className="hashtag">{cpName}</span>
                    </div>
                </div>
                <button onClick={() => navigate("/webToonEditInfo")}  className="edit-btn">정보 수정</button>
            </section>

            {/* 잔액 섹션 */}
            <section className="balance-section">
                <span className="balance-label">잔액</span>
                <button onClick={() => navigate("/pointShop")} className="balance-value-btn">
                    <span className="balance-amount">{userData?.[0]?.currentBalance}원</span>
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
                                onClick={() => handleScrollTopAndTab(cat.id)}>
                                {cat.title}
                            </button>
                        ))}
                    </div>
                    <FiChevronRight onClick={() => navigate("/buyToonList")}  size={20} className="arrow-icon" />
                </div>
            {/* 리스트 목록 */}
            <CategoryButton listData = {userData} categoryId={categoryId} />
                </>
            )}
                <ToonMainBottom/>
        </div>
    );
};

export default MyPage;