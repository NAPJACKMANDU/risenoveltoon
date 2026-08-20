import "../../css/componentsCss.css"
import "../../css/webToonMemberList.css"
import {useState} from "react";
import {SearchItem, ToonMainBottom, NovelToonListCom} from "../../common/webToonMainCom"
import {BackButton} from "../../hooks/functionComHook";
import { useToonNovelData } from "../../hooks/toonNovelDataHook";
import { useSearchParams } from "react-router-dom"

export const WebTooMembernList = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get("category"); 

        const memberTitle = [
        { id: "shtaro", title: "쇼타로" },
        { id: "seongchan", title: "정성찬" },
        { id: "eunseok", title: "송은석" },
        { id: "wonbin", title: "박원빈" },
        { id: "sohee", title: "이소희" },
        { id: "chanyoung", title: "이찬영" }
    ];

    const [activeTab, setActiveTab] = useState('shtaro');
    const toonNovelData = useToonNovelData();

    return (
        <>  
            <div className="mobile-container">
                <header className="header-fixed">
                        <BackButton backtype={category ? category : "all" }/> {/*뒤로가기*/}
                    {/* 필터 카테고리 탭 */}
                    <SearchItem/>
                        <div className="tab-container">
                        {memberTitle.map((mem) => (
                            <button
                                key={mem.id}
                                className={`tab-btn ${activeTab === mem.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(mem.id)}>
                                {mem.title}
                            </button>
                        ))}
                        </div>
                </header>
            {/* 3. 웹툰 리스트 (3열 그리드) */}
               <NovelToonListCom data = {toonNovelData} type ={category ? category : "all"} memberId={activeTab}/>
             {/*하단 네비게이션 탭 바 */}
            <ToonMainBottom/>
      </div>
    </>
  );
};

export default WebTooMembernList;