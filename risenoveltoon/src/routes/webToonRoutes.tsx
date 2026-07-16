import { useNavigate } from "react-router-dom";
import "../css/webToonMainCss.css"

// 하단 메뉴바 공통 버튼
export const SomeComponent = () => {
    const navigate = useNavigate();
    return (
        <div className="bottom-nav-bar">
            <button onClick={() => navigate("/")} className="nav-item">🏠</button>
            <button onClick={() => navigate("/webToonMyPage")} className="nav-item">🎮</button>
            <button onClick={() => navigate("/buyToonList")} className="nav-item">📖️</button>
            <button onClick={() => navigate("/webToonMyPage")} className="nav-item">👤</button>
        </div>
    );
};
