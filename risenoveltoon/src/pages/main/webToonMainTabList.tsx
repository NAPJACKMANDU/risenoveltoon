import '../../css/webToonMainCss.css'
import "../../css/componentsCss.css"
import {NovelToonMain, MainBanner} from '../../common/webToonMainCom.tsx'
import {useNavigate} from "react-router-dom";
import type { NovelToonMainProps, NovelToonType} from '../../interface/types/novelToon.tsx';

export const WebToonMainTabList = ({data, type} : NovelToonMainProps & NovelToonType) => {
    const navigate = useNavigate();
    
    let changeMainDiv ;

    switch(type) {
        case "all" :
        changeMainDiv = 
            <>
                {/* 4. 메인 배너 (말강즈 배너) */}
                <MainBanner data = {data}/>

                {/* 5. 웹툰 섹션 */}
                <div className="section-container">
                    <div onClick={() => navigate("/webToonMemberList?category=WEBTOON")} className="section-header">
                        <span className="section-title">웹툰</span>
                        <span className="arrow-icon">❯</span>
                    </div>

                    <div className="horizontal-scroll-view">
                        <NovelToonMain data = {data} type = "WEBTOON"/>
                    </div> 
                </div>

                {/* 6. 소설 섹션 */}
                <div className="section-container">
                    <div onClick={() => navigate("/novelMemberList?category=NOVEL")} className="section-header">
                        <span className="section-title">소설</span>
                        <span className="arrow-icon">❯</span>
                    </div>
                    <div className="horizontal-scroll-view">
                        <NovelToonMain data = {data} type = "NOVEL" />
                    </div>
                </div>
            </>
                break;
        case "WEBTOON" : 
            changeMainDiv =
            <div className="webtoon-grid">
                <NovelToonMain data = {data} type = {type} division = "WEBTOON"/>
            </div>
            break;
        case "NOVEL" : 
            changeMainDiv =
            <div className="webtoon-grid">
                <NovelToonMain data = {data} type = {type} division = "NOVEL"/>
            </div>
            break;
        case "RANK" : 
            changeMainDiv =
            <div className="webtoon-grid">
                <NovelToonMain data = {data} type = {type} division = "RANK"/>
            </div>
        break;
        }
        return(
            <div className="scroll-content">
                {changeMainDiv}
            </div>
    )
}
 
export default WebToonMainTabList;