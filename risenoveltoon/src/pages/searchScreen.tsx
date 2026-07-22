import {useState} from 'react';
import {ToonMainBottom} from "../components/mainToon/webToonMainCom";
import { useNavigate } from "react-router-dom";
import "../css/componentsCss.css"
import "../css/searchScreenCss.css"

export default function SearchPage() {
    const [categoryId, setActiveTab] = useState('all');
    const navigate = useNavigate();

    const recentSearches = ['쇼타로', '이찬영', '송은석', '말강즈', '타로앤톤', '정성찬', '떡대', '또토리', '막내즈'];
    const hotTags = ['쇼타로', '이찬영', '말강즈', '알막즈', '타로앤톤', '박원빈', '성찬영', '떡대', '미인', '송은석'];
    const purchaseList = [
        { id: 1, title: '말강즈', tag: '#CP', type: 'webtoon' },
        { id: 2, title: '빈앤톤89듀오', tag: '#CP', type: 'webtoon' },
        { id: 3, title: '제목입니당ㅇ!', tag: '#CP', type: 'novel' },
        { id: 4, title: '송은석이찬영투톤즈ㅋㅋ', tag: '#CP', type: 'webtoon' },
        { id: 5, title: '또리토리또토리', tag: '#CP', type: 'novel' },
    ];
    const categoryTitle = [
        { id: "all", title: "📋 전체" },
        { id: "webtoon", title: "📔 웹툰" },
        { id: "novel", title: "📖 소설" }
    ];

    return (
        <div className="mobile-container">
            {/* 📱 상단 상태바 고정 */}
            <div className="header-fixed">
                <div style={{ height: '8px' }}></div> {/* 서치바 레이아웃 간격 맞춤용 */}
            </div>
            
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="검색" className="search-input" />
                </div>
            </div>

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


            {/* 📜 검색 본문 내용 */}
            <div className="scroll-content">

                
                <div className="charge-section-title">최근 검색어</div>
                <div className="tag-container">
                    {recentSearches.map((name, i) => (
                        <span key={i} className="tag-chip">#{name}</span>
                    ))}
                </div>

                <div className="charge-section-title" style={{ marginTop: '10px' }}>지금 핫한 작품</div>
                    <div className="grid-scroll-wrapper">
                        <div  onClick={() => navigate("/detailScreen")} className="grid-container">
                            {purchaseList.map((work, i) => (
                                <div className="grid-item" key={i}>
                                    <div className="grid-img" />
                                    <span className="grid-info-title">{work.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                <div className="charge-section-title" style={{ marginTop: '20px' }}>최다 검색 태그</div>
                <div className="tag-container">
                    {hotTags.map((tag, i) => (
                        <span key={i} className="tag-chip">#{tag}</span>
                    ))}
                </div>
            </div>

            {/* 🧭 하단 탭 바 고정 */}
                <ToonMainBottom/>
        </div>
    );
}