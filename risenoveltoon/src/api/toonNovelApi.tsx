import axios from "axios";
import api from "./jwtTokenApi";

// 메인 페이지 툰, 소설 가져오기
export const mainToonNovelApi = async() => {
        const response= await axios.get("/api/mainToonNovel");
    return response;
}

export const viewCountApi = async(contentId : any) => {
        const response = await api.get(`/viewCount/${contentId}`);
    return response;
}