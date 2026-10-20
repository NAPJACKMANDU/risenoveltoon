import React, { useState, useEffect } from "react";
import type { CommentItem } from "../interface/types/novelToon";
import "../css/commentCss.css";
import antonImg from '../assets/img/anton.jpg'; 
import { commentHandlerApi, deleteCommentApi } from "../api/toonNovelApi";
import { fetchComments } from "../hooks/functionComHook";

interface CommentSectionProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: number;
  initialComments?: CommentItem[];
  onAddComment?: (content: string) => void;
  onDeleteComment?: (commentId: number) => void;
  onToggleLike?: (commentId: number) => void;
}

export const CommentSection = ({
  isOpen,
  onClose,
  contentId,
  onAddComment,
  onDeleteComment,
  onToggleLike,
}: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setcommentText] = useState("");

  // 💡 어떤 댓글에 답글을 달고 있는지 관리하는 상태 (댓글 ID 저장)
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<number | null>(null);
  const [replycommentText, setReplycommentText] = useState("");

  useEffect(() => {
      if (contentId == null) return;
    
      const loadComments = async () => {
        try {
          const newComments = await fetchComments(contentId); 
          setComments(newComments);
        } catch (error) {
          console.error("댓글 불러오기 실패:", error);
        }
      };
      loadComments();
    }, [contentId]);

        //  ,[]) < 여기 안의 값 : 이 값이 바뀌면 다시 렌더링 되어라
        if (!isOpen) return null;

  // 댓글
  const handleSubmit = async (e: React.FormEvent, commentText : any, contentId : number, parentId? : number) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await commentHandlerApi({commentText : commentText, contentId : contentId, parentId : parentId})
    const newComment = await fetchComments(contentId);
    setComments(newComment);
   
    setcommentText("");
    setReplycommentText("");
    setActiveReplyCommentId(null); // 입력창 닫기
};

  const handleLikeToggle = (commentId: number) => {
    setComments((prev) =>
      prev.map((item) => {
        if (item.commentId === commentId) {
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
    if (onToggleLike) onToggleLike(commentId);
  };

  const handleDelete = async(commentId: number) => {
    await deleteCommentApi(commentId);
    const newComment = await fetchComments(contentId);
    setComments(newComment);
    if (onDeleteComment) onDeleteComment(commentId);
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
              <div key={comment.commentId} className="comment-item-group">
                {/* 메인 댓글 */}
                <div className="comment-item">
                  <div className="comment-avatar">
                    {comment.profileImg ? (
                      <img src={comment.profileImg} alt={comment.userName} />
                    ) : (
                      <div className="avatar-placeholder">{comment.userName}</div>
                    )}
                  </div>

                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-author">{comment.userName}</span>
                      <span className="comment-date">{comment.createdAt}</span>
                      {comment.userId === localStorage.getItem("savedUserId")&& (
                        <button
                          type="button"
                          className="btn-delete-comment"
                          onClick={() => handleDelete(comment.commentId)}
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
                        onClick={() => handleLikeToggle(comment.commentId)}
                      >
                        ♥ {comment.likeCount}
                      </button>
                      {/* 답글 달기 토글 버튼 */}
                      <button
                        type="button"
                        className="btn-reply-toggle"
                        onClick={() =>
                          setActiveReplyCommentId(
                            activeReplyCommentId === comment.commentId ? null : comment.commentId
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
                      <div key={reply.commentId} className="reply-item">
                        <div className="reply-arrow">ㄴ</div>
                        <div className="comment-avatar" style={{ width: 28, height: 28 }}>
                          <div className="avatar-placeholder" style={{ fontSize: 11 }}>
                            {reply.userName}
                          </div>
                        </div>
                        <div className="comment-body">
                          <div className="comment-meta">
                            <span className="comment-author">{reply.userName}</span>
                            <span className="comment-date">{reply.createdAt}</span>
                         {reply.userId === localStorage.getItem("savedUserId")&& (
                             <button
                               type="button"
                               className="btn-delete-comment"
                               onClick={() => handleDelete(reply.commentId)}
                             >
                               삭제
                             </button>
                         )}
                          </div>
                          <p className="comment-text">{reply.content}</p>
                    <div className="comment-actions">
                      <button
                        type="button"
                        className={`btn-like ${reply.isLiked ? "active" : ""}`}
                        onClick={() => handleLikeToggle(reply.commentId)}
                      >
                        ♥ {reply.likeCount}
                      </button>
                    </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 💡 특정 댓글에만 열리는 대댓글 입력창 */}
                {activeReplyCommentId === comment.commentId && (
                  <form
                    className="reply-input-wrapper"
                    onSubmit={(e) => handleSubmit(e, replycommentText, contentId, comment.commentId)}
                  >
                    <span className="reply-input-arrow">ㄴ</span>
                    <input
                      type="text"
                      className="comment-input"
                      placeholder="답글을 남겨주세요..."
                      value={replycommentText}
                      onChange={(e) => setReplycommentText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn-submit-comment"
                      disabled={!replycommentText.trim()}
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
        <form className="comment-input-wrapper" onSubmit={(e) => handleSubmit(e, commentText, contentId)}>
          <div className="profile-image-container">
            <img src={antonImg} alt="" className="commet-Profile-img" />
          </div>
          <input
            type="text"
            className="comment-input"
            placeholder="댓글을 입력하세요..."
            value={commentText}
            onChange={(e) => setcommentText(e.target.value)}
          />
          <button
            type="submit"
            className="btn-submit-comment"
            disabled={!commentText.trim()}
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
