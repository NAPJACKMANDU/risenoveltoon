import {useNavigate} from "react-router-dom";
import "../css/componentsCss.css";
import type {NovelToonListProps, CategoryProps, BackButtonType, novelToonListData} from "../interface/types/novelToon.tsx";
import { loveContentsApi, viewCountApi } from "../api/toonNovelApi.tsx";

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
        case "all" :   
            backtype = "전체" ;
            break;
    }

    return (
        <div className={backtype ? "title-bar" : "title-bar-Detail" }>
        <button className="back-btn" onClick={handleBack}>
            〈
        </button>
        <h1 className="page-title">{backtype}</h1>
        <div className="empty-space"></div>
        </div>
    );
};

// 전체, 웹툰, 소설, 찜 등 버튼 클릭 시 필터링 공통
export const CategoryButton = ({listData, categoryId} : NovelToonListProps & CategoryProps) => {
 
    const navigate = useNavigate();

    // 공통 API 클릭 이벤트 핸들러
    const viewCountHandle = async (item: novelToonListData) => {
        try {
          const response = await viewCountApi(item.contentId); // 또는 item 전달
          console.log(response.data);
          navigate('/detailScreen', { state: response.data });
        } catch (err) {
          console.error(err);
        }
    };


    const loveContentHandle = async() => {
        try {
            const response = await loveContentsApi() ;
            console.log(response.data);
        } catch(err : any) {

        }
    }

    let filteredData;

    switch (categoryId) {
        case "all" :
            filteredData = listData ;
            break;
        case "WISH" :
            filteredData = loveContentHandle();
            break;
        default :
            filteredData = listData.filter((item) => item.type === categoryId);
            break;
    }

    return (
        <div className="scroll-content">
            <main className="list-content">
                {filteredData?.map((item) => (
                    <div onClick={() => viewCountHandle(item)} key={item.contentId} className="list-item">
                        <img alt={item.title} className="item-img" />
                        <div className="item-info">
                            <h2 className="item-title">[{item.cpName}] {item.title}</h2>
                            <p className="item-tag">{item.author}</p>
                        </div>
                        <button className="detail-btn">〉</button>
                    </div>
                ))}
            </main>
        </div>
    );
}


