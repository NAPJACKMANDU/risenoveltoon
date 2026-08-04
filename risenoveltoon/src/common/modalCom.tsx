import type { PurchaseModalProps } from "../interface/types/componet";
import "../css/componentsCss.css"

export const PurchaseModal = ({modalProps} : PurchaseModalProps) => {
    if (!modalProps.isOpen) return null; 
 return (
  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  <>  
  
    <div className="modal-overlay">
      {/* modal-content 내부 클릭 시 닫히지 않도록 이벤트 전파 막기 */}
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

export default PurchaseModal;