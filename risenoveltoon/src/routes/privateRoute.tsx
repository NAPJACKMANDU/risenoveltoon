import { useNavigate } from "react-router-dom";
import type { PrivateRouteProps } from "../interface/types/componet";
import { useEffect, useState } from "react";
import { PurchaseModal } from "../common/modalCom";

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(true);

    const handleConfirmAndNavigate = () => {
            setIsJoinModalOpen(false); // 모달 닫고
            navigate("/");
    };

  useEffect(() => {
    if (!token) {
      setIsRedirecting(true); // 메시지를 보여주기 위해 상태 변경

      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000); // 3000ms = 3초

      return () => clearTimeout(timer); // 컴포넌트가 사라질 때 타이머 청소
    }
  }, [token, navigate]);

  // 토큰이 없을 때 보여줄 3초 알림 화면
  if (!token && isRedirecting) {
    return (
    <div>
      <PurchaseModal
         modalProps = {{
                isOpen: isJoinModalOpen,
                description: "로그인이 필요한 페이지입니다.",
                cancelText : "확인",
                onCancel : handleConfirmAndNavigate
            }}/>
    </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
