import "../../css/componentsCss.css";
import "../../css/detailScreenCss.css";

import { ToonMainBottom } from "../../common/webToonMainCom";
import { BackButton } from "../../hooks/functionComHook";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Detail() {
    const navigate = useNavigate();
    const tags = ['쇼타로', '이찬영', '말강즈', '맏막즈', '타로앤톤'];
    const episodes = [
        { ep: '4화', date: '26.01.22', price: '300원' },
        { ep: '3화', date: '26.01.15', price: '300원' },
        { ep: '2화', date: '26.01.08', price: '300원' },
        { ep: '1화', date: '26.01.01', price: '무료' },
    ];

    const [isLoveOn, setIsLoveOn] = useState<boolean>(false);

    const handleClick = () => {
        setIsLoveOn((prev) => !prev);
    };

    const { state } = useLocation();

    return (
        <div className="mobile-container">
            {/* 📱 상단 헤더 고정 */}
            <div className="header-fixed transparent-header">
                <BackButton backtype="" />
            </div>

            {/* 📜 상세페이지 본문 스크롤 영역 */}
            <div className="scroll-content">
                {/* 메인 상단 배너 이미지 */}
                <div className="top-banner-area">
                    <div 
                        className="banner-cover-img" 
                        style={state?.img ? state.img : { backgroundColor: '#ffd5a4' }}
                    />
                </div>

                {/* 작품정보 세부 영역 */}
                <div className="info-section">
                    <h1 className="title-text">{state?.title || "제목 없음"}</h1>

                    <div className="author-text">{state?.author || "작가명"}</div>

                    <div className="stats-and-like-row">
                        <div className="stats-group">
                            <span className="stat-item">👁️{state?.views.toLocaleString() || "0"}</span>
                            <span className="stat-item">💬1,583 &gt;</span>
                        </div>
                        <button 
                            onClick={handleClick} 
                            className={`like-btn ${isLoveOn ? "active" : ""}`}
                        >
                            <span className="heart-icon">{isLoveOn ? "❤️" : "🤍"}</span>
                            <span className="like-count">6,308</span>
                        </button>
                    </div>

                    {/* 태그 리스트 */}
                    <div className="detail-tag-container">
                        <span className="tag-chip active-tag">전체보기</span>
                        {tags.map((t, i) => (
                            <span key={i} className="tag-chip">#{t}</span>
                        ))}
                    </div>
                </div>

                {/* 분홍색 메인 보기 버튼 */}
                <div className="action-button-wrapper">
                    <button className="primary-action-btn" onClick={() => navigate("/webToonDetail")}>
                        1화 보기
                    </button>
                </div>

                {/* 에피소드 리스트 */}
                <div className="episode-list">
                    {episodes.map((item, idx) => (
                        <div onClick={() => navigate("/webToonDetail")} className="episode-item" key={idx}>
                            <div className="episode-left">
                                <div className="episode-thumb" />
                                <div className="episode-meta">
                                    <span className="ep-title">{item.ep}</span>
                                    <span className="ep-date">{item.date}</span>
                                </div>
                            </div>
                            <button 
                                className="price-tag-btn" 
                                style={{ 
                                    borderColor: item.price === '무료' ? '#ffaf54' : '#e2e2e2', 
                                    color: item.price === '무료' ? '#ffaf54' : '#333' 
                                }}
                            >
                                {item.price}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🧭 하단 탭 바 고정 */}
            <ToonMainBottom />
        </div>
    );
}