import {useNavigate} from "react-router-dom";
import "../css/componentsCss.css";
import type {NovelToonListProps, CategoryProps, BackButtonType, novelToonListData, CommentItem} from "../interface/types/novelToon.tsx";
import { commentListApi, viewCountApi } from "../api/toonNovelApi.tsx";
import {useState} from "react";

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
          navigate('/detailScreen', { state: response.data });
        } catch (err) {
          console.error(err);
        }
    };

    let filteredData;
    switch (categoryId) {
        case "all" :
            filteredData = listData ;
            break;
        case "WISH" :
            filteredData = listData;
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


// 댓글 페이지 불러오는 공통
export const fetchComments = async (contentId: number) => {
    const response = await commentListApi(contentId);
    const commentData = response.data;

    // 부모 댓글만 최상위로
    const newComments = commentData
            .filter((item: any) => contentId === item.contentId && !item.parentId)
            .map((item: any) => ({
              commentId: item.commentId,
              userId: item.userId,
              userName: item.nickname,
              content: item.commentText,
              createdAt: item.createdAt.substring(0, 16).replace("T", " "),
              likeCount: item.likeCount,
              episodeId: item.episodeId,
              parentId: item.parentId,
              isLiked: false,
              isMyComment: true,
              replies: commentData
                .filter((r: any) => item.commentId === r.parentId)
                .map((r: any) => ({
                  commentId: r.commentId,
                  userId: r.userId,
                  userName: r.nickname,
                  content: r.commentText,
                  createdAt: r.createdAt.substring(0, 16).replace("T", " "),
                  likeCount: r.likeCount,
                  episodeId: r.episodeId,
                  parentId: r.parentId,
                  isLiked: false,
                  isMyComment: true,
                })),
            }));

        return newComments; 
    };
