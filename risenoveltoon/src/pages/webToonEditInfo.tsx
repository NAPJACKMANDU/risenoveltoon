import {useState} from 'react';
import '../css/webToonEditInfoCss.css';
import "../css/componentsCss.css"
import {ToonMainBottom} from "../common/webToonMainCom";
import {BackButton} from "../hooks/functionComHook";
import {useNavigate} from "react-router-dom";
import { informationChangeApi } from '../api/joinLoginApi';
import { DuplicateCheck, PurchaseModal } from '../common/modalCom';
import type { FormErrors } from '../interface/types/auth';
import { cpNameValue } from '../utils/validation';

function EditInfo() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [cpName, setCpName] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [nextPageOpen, setNextPageOpen] = useState(false);

    const storedUser = localStorage.getItem("userInfo")
    const userInfo = storedUser ? JSON.parse(storedUser) : null;
    const hasError = Boolean(errors.nickname) || Boolean(errors.cpName);
    
    const handleConfirmAndNavigate = () => {
            setIsModalOpen(false); // 모달 닫고
            nextPageOpen ? navigate("/webToonMyPage") : '';
    };

    const informationChange = async (e: { preventDefault: () => void; }) => {
        e.preventDefault;
        
        if (Boolean(errors.nickname) || Boolean(errors.cpName)) {
        return; // 에러 있으면 API 호출 자체를 막음
        }

        try {
            const response = await informationChangeApi({ nickname, cpName });
             if(response) {
                    if(storedUser) {
                        const parsed = JSON.parse(storedUser);
                        const updated = {
                            ...parsed,
                            nickname: nickname === '' ? userInfo.nickname : nickname ,
                            cpName: cpName === '' ? userInfo.cpName : cpName ,
                        };
                        localStorage.setItem("userInfo", JSON.stringify(updated));
                    }
                    setModalMessage(response.data?.message);
                    setIsModalOpen(true);
                    setNextPageOpen(true);
                }
            }
            catch(error : any) {
                setModalMessage(error.response?.data?.detail);
                setIsModalOpen(true);
                setNextPageOpen(false);
        }
    };

    // 닉네임 입력 변경 핸들러 (최대 8글자 제한)
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const value = e.target.value;
            if (value.length <= 8) {
            setNickname(e.target.value);

        }
    };

    // CP명 입력 변경 핸들러 (최대 2글자 제한)
    const handleCpNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
           if (value.length <= 2) {
               setCpName(value);

               if (value === '') {
                   // 빈 값이면 에러 안 띄움 (선택사항 — 원하면 여기도 에러 처리 가능)
                   setErrors((prev) => ({ ...prev, cpName: undefined }));
               } else if (!cpNameValue.includes(value)) {
                   setErrors((prev) => ({ ...prev, cpName: '존재하지 않는 CP명입니다. 다시 입력해주세요.' }));
               } else {
                   setErrors((prev) => ({ ...prev, cpName: undefined }));
               }
           }
        };

    return (
        <div className="mobile-container">
            {/* 1. 상단 고정 헤더 */}
            <header className="header-fixed">
                    <BackButton backtype ="정보 수정"/> {/*뒤로가기*/}
            </header>

            {/* 2. 본문 영역 */}
            <main className="scroll-content">
                {/* 프로필 이미지 업로드 영역 */}
                <div className="profile-upload-container">
                    <div className="profile-image-wrapper">
                        {/* 임시 다마고치 이미지 (실제 이미지 경로로 대체 가능) */}
                        <img
                            src="https://via.placeholder.com/110"
                            alt="프로필 캐릭터"
                            className="profile-img"
                        />
                        <div className="camera-icon-badge">
                            📷
                        </div>
                    </div>
                </div>

                {/* 입력 폼 영역 */}
                <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label className="input-label" style={{ marginRight: '3px' }}>닉네임 (최대 8글자)</label>
                        <DuplicateCheck checkData ={nickname} title = "nickname"
                            isDisabled = {!nickname || Boolean(errors.nickname)}
                            errorDisabled = {Boolean(errors.nickname)}/>
                        <input
                            type="text"
                            placeholder={userInfo.nickname}
                            className="form-input"
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">#CP명 (최대 2글자)</label>
                        <input
                            type="text"
                            placeholder={userInfo.cpName}
                            className="form-input"
                            value={cpName}
                            onChange={handleCpNameChange}
                        />
                        {errors.cpName && <p className="error-text">{errors.cpName}</p>}
                    </div>
                </form>

                {/* 하단 취소 / 계속 버튼 */}
            </main>
            <div className="info-bottom-btn-row">
                <button onClick={() => navigate(-1)} className="btn-cancel">취소</button>
                <button 
                    onClick={informationChange} 
                    type="button" 
                    className="btn-continue"
                    disabled={hasError}
                >
                    변경
                </button>
            </div>
            {/* 3. 하단 탭 바 (마이페이지 👤 활성화) */}
            <ToonMainBottom/>
                <PurchaseModal 
                    modalProps={{
                        isOpen: isModalOpen,
                        description: modalMessage,
                        cancelText: "닫기",
                        onCancel: handleConfirmAndNavigate
                    }}/>
        </div>
    );
}

export default EditInfo;