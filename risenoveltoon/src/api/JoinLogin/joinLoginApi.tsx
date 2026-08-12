import axios from "axios";
import type {SignUpForm, CheckParam, LoginForm} from "../../interface/types/auth.tsx";
import api from "./jwtTokenApi"; 

// 회원가입 
export const joinApi = async(signupForm: SignUpForm) => {
        const response= await axios.post("/api/join", signupForm);
    return response;
}

// 아이디, 닉네임 중복 확인
export const duplicateCheckApi = async(checkDataObj : CheckParam) => { 
        const response = await axios.get("/api/duplicateCheck", { 
            params : checkDataObj
    });
    return response;
}

// 로그인
export const loginApi = async(loginForm: LoginForm) => {
        const response= await axios.post("/api/login", loginForm);
    return response;
}

// 마이페이지 진입 시
export const myPageApi = async () => {
    // baseURL이 "/api"로 설정되어 있으므로 경로를 "/myPage"만 적거나 "/api/myPage"로 호출
    const response = await api.get("/myPage"); 
    return response;
};