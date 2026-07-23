import React from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronRight, 
  Heart, 
  MessageSquare, 
  List 
} from 'lucide-react';
import '../../css/webToonDetailCss.css';
import '../../css/componentsCss.css'
import { BackButton } from '../../hooks/functionComHook';

interface ToonViewerProps {
  title?: string;
  likeCount?: number;
  commentCount?: number;
  onBack?: () => void;
  onListClick?: () => void;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

export const WebToonDetail: React.FC<ToonViewerProps> = ({
  title = "말강즈",
  likeCount = 1234,
  commentCount = 1234,
  onBack,
  onListClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="mobile-container">
      {/* 1. 상단 헤더 영역 - 클릭시 헤더와 하단 바 안 보이게 설정*/}
      <header className="header-fixed">
            <BackButton backtype={title}/>
      </header>

      {/* 2. 메인 웹툰 콘텐츠 영역 */}
      <main className="scroll-content">
        <div className="toon-page-box">
          웹툰 페이지 ...
        </div>

        {/* 하단 우측 접기/펼치기 화살표 */}
        {/* <button type="button" className="floating-down-btn" aria-label="메뉴 열기">
          <ChevronDown size={20} />
        </button> */}
      </main>

      {/* 3. 하단 뷰어 조작 바 */}
      <footer className="viewer-footer">
        <div className="bottom-bar">
          {/* 왼쪽: 좋아요 & 댓글 수 */}
          <div className="interaction-group">
            <div className="interaction-item">
              <Heart size={18} className="icon-interaction" />
              <span>{likeCount.toLocaleString()}</span>
            </div>
            <div className="interaction-item">
              <MessageSquare size={18} className="icon-interaction" />
              <span>{commentCount.toLocaleString()}</span>
            </div>
          </div>

          {/* 오른쪽: 이전 / 목록 / 다음 버튼 */}
          <div className="nav-group">
            <button type="button" className="icon-btn" onClick={onPrevClick} aria-label="이전 화">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="icon-btn" onClick={onListClick} aria-label="목록 보기">
              <List size={20} />
            </button>
            <button type="button" className="icon-btn" onClick={onNextClick} aria-label="다음 화">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebToonDetail;