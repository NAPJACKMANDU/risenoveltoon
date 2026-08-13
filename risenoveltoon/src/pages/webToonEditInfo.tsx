import {useState} from 'react';
import '../css/webToonEditInfoCss.css';
import "../css/componentsCss.css"
import {ToonMainBottom} from "../common/webToonMainCom";
import {BackButton} from "../hooks/functionComHook";
import {useNavigate} from "react-router-dom";
import type { MyPageData } from '../interface/types/auth';
import { informationChangeApi } from '../api/JoinLogin/joinLoginApi';

function EditInfo() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [cpName, setCpName] = useState('');

    const storedUser = localStorage.getItem("userInfo")
    const userInfo = storedUser ? JSON.parse(storedUser) : null;

    
    const informationChange = async (e: { preventDefault: () => void; }) => {
        e.preventDefault;
        
        try {
            const response = await informationChangeApi({ nickname, cpName });
             if(response) {
                    console.log(response)
                }
            }
            catch(error : any) {
        }
    };


    // 닉네임 입력 변경 핸들러 (최대 8글자 제한)
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 8) {
            setNickname(e.target.value);
        }
    };

    // CP명 입력 변경 핸들러 (최대 2글자 제한)
    const handleCpNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 2) {
            setCpName(e.target.value);
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
                        <label className="input-label">닉네임 (최대 8글자)</label>
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
                    </div>
                </form>

                {/* 하단 취소 / 계속 버튼 */}
            </main>
            <div className="info-bottom-btn-row">
                <button onClick={() => navigate(-1)} className="btn-cancel">취소</button>
                <button onClick={informationChange}type ="button" className="btn-continue">변경</button>
            </div>
            {/* 3. 하단 탭 바 (마이페이지 👤 활성화) */}
            <ToonMainBottom/>
        </div>
    );
}

export default EditInfo;