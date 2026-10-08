// 메인 웹툰 & 소설
export interface novelToonMainData {
    contentId:number;
    title:string;
    description:string;
    author:string;
    type:string;
    toonUrl:string;
    createdAt:string;
    cpName:string;
    rightMember:string;
    views:number;
    leftMember:string;
}

// Props 타입
export interface NovelToonMainProps {
    data: novelToonMainData[];
    mode?: 'MAIN' | 'MEMBER' | 'RANK'; // 3가지 탭/화면을 구분하는 속성 (기본값: 'main')
    type?: string;
    memberId?: string;
    division?: string | boolean;       // boolean 또는 string 대응
    value?: boolean;
}

// 목록 웹툰
export interface novelToonListData {
    contentId?: number;
    title?: string;
    type? : string;
    toonUrl?: string;
    author? : string;
    cpName? : string;
}

export interface NovelToonListProps {
    listData: novelToonListData[] ;
}

// 구매 목록 Id - 전체 웹툰 소설 찜 등
export interface CategoryProps {
    categoryId : string;
}

export interface searchTerm {
    searchItem : string;
}

// 뒤로가기 버튼 공통 사용으로 인한
export interface BackButtonType {
    backtype : string;
}

export interface SignUpParams {
    index : string;
    label : string;
    formData: Record<string, string>;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    error: Record<string, string>;
    setError: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export interface SetLoveState {
    loveOn : boolean
    contentId : number
}

export interface Episode {
    episodeId : number;
    contentId : number;
    episodeNumber : number;
    subTitle : string;
    contentPath? : string;
    price : number;
    created_at : string;
    favorite : boolean;
}

export interface CommentItem {
  id: number;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked?: boolean;
  isMyComment?: boolean; // 자기가 쓴 댓글이면 삭제 버튼 표시용
}