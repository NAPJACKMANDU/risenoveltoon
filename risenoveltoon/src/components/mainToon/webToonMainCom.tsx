import {SomeComponent} from '../../routes/webToonRoutes.tsx'
import "../../css/webToonMyPageCss.css"
import type {NovelToonMainProps} from "../../interface/types.tsx";


// 하단 메뉴바 공통
export const ToonMainBottom = () => {
    return (
        <div>
            <SomeComponent/>
        </div>
    )
}

// 웹툰과 소설을 보여주는 메인 화면단
export const NovelToonMain = ({data} : NovelToonMainProps)=> {
    return(
        <>
            {data.map((item) => (
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


