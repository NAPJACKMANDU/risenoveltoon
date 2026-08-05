import {SomeComponent} from '../routes/webToonRoutes.tsx'
import "../css/webToonMyPageCss.css"
import type  {NovelToonMainProps, NovelToonType, NovelToonMemId, NovelToonDivision} from "../interface/types/novelToon.tsx";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

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
          <SwiperSlide key={item.id}>
            <div className="main-banner">
              <img src={item.img} alt={item.title} className="banner-img" />
              <div className="banner-title-badge">{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// 웹툰과 소설을 보여주는 메인 화면단
export const NovelToonMain = ({data, type, division} : NovelToonMainProps & NovelToonType & NovelToonDivision)=> {
    return(
        <>
        {data
            .filter((item) => item.type === type)
            .map((item) => (
                <div key={item.id} className={division ? "webtoon-card" : "card-item"}>
                    <div className={division ? "thumb-box" : "card-image-wrapper"}>
                        <img 
                            src={item.img} 
                            alt={item.title} 
                            className="card-img"
                        />
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