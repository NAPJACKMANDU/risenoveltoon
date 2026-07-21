// 메인 웹툰 
export interface novelToonMainData {
    id: number | string;
    title: string;
    tag: string;
    type : string;
    img: string;
    memberId : string;
    author:string;
}
// Props : 넘겨주는 속성값
export interface NovelToonMainProps {
    data: novelToonMainData[];
}

// 메인 웹툰인지 소설인지 확인 후 보여 주기
export interface NovelToonType {
    type : string;
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


