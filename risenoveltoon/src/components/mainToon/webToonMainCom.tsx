import {SomeComponent} from '../../routes/webToonRoutes.tsx'
import "../../css/webToonMyPageCss.css"
import type {NovelToonMainProps, NovelToonType} from "../../interface/types";

// 하단 메뉴바 공통
export const ToonMainBottom = () => {
    return (
        <div>
            <SomeComponent/>
        </div>
    )
}

// 웹툰과 소설을 보여주는 메인 화면단
export const NovelToonMain = ({data, type} : NovelToonMainProps & NovelToonType)=> {
    return(
        <>
        {data
            .filter((item) => item.type === type)
            .map((item) => (
                <div key={item.id} className="card-item">
                    <div className="card-image-wrapper">
                        <img src={item.img} alt={item.title} className="card-img" />
                    </div>
                    <span className="card-tag">{item.tag}</span>
                    <span className="card-title">{item.title}</span>
                </div>

            ))}
        </>
    );
};

// 검색 기능 공통
export const SearchItem = () => {

    return (
            <div className="search-container">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="검색" className="search-input" />
            </div>
    )
}

