import axios from "axios";
import type {SignUpForm, CheckParam} from "../../interface/types/auth.tsx";

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
    console.log(response)
    return response;
}