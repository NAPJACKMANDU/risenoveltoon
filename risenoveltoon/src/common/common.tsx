import { useState } from "react";

export const useWindowScrollTop = () => {
  const [categoryId, setCategoryId] = useState('all');

  const handleScrollTopAndTab = (id: string) => {
    setCategoryId(id);

    // 1. window 스크롤 초기화
    window.scrollTo({ top: 0 });

    // 2. 문서 내 모든 overflow 스크롤 요소들의 스크롤 초기화
    document.querySelectorAll('div').forEach((el) => {
      if (el.scrollTop > 0) {
        el.scrollTop = 0;
      }
    });
  };

  // 컴포넌트에서 쓸 수 있도록 상태와 이동 함수를 반환합니다.
  return { categoryId, handleScrollTopAndTab };
};