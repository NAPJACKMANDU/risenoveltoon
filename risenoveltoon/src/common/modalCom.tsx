import type { PurchaseModalProps } from "../interface/types/componet";
import "../css/componentsCss.css"
import type { CheckParam } from "../interface/types/auth";
import { duplicateCheckApi } from "../api/JoinLogin/joinApi";
import { useState } from "react";


export const PurchaseModal = ({modalProps} : PurchaseModalProps) => {
    if (!modalProps.isOpen) return null; 
 return (
  <>
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">{modalProps.title}</h3>
        <p className="modal-description">{modalProps.description}</p>
        <div className="modal-button-group">
          <button type="button" className="btn-cancel" onClick={modalProps.onCancel}>
            {modalProps.cancelText}
          </button>
                {modalProps.onConfirm && (
                  <button type="button" className="btn-confirm" onClick={modalProps.onConfirm}>
                    {modalProps.confirmText}
                  </button>
                )}
        </div>
      </div>
    </div>
    </>
    );
};

// export default function duplicateCheck() {
//   const [modalMessage, setModalMessage] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const shandleDuplicateCheck = async ({checkData, title} : CheckParam) => {
//     try {
//       const response =  await duplicateCheckApi({checkData, title});
      
//       // 성공 시 처리
//       if (response.data === 'SUCCESS') {
//         setModalMessage('사용 가능한 ' + (title === 'id' ? '아이디' : '닉네임') + '입니다.');
//         setIsModalOpen(true);
//       }
//     } catch (error) {
//       // 백엔드가 던진 ErrorCode의 message 수신
//       const errorMessage = error.response?.data?.message || '중복 확인 중 오류가 발생했습니다.';
      
//       setModalMessage(errorMessage); // 모달 메시지 세팅
//       setIsModalOpen(true);          // 모달 오픈
//     }
//   };

//   return (
//     <div>
//       {/* 중복 확인 버튼 */}
//       <button onClick={() => handleDuplicateCheck('id', 'testUser')}>아이디 중복확인</button>

//       {/* 모달 커스텀 컴포넌트 또는 UI */}
//       {isModalOpen && (
//         <div className="modal">
//           <p>{modalMessage}</p>
//           <button onClick={() => setIsModalOpen(false)}>확인</button>
//         </div>
//       )}
//     </div>
//   );
// }