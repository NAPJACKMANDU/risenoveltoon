import {SomeComponent} from '../routes/webToonRoutes.tsx'
import "../css/webToonMyPageCss.css"
import type  {novelToonMainData, NovelToonMainProps} from "../interface/types/novelToon.tsx";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import { viewCountApi } from '../api/toonNovelApi.tsx';

// Swiper 기본 스타일 불러오기
import "swiper/css";
import "swiper/css/pagination";


  // 하단 메뉴바 공통
  export const ToonMainBottom = () => {
      return (
          <div>
              <SomeComponent/>
          </div>
      )
  }
  // 메인 웹툰 & 소설 랜덤 5개 추출 배너
  export const MainBanner = ({ data }: NovelToonMainProps) => {
    const [randomList, setRandomList] = useState<typeof data>([]);

    // 처음 로드될 때 랜덤 5개 추출
    useEffect(() => {
      if (data && data.length > 0) {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setRandomList(shuffled.slice(0, 5));
      }
    }, [data]);

    if (!randomList || randomList.length === 0) return null;

    return (
      <div className="main-banner-wrapper">
        <Swiper
          modules={[Autoplay, Pagination]}
          // Swiper에서 사용할 기능 모듈을 지정, 
          // 자동슬라이드와 페이지네이션 기능 활성화
          spaceBetween={0}
          // 슬라이드 사이 간격 설정
          slidesPerView={1}
          // 한번에 보여줄 슬라이드 개수 설정
          loop={true} // 무한 루프
          autoplay={{
            delay: 3000, // 3초마다 자동으로 넘어감
            disableOnInteraction: false, // 사용자가 터치한 뒤에도 자동 슬라이드 유지
          }}
          pagination={{ clickable: true }} // 아래 Dot 클릭 가능
          className="mySwiper"
        >
          {randomList.map((item) => (
            <SwiperSlide key={item.contentId}>
              <div className="main-banner">
                <img src={item.toonUrl || undefined} alt={item.title} className="banner-img" />
                <div className="banner-title-badge">{item.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  // 검색 기능 공통
  export const SearchItem = ({ onToggle }: { onToggle: (value: boolean) => void }) => {
    const [isOn, setIsOn] = useState(false);

      const handleToggle = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        onToggle(newValue);
      };

    return (
      <div className="container">
        {/* 검색 박스 */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="검색" className="search-input" />
        </div>

        {/* 토글 박스 */}
        <div className="toggle-container" onClick={handleToggle}>
          <div className={`toggle ${isOn ? "on" : "off"}`}>
            <div className="toggle-circle"></div>
          </div>
          <span className="toggle-label">{isOn ? "른" : "왼"}</span>
        </div>
      </div>
    );
  }

// 💥 3개의 컴포넌트를 하나로 통합한 공통 컴포넌트
export const NovelToonList = ({ data, mode = 'MAIN', type, memberId, division, value}: NovelToonMainProps) => {
  
  const navigate = useNavigate();

  // 1. 공통 API 클릭 이벤트 핸들러
  const viewCountHandle = async (item: novelToonMainData) => {
    try {
      const response = await viewCountApi(item.contentId); // 또는 item 전달
      console.log(response);
      navigate('/detailScreen', { state: response });
    } catch (err) {
      console.error(err);
    }
  };

    let changeMainDiv ;

    switch(mode) {
      case "MAIN" :   // 웹툰과 소설을 보여주는 메인 화면단
        changeMainDiv = 
        <>
        {data
              .filter((item) => item.type === type)
              .map((item) => (
                  <div onClick={() => viewCountHandle(item)} key={item.contentId} className={division ? "webtoon-card" : "card-item"}>
                      <div className={division ? "thumb-box" : "card-image-wrapper"}>
                          <img 
                              src={item.toonUrl || undefined} 
                              alt={item.title} 
                              className="card-img"
                          />
                      </div>
                      <div className="info-box">
                          <div className='sub-info'>
                              <span className="title" style={{ marginRight: '2px'}}>[{item.cpName}]</span>
                              <span className="title">{item.title}</span>
                          </div>
                              <span className="author">{item.author}</span>
                      </div>
                  </div>
              ))}
        </>
        break;
      case "MEMBER" : // 멤버 탭에 따라 보여지는 소설과 웹툰 페이지
        changeMainDiv =
        <>
               <div className="webtoon-grid">
                 {data 
                         .filter((item) => (value ? item.rightMember === memberId : item.leftMember === memberId) && (type === "all" || item.type === type))
                         .map((item) => (
                 <div onClick={() => viewCountHandle(item)} key={item.contentId} className="webtoon-card">
                     <div className="thumb-box">
                         <img src={item.toonUrl || undefined} alt={item.title} />
                     </div>
                      <div className="info-box">
                          <div>
                              <span className="title" style={{ marginRight: '2px'}}>[{item.cpName}]</span>
                              <span className="title">{item.title}</span>
                          </div>
                              <span className="author">{item.author}</span>
                      </div>
                  </div>
             ))}
         </div>
        </>
        break;
      case "RANK" : // 소설과 웹툰 랭킹 탭
        changeMainDiv =
        <>
          {data
            .sort((a, b) => {
               const aViews = a.views ?? 0;
               const bViews = b.views ?? 0;
               return bViews - aViews;
             })
             .map((item, index) => (
               <div onClick={() => viewCountHandle(item)} key={item.contentId} className={division ? "webtoon-card" : "card-item"}>
                 <div className={division ? "thumb-box" : "card-image-wrapper"}>
                   <img 
                     src={item.toonUrl || undefined} 
                     alt={item.title} 
                     className="card-img"
                   />
                   {/* 순위 표시 */}
                   <div className="rank-badge">{index + 1}</div>
                 </div>
                 <div className="info-box">
                   <div className='sub-info'>
                     <span className="title" style={{ marginRight: '2px'}}>[{item.cpName}]</span>
                     <span className="title">{item.title}</span>
                   </div>
                   <span className="author">{item.author}</span>
                 </div>
              </div>
            ))}
        </>
        break;
  }
  return (
    <>
          {changeMainDiv}
          </>
  )
}