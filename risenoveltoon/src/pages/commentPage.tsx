import React, { useState, useEffect } from "react";
import type { CommentItem } from "../interface/types/novelToon";
import "../css/commentCss.css";

interface CommentSectionProps {
  initialComments?: CommentItem[];
  onAddComment?: (content: string) => void;
  onDeleteComment?: (id: number) => void;
  onToggleLike?: (id: number) => void;
}

export const CommentSection = ({
  initialComments,
  onAddComment,
  onDeleteComment,
  onToggleLike,
}: CommentSectionProps) => {
  // 1. 내부에서 직접 관리할 댓글 리스트 상태
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [inputText, setInputText] = useState("");

  // 2. 삭제 모달 관련 상태 관리
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  // 3. 컴포넌트 마운트 시 데이터 조회 (더미 데이터 또는 외부 props 연결)
  useEffect(() => {
    if (initialComments && initialComments.length > 0) {
      setComments(initialComments);
    } else {
      // 💡 Props가 없으면 자체 기본 데이터를 세팅 (실제 API 호출 코드로 대체 가능)
      setComments([
        {
          id: 1,
          userName: "닝닝이",
          content: "이번 화 너무 재밌어요!! 다음 화 언제 나오나요 ㅠㅠ",
          createdAt: "10분 전",
          likeCount: 5,
          isLiked: false,
          isMyComment: true,
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
  }, [initialComments]);

  // 댓글 등록 처리
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
    };

    // 내부 상태 업데이트
    setComments((prev) => [newComment, ...prev]);

    // 부모에 전달된 콜백이 있으면 함께 실행
    if (onAddComment) {
      onAddComment(inputText);
    }

    setInputText("");
  };

  // 좋아요 토글 처리
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

    if (onToggleLike) {
      onToggleLike(id);
    }
  };

  // 삭제 버튼 클릭 시 모달 열기
  const openDeleteModal = (id: number) => {
    setSelectedCommentId(id);
    setIsDeleteModalOpen(true);
  };

  // 실제 삭제 진행
  const handleConfirmDelete = () => {
    if (selectedCommentId !== null) {
      setComments((prev) => prev.filter((item) => item.id !== selectedCommentId));
      if (onDeleteComment) {
        onDeleteComment(selectedCommentId);
      }
    }
    setIsDeleteModalOpen(false);
    setSelectedCommentId(null);
  };

  return (
    <div className="comment-container">
      {/* 댓글 헤더 */}
      <div className="comment-header">
        <h3 className="comment-title">
          댓글 <span className="comment-count">{comments.length}</span>
        </h3>
      </div>

      {/* 댓글 목록 */}
      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="comment-empty">첫 번째 댓글을 남겨보세요!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">
                {comment.userAvatar ? (
                  <img src={comment.userAvatar} alt={comment.userName} />
                ) : (
                  <div className="avatar-placeholder">
                    {comment.userName.slice(0, 1)}
                  </div>
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
                      onClick={() => openDeleteModal(comment.id)}
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 하단 고정 댓글 입력창 */}
      <form className="comment-input-wrapper" onSubmit={handleSubmit}>
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

      {/* 💡 공통 모달을 이용한 댓글 삭제 확인 팝업 */}
      {/* <PurchaseModal
        modalProps={{
          isOpen: isDeleteModalOpen,
          title: "댓글 삭제",
          description: "작성하신 댓글을 삭제하시겠습니까?",
          cancelText: "취소",
          confirmText: "삭제",
          onCancel: () => setIsDeleteModalOpen(false),
          onConfirm: handleConfirmDelete,
        }}
      /> */}
    </div>
  );
};

export default CommentSection;