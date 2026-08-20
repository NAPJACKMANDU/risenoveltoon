import {useNavigate} from "react-router-dom";
import "../css/componentsCss.css";
import type {NovelToonListProps, CategoryProps, BackButtonType} from "../interface/types/novelToon.tsx";

// 뒤로가기 공통
export const BackButton = ({backtype} : BackButtonType) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // 뒤로가기
    };

    switch(backtype)  {
        case "WEBTOON" :
            backtype = "웹툰" ;
            break;
        case "NOVEL" :
            backtype = "소설" ;
            break;
        default :    
            backtype = "전체" ;
            break;
    }

    return (
        <div className="title-bar">
        <button className="back-btn" onClick={handleBack}>
            〈
        </button>
        <h1 className="page-title">{backtype}</h1>
        <div className="empty-space"></div>
        </div>
    );
};

// 전체, 웹툰, 소설, 랭킹 등 버튼 클릭 시 필터링 공통
export const CategoryButton = ({listData, categoryId} : NovelToonListProps & CategoryProps) => {
    const navigate = useNavigate();

    const filteredData =
        categoryId === "all"
            ? listData
            : listData.filter((item) => item.type === categoryId);

    return (
        <div className="scroll-content">
            <main className="list-content">
                {filteredData.map((item) => (
                    <div onClick={() => navigate("/detailScreen", {state: item})} key={item.id} className="list-item">
                        <img alt={item.title} className="item-img" />
                        <div className="item-info">
                            <h2 className="item-title">{item.title}</h2>
                            <p className="item-tag">{item.tag}</p>
                        </div>
                        <button className="detail-btn">〉</button>
                    </div>
                ))}
            </main>
        </div>
    );
}
