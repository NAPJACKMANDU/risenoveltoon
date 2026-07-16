import "../css/componentsCss.css"
import "../css/toonViewerCss.css"
import {BackButton} from "../hooks/functionComHook";

export default function ToonViewer() {
    return (
        <div className="mobile-container">
            {/* 📱 상단 헤더 고정 */}
            <div className="header-fixed">
                <div className="title-bar">
                  <BackButton/>
                    <h1 className="page-title">말강즈</h1>
                    <div className="empty-space"></div>
                </div>
            </div>

            {/* 📜 스크롤 및 뷰어 본문 영역 */}
            <div className="scroll-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="viewer-area">
                    웹툰 페이지 ...
                </div>

                {/* 하단 제어 바 */}
                <div className="viewer-bottom-bar">
                    <div className="viewer-actions">
                        <span>❤️ 1,234</span>
                        <span>💬 1,234</span>
                    </div>
                    <div className="viewer-controls">
                        <span>〈</span>
                        <span>📋</span>
                        <span>〉</span>
                    </div>
                </div>
            </div>
        </div>
    );
}