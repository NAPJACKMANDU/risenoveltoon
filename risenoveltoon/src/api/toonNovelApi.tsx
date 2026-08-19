import axios from "axios";

// 메인 페이지 툰, 소설 가져오기
export const mainToonNovelApi = async() => {
        const response= await axios.get("/api/mainToonNovel");
    return response;
}