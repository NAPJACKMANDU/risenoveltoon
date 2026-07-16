export interface webtoonData {
    id: number | string;
    tag: string;
    title: string;
    img: string;
}

export interface NovelToonMainProps {
    data: webtoonData[];
}