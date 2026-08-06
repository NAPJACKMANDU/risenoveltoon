// 모달
export interface modalParam {
    isOpen: boolean;
    title?: string;
    description?: string;
    cancelText?: string;   // 예: "취소", "닫기", "아니오"
    confirmText?: string;  // 예: "결제", "확인", "삭제", "로그아웃"
    onCancel?: () => void;
    onConfirm?: () => void;
}

export interface PurchaseModalProps {
    modalProps : modalParam;
}