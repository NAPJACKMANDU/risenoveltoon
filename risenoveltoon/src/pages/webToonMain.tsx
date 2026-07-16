import '../css/webToonMainCss.css'
import "../css/componentsCss.css"
import {NovelToonMain, ToonMainBottom} from '../components/mainToon/webToonMainCom.tsx'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export const MainHome = () => {
    const webtoonData = [
        { id: 1, tag: '#CP명', title: '성찬영말티즈리트리버', img: 'https://via.placeholder.com/150x200' },
        { id: 2, tag: '#CP명', title: '또리토리또토리', img: 'https://via.placeholder.com/150x200' },
        { id: 3, tag: '#CP명', title: '송은석', img: 'https://via.placeholder.com/150x200' },
    ];

    const categoryTitle = [
        { id: "all", title: "📋 전체" },
        { id: "webtoon", title: "📔 웹툰" },
        { id: "novel", title: "📖 소설" },
        { id: "rank", title: "📋 랭킹" }
    ];

    const navigate = useNavigate();
    const [categoryId, setActiveTab] = useState('all');

    return(
        <div className="mobile-container">
            <div className="joinLogin">
                <button onClick={() => navigate("/signUpScreen")} className="tab-item">회원가입</button>
                <button onClick={() => navigate("/loginScreen")} className="tab-item">로그인</button>
            </div>
            {/* 2. 검색창 */}
            <div className="search-bar-container">
                <div onClick={() => navigate("/searchScreen")}  className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="검색" className="search-input" />
                </div>
            </div>

            {/* 3. 필터 카테고리 탭 */}
            <div className="category-tabs">
                {categoryTitle.map((cat) => (
                    <button
                        key={cat.id}
                        className={`tab-btn ${categoryId === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(cat.id)}>
                        {cat.title}
                    </button>
                ))}
            </div>

            {/* 메인 스크롤 영역 시작 */}
            <div className="scroll-content">
                {/* 4. 메인 배너 (말강즈 배너) */}
                <div className="main-banner">
                    <img src="https://via.placeholder.com/400x250" alt="Main Banner" className="banner-img" />
                    <div className="banner-title-badge">말강즈</div>
                    <div className="banner-pagination">
                        <span className="dot active"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>

                {/* 5. 웹툰 섹션 (가로 스크롤) */}
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">웹툰</span>
                        <span className="arrow-icon">❯</span>
                    </div>

                    <div className="horizontal-scroll-view">
                        <NovelToonMain data={webtoonData}/>
                    </div>
                </div>

                {/* 6. 소설 섹션 (시안 하단에 잘린 부분 대비용 빈 섹션 틀) */}
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-title">소설</span>
                        <span className="arrow-icon">❯</span>
                    </div>
                    <div className="horizontal-scroll-view">
                        <NovelToonMain data={webtoonData}/>
                    </div>
                </div>
                </div>
            {/* 메인 스크롤 영역 끝 */}

            {/* 7. 하단 네비게이션 탭 바 */}
                <ToonMainBottom/>
        </div>
    );
}
export default MainHome;