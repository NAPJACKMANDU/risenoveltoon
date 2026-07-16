import "../css/signUpLoginCss.css";
import "../css/componentsCss.css"
import {useNavigate} from "react-router-dom";
import {BackButton} from "../hooks/functionComHook";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="mobile-container">
                <header className="header-fixed">
                <div className="title-bar">
                    <BackButton/> {/*뒤로가기*/}
                    <h1 className="page-title">LOGIN</h1>
                    <div className="empty-space"></div>
                </div>
                    <h2 className="login-subtitle">로그인</h2>
                </header>
            <div className="edit-form">
                <input type="text" className="main-input" placeholder="아이디" style={{marginBottom: '12px'}} />
                <input type="password" className="main-input" placeholder="비밀번호" style={{marginBottom: '16px'}} />

                <div className="login-bottom-btn">
                <button type="button" className="submit-btn">계속</button>
                </div>
                <div className="divider-container">
                    <div className="divider-line"></div>
                    <span className="divider-text">또는</span>
                    <div className="divider-line"></div>
                </div>

                <button type="button" className="kakao-btn">💬 카카오톡으로 계속하기</button>
                <button type="button" className="apple-btn"> Apple 계정으로 계속하기</button>

                <button type="button" onClick={() => navigate("/signUpScreen")} className="round-link-btn">계정이 없으신가요? 회원가입 하기</button>
            </div>
            </div>
    );
}