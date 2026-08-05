import "../css/signUpLoginCss.css";
import "../css/componentsCss.css";
import { BackButton } from "../hooks/functionComHook";
import { useNavigate } from "react-router-dom";
import {type ChangeEvent, useState} from "react";
import type {FormErrors, SignUpForm} from "../interface/types/auth.tsx";
import {validateField, validateSignUpForm} from "../utils/validation.tsx";
import {joinApi} from "../api/JoinLogin/joinApi.tsx";
import {PurchaseModal, duplicateCheck} from "../common/modalCom.tsx";

export default function SignUp() {
    const navigate = useNavigate();
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);


    const [signupForm, setSignupForm] = useState<SignUpForm>({
        id: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
        cpName: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // 입력값 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const key = name as keyof SignUpForm;

        const updatedForm = { ...signupForm, [key]: value };
        setSignupForm(updatedForm);

        // 개별 필드 유효성 검사
        const error = validateField(key, value, updatedForm);

        // 비밀번호 변경 시 '비밀번호 확인' 일치 여부도 함께 동기화 검사
        if (key === "password" && signupForm.passwordConfirm) {
            const confirmError = validateField("passwordConfirm", signupForm.passwordConfirm, updatedForm);
            setErrors((prev) => ({ ...prev, password: error, passwordConfirm: confirmError }));
        } else {
            setErrors((prev) => ({ ...prev, [key]: error }));
        }
    };

    const handleConfirmAndNavigate = () => {
            setIsJoinModalOpen(false); // 모달 닫고
            navigate("/loginScreen");
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const formErrors = validateSignUpForm(signupForm);
            setErrors(formErrors);

        // 에러가 없는 경우 제출 로직 실행
        if (Object.keys(formErrors).length === 0) {
            await joinApi(signupForm);
            setIsJoinModalOpen(true);
           
        }
    };

    return (
        <div className="mobile-container">
            <header className="header-fixed">
                <BackButton backtype="회원가입" />
            </header>

            <form className="sign-content" onSubmit={handleSubmit}>
                <main >
                    {/* 본인인증 */}
                    <div className="input-group">
                        <label>본인인증 / 성인인증</label>
                        <div className="button-row">
                            <button type="button" className="auth-btn">휴대폰인증</button>
                            <button type="button" className="auth-btn">간편인증</button>
                        </div>
                    </div>

                    {/* 아이디 */}
                    <div className="input-group">
                        <div>
                        <label style={{ marginRight: '5px'}}>아이디</label>
                        <button type="button" onClick={() => duplicateCheck({ checkData: signupForm.id, title: "id" })} className="duplicate_check">중복확인</button>
                        </div>
                        <input
                            type="text"
                            name="id"
                            className={`main-input ${errors.id ? "input-error" : ""}`}
                            placeholder="아이디를 입력해 주세요"
                            maxLength={12}
                            minLength={4}
                            value={signupForm.id}
                            onChange={handleChange}
                        />
                        {errors.id && <span className="error-text">{errors.id}</span>}
                
                    </div>

                    {/* 비밀번호 */}
                    <div className="input-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            className={`main-input ${errors.password ? "input-error" : ""}`}
                            placeholder="비밀번호를 입력해 주세요"
                            value={signupForm.password}
                            maxLength={16}
                            minLength={8}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="input-group">
                        <label>비밀번호 확인</label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            className={`main-input ${errors.passwordConfirm ? "input-error" : ""}`}
                            placeholder="비밀번호를 다시 입력해 주세요"
                            value={signupForm.passwordConfirm}
                            onChange={handleChange}
                        />
                        {errors.passwordConfirm && <span className="error-text">{errors.passwordConfirm}</span>}
                    </div>

                    {/* 닉네임 */}
                    <div className="input-group">
                        <label style={{ marginRight: '5px'}}>닉네임</label>
                        <button type="button" className="duplicate_check">중복확인</button>
                        <input
                            type="text"
                            name="nickname"
                            className={`main-input ${errors.nickname ? "input-error" : ""}`}
                            placeholder="닉네임을 입력해 주세요 (최대 8글자)"
                            maxLength={8}
                            value={signupForm.nickname}
                            onChange={handleChange}
                        />
                        {errors.nickname && <span className="error-text">{errors.nickname}</span>}
                    </div>

                    {/* 주 CP명 */}
                    <div className="input-group">
                        <label>#CP명</label>
                        <input
                            type="text"
                            name="cpName"
                            className={`main-input ${errors.cpName ? "input-error" : ""}`}
                            placeholder="주 CP명을 입력해 주세요 (최대 2글자)"
                            maxLength={2}
                            value={signupForm.cpName}
                            onChange={handleChange}
                        />
                        {errors.cpName && <span className="error-text">{errors.cpName}</span>}
                    </div>

                    <div className="divider-container">
                        <div className="divider-line"></div>
                        <span className="divider-text">또는</span>
                        <div className="divider-line"></div>
                    </div>

                    {/* 소셜 로그인 */}
                    <div className="input-group">
                        <button type="button" className="kakao-btn">💬 카카오톡으로 계속하기</button>
                        <button type="button" className="apple-btn"> Apple 계정으로 계속하기</button>
                    </div>
                </main>

                {/* 하단 버튼 */}
                <div className="bottom-btn-row">
                    <button onClick={() => navigate(-1)} type="button" className="cancel-btn">취소</button>
                    <button type="submit" className="submit-btn">계속</button>
                </div>
            </form>

             <PurchaseModal 
                modalProps = {{
                    isOpen: isJoinModalOpen,
                    title: "회원가입",
                    description: "회원가입이 완료되었습니다",
                    cancelText : "닫기",
                    onCancel : handleConfirmAndNavigate
            }}/>
        </div>
    );
}