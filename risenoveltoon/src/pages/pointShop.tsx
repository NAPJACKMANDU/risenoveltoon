import "../css/componentsCss.css"
import "../css/pointShopCss.css"

import {ToonMainBottom} from "../common/webToonMainCom";
import {BackButton} from "../hooks/functionComHook";
import { useState } from "react";

export default function PointShop() {
    const points = [
        {id : 1, coin : '1,000P'},
        {id : 2, coin : '3,000P'}, 
        {id : 3, coin : '5,000P'}, 
        {id : 4, coin : '7,000P'}, 
        {id : 5, coin : '9,000P'}, 
        {id : 6, coin : '10,000P'}
    ];
    const [isCheck, setiscCheck] = useState(1);

    return (
        <div className="mobile-container">
            {/* 📱 상단 헤더 고정 */}
            <div className="header-fixed">
                    <BackButton backtype ="충전소"/>
            </div>

            {/* 📜 충전소 본문 내용 */}
            <div className="scroll-content">
                <div className="charge-list">
                    {points.map((point) => (
                        <div className="charge-item" onClick = {() => setiscCheck(point.id)} key={point.id}>
                            <div className="charge-left" >
                                <button type="button" key={point.id} className={isCheck === point.id ? 'radio-change' : 'radio-circle'}></button>
                                <span>{point.coin}</span>
                            </div>
                            <span className="charge-price">{point.coin.replace('P', '원')}</span>
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