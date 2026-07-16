import "../css/signUpLoginCss.css";
import "../css/componentsCss.css"
import {BackButton} from "../hooks/functionComHook";

export default function SignUp() {

    return (
        <div className="mobile-container">

            <header className="header-fixed">
                <div className="title-bar">
                    <BackButton/> {/*뒤로가기*/}
                    <h1 className="page-title">회원가입</h1>
                    <div className="empty-space"></div>
                </div>
            </header>
            <main className="sign-content">
                <div className="input-group">
                    <label>본인인증 / 성인인증</label>
                    <div className="button-row">
                        <button type="button" className="auth-btn">휴대폰인증</button>
                        <button type="button" className="auth-btn">간편인증</button>
                    </div>
                </div>

                <div className="input-group">
                    <label>아이디</label>
                    <input type="text" className="main-input" placeholder="아이디를 입력해 주세요" />
                </div>

                <div className="input-group">
                    <label>비밀번호</label>
                    <input type="password" className="main-input" placeholder="비밀번호를 입력해 주세요" />
                </div>

                <div className="input-group">
                    <label>닉네임</label>
                    <input type="text" className="main-input" placeholder="닉네임을 입력해 주세요 (최대 8글자)" maxLength={8} />
                </div>

                <div className="input-group">
                    <label>#CP명</label>
                    <input type="text" className="main-input" placeholder="주 CP명을 입력해 주세요 (최대 2글자)" maxLength={2} />
                </div>

                <div className="divider-container">
                    <div className="divider-line"></div>
                    <span className="divider-text">또는</span>
                    <div className="divider-line"></div>
                </div>
            <div className="input-group">
                <button type="button" className="kakao-btn">💬 카카오톡으로 계속하기</button>
                <button type="button" className="apple-btn"> Apple 계정으로 계속하기</button>
            </div>
            </main>
            <div className="bottom-btn-row">
                <button type="button" className="cancel-btn">취소</button>
                <button type="button" className="submit-btn">계속</button>
            </div>
        </div>
    );
}