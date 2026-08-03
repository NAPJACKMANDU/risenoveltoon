import axios from "axios";

export const mypageSessionApi = async(loginSession) => {
    const response= await axios.post("/webToonMyPage", {loginSession});
    return response;
}