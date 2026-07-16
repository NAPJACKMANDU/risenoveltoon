// 메인 웹툰 
export interface novelToonMainData {
    id: number | string;
    tag: string;
    title: string;
    img: string;
}
// Props : 넘겨주는 속성값
export interface NovelToonMainProps {
    data: novelToonMainData[];
}

// 목록 웹툰
export interface novelToonListData {
    id: number | string;
    title: string;
    tag: string;
    type : string;
    img: string;
}

export interface NovelToonListProps {
    listData: novelToonListData[];
}

// 목록 Id - 전체 웹툰 소설 찜 등
export interface CategoryProps {
    categoryId : string;
}