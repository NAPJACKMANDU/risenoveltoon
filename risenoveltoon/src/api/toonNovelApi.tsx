import axios from "axios";

export const mainToonNovelApi = async() => {
        const response= await axios.get("/api/mainToonNovel");
    return response;
}