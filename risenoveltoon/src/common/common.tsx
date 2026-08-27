import { useState, type ChangeEvent } from "react";
import type { novelToonListData, NovelToonListProps } from "../interface/types/novelToon";

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

export interface SearchableItem {
  title?: string;
  author?: string;
  cpName?: string;
  [key: string]: any; // 다른 추가 필드가 있어도 허용
}

export const useSearchHandle = <T extends SearchableItem>(listData: T[] | null | undefined = []) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // listData가 undefined/null일 때를 대비해 빈 배열 default 처리
  const safeList = listData ?? [];

  const filteredData = safeList.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(term) ||
      item.cpName?.toLowerCase().includes(term) ||
      item.author?.toLowerCase().includes(term)
    );
  });

  return {
    searchTerm,
    filteredData,
    handleSearchChange,
    setSearchTerm
  };
};