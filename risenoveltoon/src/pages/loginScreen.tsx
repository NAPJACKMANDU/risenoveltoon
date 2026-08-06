import "../css/signUpLoginCss.css";
import "../css/componentsCss.css"
import {useNavigate} from "react-router-dom";
import {BackButton} from "../hooks/functionComHook";
import { useState } from "react";
import { PurchaseModal } from "../common/modalCom";
import { loginApi } from "../api/JoinLogin/joinApi";
import type { LoginForm } from "../interface/types/auth";

export default function Login() {
    const navigate = useNavigate();
    const [modalMessage, setModalMessage] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleConfirmAndNavigate = () => {
            setIsLoginModalOpen(false); // 모달 닫고
    };

    const [loginForm, setLoginForm] = useState<LoginForm>({
            id: "",
            password: ""
    });

    const loginSubmit = async (e: { preventDefault: () => void; }) => { 
        e.preventDefault();
        
       try {
               const response =  await loginApi(loginForm);
               if(response) {
                    navigate("/")
               } 
           }    
        catch (error : any){
                setModalMessage(error.response?.data?.detail);
                setIsLoginModalOpen(true)
                setLoginForm((prev) => ({
                  ...prev,
                  password: ""
                }));
            }
    }
    return (
        <div className="mobile-container">
                <header className="header-fixed">
                    <BackButton backtype = "LOGIN" /> {/*뒤로가기*/}
                    <h2 className="login-subtitle">로그인</h2>
                </header>
            <form onSubmit={loginSubmit}>
                <div className="login-edit-form">
                   <input type="text" name="id" className="main-input" placeholder="아이디" style={{marginBottom: '12px'}} />
                   <input type="password" name="password" className="main-input" placeholder="비밀번호" style={{marginBottom: '16px'}} />

                   <div className="login-bottom-btn">
                       <button type="submit" className="submit-btn">계속</button>
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
            </form>

            <PurchaseModal 
                modalProps = {{
                    isOpen: isLoginModalOpen,
                    description: modalMessage,
                    cancelText : "닫기",
                    onCancel : handleConfirmAndNavigate
            }}/>
        </div>
    );
}