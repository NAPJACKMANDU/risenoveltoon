import "../css/componentsCss.css"
import "../css/pointShopCss.css"

import {ToonMainBottom} from "../components/mainToon/webToonMainCom";
import {BackButton} from "../hooks/functionComHook";

export default function PointShop() {
    const points = ['1000P', '3000P', '5000P', '7000P', '9000P', '10,000P'];


    const coinButtonClick =  (point : string) => {
  ;
    };

    return (
        <div className="mobile-container">
            {/* 📱 상단 헤더 고정 */}
            <div className="header-fixed">
                    <BackButton backtype ="충전소"/>
            </div>

            {/* 📜 충전소 본문 내용 */}
            <div className="scroll-content">
                <div className="charge-list">
                    {points.map((point, idx) => (
                        <div className="charge-item" key={idx}>
                            <div className="charge-left">
                                <button type="button" onClick = {() => coinButtonClick(point)} className="radio-circle"></button>
                                <span>{point}</span>
                            </div>
                            <span className="charge-price">{point.replace('P', '원')}</span>
                        </div>
                    ))}
                </div>

                <div className="charge-section-title" style={{ marginTop: '16px' }}>결제방법</div>
                <div className="pay-methods">
                    <button className="pay-btn kakao">💬 Kakao pay</button>
                    <button className="pay-btn toss"> Toss pay</button>
                </div>

                <div className="terms-text">
                    <span>[필수] 결제 서비스 이용 약관, 개인정보 처리 동의</span>
                    <span>〉</span>
                </div>

                <button className="action-submit-btn" style={{ width: 'calc(100% - 32px)', border: 'none' }}>
                    결제하기
                </button>
            </div>

            {/* 🧭 하단 탭 바 고정 */}
            <ToonMainBottom/>
        </div>
    );
}