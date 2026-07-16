import "../css/webToonWishListCss.css"
import "../css/componentsCss.css"
import {ToonMainBottom} from "../components/mainToon/webToonMainCom";
import {BackButton, CategoryButton} from "../hooks/functionComHook";
import {useState} from "react";


export const BuyToonlist = () => {

    // 임시 데이터 (나중에 서버에서 받아올 데이터 구조)
    const buyList = [
        { id: 1, title: '말강즈', tag: '#CP', type: 'webtoon', img: ''},
        { id: 2, title: '빈앤톤89듀오', tag: '#CP', type: 'webtoon', img: ''},
        { id: 3, title: '제목입니당ㅇ!', tag: '#CP', type: 'novel', img: ''},
        { id: 4, title: '송은석이찬영투톤즈ㅋㅋ', tag: '#CP', type: 'webtoon' , img: ''},
        { id: 5, title: '또리토리또토리', tag: '#CP', type: 'novel', img: ''},
    ];

    const categoryTitle = [
        { id: "all", title: "📋 전체" },
        { id: "webtoon", title: "📔 웹툰" },
        { id: "novel", title: "📖 소설" },
        { id: "wish", title: "❤️ 찜" }
    ];

    const [categoryId, setActiveTab] = useState('all');

    return (
        <div className="mobile-container">
            {/* 1. 상단 고정 헤더 (상태바 영역 + 타이틀) */}
            <header className="header-fixed">
                <div className="title-bar">
                    <BackButton/> {/*뒤로가기*/}
                    <h1 className="page-title">구매 목록</h1>
                    <div className="empty-space"></div>
                </div>

                {/* 2. 검색창 */}
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="검색" className="search-input" />
                </div>

                {/* 3. 필터 카테고리 탭 */}
                <div className="tab-container">
                    {categoryTitle.map((cat) => (
                        <button
                            key={cat.id}
                            className={`tab-btn ${categoryId === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat.id)}>
                            {cat.title}
                        </button>
                    ))}
                </div>
            </header>
            {/* 4. 스크롤되는 리스트 영역 */}
            <CategoryButton listData = {buyList} categoryId={categoryId}/>
            <ToonMainBottom/>
        </div>
    );
}

export default BuyToonlist;