import { useEffect, useState } from 'react';
import { ToonMainBottom } from "../common/webToonMainCom";
import { useNavigate } from "react-router-dom";
import "../css/componentsCss.css";
import "../css/searchScreenCss.css";
import { useToonNovelData } from '../hooks/toonNovelDataHook';

export default function SearchPage() {
    const [categoryId, setActiveTab] = useState('all');
    const navigate = useNavigate();
    const toonNovelData = useToonNovelData();
    const [randomList, setRandomList] = useState<typeof toonNovelData>([]);

    const recentSearches = ['쇼타로', '이찬영', '송은석', '말강즈', '타로앤톤', '정성찬', '떡대', '또토리', '막내즈'];
    const hotTags = ['쇼타로', '이찬영', '말강즈', '알막즈', '타로앤톤', '박원빈', '성찬영', '떡대', '미인', '송은석'];

    useEffect(() => {
        if (toonNovelData && toonNovelData.length > 0) {
            const shuffled = [...toonNovelData].sort(() => 0.5 - Math.random());
            setRandomList(shuffled.slice(0, 20));
        }
    }, [toonNovelData]);

    if (!randomList || randomList.length === 0) return null;

    // 위/아래 두 줄로 나누고 무한 연결을 위해 2배 복제
    const topList = randomList.filter((_, i) => i % 2 === 0);
    const bottomList = randomList.filter((_, i) => i % 2 !== 0);
    const doubleTopList = [...topList, ...topList];
    const doubleBottomList = [...bottomList, ...bottomList];

    const categoryTitle = [{ id: "all", title: "📋 전체" }, { id: "webtoon", title: "📔 웹툰" }, { id: "novel", title: "📖 소설" }];

    return (
        <div className="mobile-container">
            <div className="header-fixed"><div style={{ height: '8px' }}></div></div>
            
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="검색" className="search-input" />
                </div>
            </div>

            <div className="category-tabs">
                {categoryTitle.map((cat) => (
                    <button key={cat.id} className={`tab-btn ${categoryId === cat.id ? 'active' : ''}`} onClick={() => setActiveTab(cat.id)}>
                        {cat.title}
                    </button>
                ))}
            </div>

            <div className="scroll-content">
                <div className="charge-section-title">최근 검색어</div>
                <div className="tag-container">
                    {recentSearches.map((name, i) => <span key={i} className="tag-chip">#{name}</span>)}
                </div>

                <div className="charge-section-title" style={{ marginTop: '10px' }}>지금 핫한 작품</div>
                
                {/* 🔄 위/아래 각각 무한으로 자동 이동하는 영역 */}
                <div className="auto-scroll-wrapper">
                    <div className="scroll-row">
                        <div className="track track-left">
                            {doubleTopList.map((work, i) => (
                                <div className="grid-item" key={`top-${i}`} onClick={() => navigate("/detailScreen")}>
                                    <div className="grid-img" />
                                    <span className="grid-info-title">{work.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="scroll-row">
                        <div className="track track-right">
                            {doubleBottomList.map((work, i) => (
                                <div className="grid-item" key={`bottom-${i}`} onClick={() => navigate("/detailScreen")}>
                                    <div className="grid-img" />
                                    <span className="grid-info-title">{work.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="charge-section-title" style={{ marginTop: '20px' }}>최다 검색 태그</div>
                <div className="tag-container">
                    {hotTags.map((tag, i) => <span key={i} className="tag-chip">#{tag}</span>)}
                </div>
            </div>

            <ToonMainBottom/>
        </div>
    );
}