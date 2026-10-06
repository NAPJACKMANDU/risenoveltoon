import "../css/webToonWishListCss.css"
import "../css/componentsCss.css"
import {ToonMainBottom} from "../common/webToonMainCom";
import {BackButton, CategoryButton} from "../hooks/functionComHook";
import { PurchaseModal } from "../common/modalCom";
import { useMyPageData } from "../hooks/toonNovelDataHook";
import { useSearchHandle, useWindowScrollTop } from "../common/common";
import { useEffect, useState } from "react";
import { loveContentsApi } from "../api/toonNovelApi";
import type { MyPageData } from "../interface/types/auth";

export const BuyToonlist = () => {

    // 스크롤 상단으로 이동
    const { categoryId, handleScrollTopAndTab } = useWindowScrollTop();
    const { userData, modalProps } = useMyPageData();
    const [ wishData, setWishData ] = useState<MyPageData[] | null>(null);

    const listData = categoryId === "WISH" ? wishData : userData;
    const { searchTerm, filteredData, handleSearchChange } = useSearchHandle(listData);

    useEffect(() => {
        if (categoryId === "WISH") {
            let isActive = true;
            const fetchWish = async () => {
                try {
                    const response = await loveContentsApi();
                    if (isActive) {
                        setWishData(response.data.data);
                    }
                } catch (error) {
                    console.error("찜 목록을 불러오지 못했습니다.", error);
                }
            };
            fetchWish();
            return () => {
                isActive = false;
            };
        }
    }, [categoryId]);

    // 로딩 중이거나 데이터가 없을 때의 처리
     if (!userData) {
         return (
             <div className="mypage-container">
                 {/* 스켈레톤 UI 또는 에러 모달 */}
                 <PurchaseModal modalProps={modalProps} />
             </div>
         );
     }

    //     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value);
    // };

    //   const filteredData = userData.filter((item) =>
    //     item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item.cpName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item.author?.toLowerCase().includes(searchTerm.toLowerCase())
    // );


    const categoryTitle = [
        { id: "all", title: "📋 전체" },
        { id: "WEBTOON", title: "📔 웹툰" },
        { id: "NOVEL", title: "📖 소설" },
        { id: "WISH", title: "❤️ 찜" }
    ];

    return (
        <div className="mobile-container">
            {/* 1. 상단 고정 헤더 (상태바 영역 + 타이틀) */}
            <header className="header-fixed">
                    <BackButton backtype="구매 목록"/> {/*뒤로가기*/}

                {/* 2. 검색창 */}
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="검색" className="search-input" />
                </div>

                {/* 3. 필터 카테고리 탭 */}
                <div className="tab-container">
                    {categoryTitle.map((cat) => (
                        <button
                            key={cat.id}
                            className={`tab-btn ${categoryId === cat.id ? 'active' : ''}`}
                            onClick={() => handleScrollTopAndTab(cat.id)}>
                            {cat.title}
                        </button>
                    ))}
                </div>
            </header>
            {/* 4. 스크롤되는 리스트 영역 */}
            <CategoryButton listData = {filteredData} categoryId={categoryId}/>
            <ToonMainBottom/>
        </div>
    );
}

export default BuyToonlist;