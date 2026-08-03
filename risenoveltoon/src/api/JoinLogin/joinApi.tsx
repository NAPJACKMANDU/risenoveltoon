import axios from "axios";
import type {SignUpForm} from "../../interface/types/auth.tsx";

export const joinApi = async(signupForm: SignUpForm) => {
         console.log(">>>>>>>>>> : " + signupForm);
        const response= await axios.post("/api/join", signupForm);
    return response;
}