import axios from "axios";
import type {SignUpForm, CheckParam, LoginForm, InfoChangeData} from "../interface/types/auth.tsx";
import api from "./jwtTokenApi.tsx"; 

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

// 마이페이지 진입
export const myPageApi = async () => {
    const response = await api.post("/myPage")
    return response;
};

// 정보 변경
export const informationChangeApi = async (myPageInfo : InfoChangeData) => {
    const response = await api.post("/informationChange", myPageInfo)
    return response;
};