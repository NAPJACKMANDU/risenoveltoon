import React, { useState, useEffect } from "react";
import type { CommentItem } from "../interface/types/novelToon";
import "../css/commentCss.css";
import antonImg from '../assets/img/anton.jpg'; 
import { commentHandlerApi } from "../api/toonNovelApi";

interface CommentSectionProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  initialComments?: CommentItem[];
  onAddComment?: (content: string) => void;
  onDeleteComment?: (id: number) => void;
  onToggleLike?: (id: number) => void;
}

export const CommentSection = ({
  isOpen,
  onClose,
  postId,
  initialComments,
  onAddComment,
  onDeleteComment,
  onToggleLike,
}: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [inputText, setInputText] = useState("");

  // 💡 어떤 댓글에 답글을 달고 있는지 관리하는 상태 (댓글 ID 저장)
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<number | null>(null);
  const [replyInputText, setReplyInputText] = useState("");

  const commentHandler = async(replyInputText : any, postId : number) => {
    const response = await commentHandlerApi(replyInputText, postId)
    console.log(response.data)
  }


  useEffect(() => {
    if (initialComments && initialComments.length > 0) {
      setComments(initialComments);
    } else {
      // 💡 더미 데이터 (대댓글 포함 예시)
      setComments([
        {
          id: 1,
          userName: "닝닝이",
          content: "이번 화 너무 재밌어요!! 다음 화 언제 나오나요 ㅠㅠ",
          createdAt: "10분 전",
          likeCount: 5,
          isLiked: false,
          isMyComment: true,
          replies: [
            {
              id: 101,
              userName: "작가",
              content: "재밌게 봐주셔서 감사합니다! 다음 주에 돌아올게요!",
              createdAt: "5분 전",
              likeCount: 2,
              isLiked: false,
              isMyComment: false,
            },
          ],
        },
        {
          id: 2,
          userName: "웹툰매니아",
          content: "작화 퀄리티 미쳤다... 레전드 갱신!",
          createdAt: "1시간 전",
          likeCount: 12,
          isLiked: true,
          isMyComment: false,
        },
      ]);
    }
  }, [initialComments, postId]);

  if (!isOpen) return null;

  // 메인 댓글 등록
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newComment: CommentItem = {
      id: Date.now(),
      userName: "나",
      content: inputText,
      createdAt: "방금 전",
      likeCount: 0,
      isLiked: false,
      isMyComment: true,
      replies: [],
    };

    setComments((prev) => [newComment, ...prev]);
    if (onAddComment) onAddComment(inputText);
    setInputText("");
  };

  // 💡 대댓글 등록 처리
  const handleReplySubmit = (commentId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInputText.trim()) return;

    const newReply: CommentItem = {
      id: Date.now(),
      userName: "나",
      content: replyInputText,
      createdAt: "방금 전",
      likeCount: 0,
      isLiked: false,
      isMyComment: true,
    };

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      })
    );

    setReplyInputText("");
    setActiveReplyCommentId(null); // 입력창 닫기
  };



  const handleLikeToggle = (id: number) => {
    setComments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedIsLiked = !item.isLiked;
          return {
            ...item,
            isLiked: updatedIsLiked,
            likeCount: updatedIsLiked ? item.likeCount + 1 : item.likeCount - 1,
          };
        }
        return item;
      })
    );
    if (onToggleLike) onToggleLike(id);
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
    if (onDeleteComment) onDeleteComment(id);
  };

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 상단 드래그바 / 헤더 */}
        <div className="comment-header">
          <div className="drag-handle" />
          <div className="comment-header-row">
            <h3 className="commentz-title">
              댓글 <span className="comment-count">{comments.length}</span>
            </h3>
            <button type="button" className="btn-close-comment" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* 댓글 스크롤 리스트 */}
        <div className="comment-list">
          {comments.length === 0 ? (
            <div className="comment-empty">댓글이 없습니다.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item-group">
                {/* 메인 댓글 */}
                <div className="comment-item">
                  <div className="comment-avatar">
                    {comment.userAvatar ? (
                      <img src={comment.userAvatar} alt={comment.userName} />
                    ) : (
                      <div className="avatar-placeholder">{comment.userName.slice(0, 1)}</div>
                    )}
                  </div>

                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-author">{comment.userName}</span>
                      <span className="comment-date">{comment.createdAt}</span>
                      {comment.isMyComment && (
                        <button
                          type="button"
                          className="btn-delete-comment"
                          onClick={() => handleDelete(comment.id)}
                        >
                          삭제
                        </button>
                      )}
                    </div>

                    <p className="comment-text">{comment.content}</p>

                    <div className="comment-actions">
                      <button
                        type="button"
                        className={`btn-like ${comment.isLiked ? "active" : ""}`}
                        onClick={() => handleLikeToggle(comment.id)}
                      >
                        ♥ {comment.likeCount}
                      </button>
                      {/* 답글 달기 토글 버튼 */}
                      <button
                        type="button"
                        className="btn-reply-toggle"
                        onClick={() =>
                          setActiveReplyCommentId(
                            activeReplyCommentId === comment.id ? null : comment.id
                          )
                        }
                      >
                        답글쓰기
                      </button>
                    </div>
                  </div>
                </div>

                {/* 💡 대댓글 목록 영역 */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="reply-list">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply-item">
                        <div className="reply-arrow">ㄴ</div>
                        <div className="comment-avatar" style={{ width: 28, height: 28 }}>
                          <div className="avatar-placeholder" style={{ fontSize: 11 }}>
                            {reply.userName.slice(0, 1)}
                          </div>
                        </div>
                        <div className="comment-body">
                          <div className="comment-meta">
                            <span className="comment-author">{reply.userName}</span>
                            <span className="comment-date">{reply.createdAt}</span>
                          </div>
                          <p className="comment-text">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 💡 특정 댓글에만 열리는 대댓글 입력창 */}
                {activeReplyCommentId === comment.id && (
                  <form
                    className="reply-input-wrapper"
                    onSubmit={(e) => handleReplySubmit(comment.id, e)}
                  >
                    <span className="reply-input-arrow">ㄴ</span>
                    <input
                      type="text"
                      className="comment-input"
                      placeholder="답글을 남겨주세요..."
                      value={replyInputText}
                      onChange={(e) => setReplyInputText(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-submit-comment"
                      disabled={!replyInputText.trim()}
                      onClick={() => commentHandler(replyInputText, postId)}
                    >
                      등록
                    </button>
                  </form>
                )}
              </div>
            ))
          )}
        </div>

        {/* 하단 메인 댓글 입력창 */}
        <form className="comment-input-wrapper" onSubmit={handleSubmit}>
          <div className="profile-image-container">
            <img src={antonImg} alt="" className="commet-Profile-img" />
          </div>
          <input
            type="text"
            className="comment-input"
            placeholder="댓글을 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="btn-submit-comment"
            disabled={!inputText.trim()}
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
