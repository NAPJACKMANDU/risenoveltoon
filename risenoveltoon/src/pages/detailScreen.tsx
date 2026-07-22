import "../css/componentsCss.css"
import "../css/detailScreenCss.css"

import {ToonMainBottom} from "../components/mainToon/webToonMainCom";
import {BackButton} from "../hooks/functionComHook";

export default function Detail() {
    const tags = ['쇼타로', '이찬영', '말강즈', '맏막즈', '타로앤톤'];
    const episodes = [
        { ep: '4화', date: '26.01.22', price: '300원' },
        { ep: '3화', date: '26.01.15', price: '300원' },
        { ep: '2화', date: '26.01.08', price: '300원' },
        { ep: '1화', date: '26.01.01', price: '무료' },
    ];

    return (
        <div className="mobile-container">
            {/* 📱 상단 헤더 고정 */}
            <div className="header-fixed">
                <BackButton backtype="말강즈"/>
            </div>

            {/* 📜 상세페이지 본문 스크롤 영역 */}
            <div className="scroll-content">
                <div className="detail-banner-card">
                    {/* 실제 이미지 적용 시 배경색 제거하고 src 넣으면 됨 */}
                    <div className="banner-cover-img" style={{ backgroundColor: '#e2f558 ' }} />
                    <div className="banner-info-overlay">
                        <div className="banner-title">말강즈</div>
                        <div className="banner-buttons">
                            <button className="overlay-btn">첫화보기</button>
                            <button className="overlay-btn">이어보기</button>
                            <button className="overlay-btn primary">❤️</button>
                            <button className="overlay-btn">💬</button>
                        </div>
                    </div>
                </div>

                <div className="detail-tag-container" style={{ padding: '0 16px 12px 16px' }}>
                    {tags.map((t, i) => (
                        <span key={i} className="tag-chip">#{t}</span>
                    ))}
                </div>

                <div className="episode-list">
                    {episodes.map((item, idx) => (
                        <div className="episode-item" key={idx}>
                            <div className="episode-left">
                                <div className="episode-thumb" />
                                <div className="episode-meta">
                                    <span className="ep-title">{item.ep}</span>
                                    <span className="ep-date">{item.date}</span>
                                </div>
                            </div>
                            <button className="price-tag-btn" style={{ borderColor: item.price === ' 무료 ' ? '#000' : '#ccc', background: '#fff' }}>
                                {item.price}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🧭 하단 탭 바 고정 */}
            <ToonMainBottom/>
        </div>
    );
}