import axios from "axios";
import api from "./jwtTokenApi";
import type { SetLoveState } from "../interface/types/novelToon";

// 메인 페이지 툰, 소설 가져오기
export const mainToonNovelApi = async() => {
        const response= await axios.get("/api/mainToonNovel");
    return response;
}

// 조회수
export const viewCountApi = async(contentId : any) => {
        const response = await api.get(`/viewCount/${contentId}`);
    return response;
}

// 하트 누르기 찜
export const setLoveStateApi = async(setLovesItem : SetLoveState) => {
        await api.post("/setLoveState", setLovesItem);
}

// 하트 실시간 조회 서비스
export const fetchEpisodesApi = async(contentId : any) => {
        const response =   await api.post("/fetchEpisodes", contentId);
    return response;
}

// 찜 누른 콘텐츠 값 가져오기
export const loveContentsApi = async() => {
        const response = await api.post("/loveContents");
    return response;
}

// 만화, 소설 에피소드
export const novelToonEpisodesDataApi = async(contentId : any) => {
        const response = await api.get("/novelToonEpisodesData", {
            params: { contentId }
        });
    return response;
}


