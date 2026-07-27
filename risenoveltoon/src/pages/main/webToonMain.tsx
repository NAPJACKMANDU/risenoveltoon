import '../../css/webToonMainCss.css'
import "../../css/componentsCss.css"
import {ToonMainBottom} from '../../components/mainToon/webToonMainCom.tsx'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {WebToonMainTabList} from "../main/webToonMainTabList.tsx"
import {novelToonData} from "../../components/mainToon/webToonData.tsx"


export const MainHome = () => {
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
                <WebToonMainTabList data = {novelToonData}  type = {categoryId} />
            {/* 메인 스크롤 영역 끝 */}

            {/* 7. 하단 네비게이션 탭 바 */}
                <ToonMainBottom/>
        </div>
    );
}
export default MainHome;