import {SomeComponent} from '../../routes/webToonRoutes.tsx'
import "../../css/webToonMyPageCss.css"
import type {NovelToonMainProps, NovelToonType, NovelToonMemId, NovelToonDivision} from "../../interface/types";

// 하단 메뉴바 공통
export const ToonMainBottom = () => {
    return (
        <div>
            <SomeComponent/>
        </div>
    )
}

// 웹툰과 소설을 보여주는 메인 화면단
export const NovelToonMain = ({data, type, division} : NovelToonMainProps & NovelToonType & NovelToonDivision)=> {
    return(
        <>
        {data
            .filter((item) => item.type === type)
            .map((item) => (
                <div key={item.id} className={division ? "webtoon-card" : "card-item"}>
                    <div className={division ? "thumb-box" : "card-image-wrapper"}>
                        <img src={item.img} alt={item.title} className={division ? "thumb-box" : "card-image-wrapper"}/>
                    </div>
                    <div className="info-box">
                        <div className='sub-info'>
                            <span className="title" style={{ marginRight: '2px'}}>[{item.tag}]</span>
                            <span className="title">{item.title}</span>
                        </div>
                            <span className="author">{item.author}</span>
                    </div>
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

// 멤버 탭에 따라 보여지는 소설과 웹툰 페이지
export const NovelToonListCom = ({data, type, memberId} : NovelToonMainProps & NovelToonType & NovelToonMemId) => {
    return (
     <div className="webtoon-grid">
               { data 
                       .filter((item) => item.memberId === memberId && item.type === type)
                       .map((item) => (
               <div key={item.id} className="webtoon-card">
                   <div className="thumb-box">
                       <img src={item.img} alt={item.title} />
                   </div>
                    <div className="info-box">
                        <div>
                            <span className="title" style={{ marginRight: '2px'}}>[{item.tag}]</span>
                            <span className="title">{item.title}</span>
                        </div>
                            <span className="author">{item.author}</span>
                    </div>
                </div>
           ))}
       </div>
    )
}