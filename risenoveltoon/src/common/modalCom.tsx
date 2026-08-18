import type { PurchaseModalProps } from "../interface/types/componet";
import "../css/componentsCss.css"
import type { CheckParam } from "../interface/types/auth";
import { duplicateCheckApi } from "../api/joinLoginApi";
import { useEffect, useState } from "react";


// 모달창
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

// 아이디, 닉네임 중복 확인
export const DuplicateCheck = ({checkData, title, isDisabled, errorDisabled} : CheckParam) => {
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successApi, setSuccessApi] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
    setModalMessage('');
    setSuccessApi(false);
  }, [checkData]);

  const shandleDuplicateCheck = async ({checkData, title} : CheckParam) => {
    try {
      const response =  await duplicateCheckApi({checkData, title});
      
      if (response) {
        setModalMessage(response.data?.message);
        setIsModalOpen(true);
        setSuccessApi(true);
      }
    } catch (error : any) {
          setModalMessage(error.response?.data?.detail);
          setIsModalOpen(true);
          setSuccessApi(false);
    }
  };

  return (
    <>
      {/* 중복 확인 버튼 */}
    <button type="button" onClick={() => shandleDuplicateCheck({checkData, title})} 
            className={`duplicate_check ${isDisabled ? 'disabled' : ''}`}
            disabled={isDisabled}>중복확인</button>
      {isModalOpen && !errorDisabled && (
        <div className= {successApi ? "success-text" : "error-text"}>
          <p>{modalMessage}</p>
        </div>
      )}
    </>
  );
}