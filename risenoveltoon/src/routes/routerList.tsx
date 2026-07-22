import { Route, Routes } from "react-router-dom"
import {
    MAIN_PATH,
    WEBTOONMYPAGE_PATH,
    BUYTOONLIST_PATH,
    WEBTOONEDITINFO_PATH,
    LOGINSCREEN_PATH,
    SIGNUPSCREEN_PATH,
    DETAILSCREEN_PATH,
    PIONTSHOPSCREEN_PATH,
    SEARCHSCREEN_PATH,
    TOONVIEWER_PATH,
    WEBTOONLIST_PATH,
    NOVELMEMBERLIST_PATH
} from "./index.ts";
import MainHome from "../pages/main/webToonMain.tsx"
import MyPage from "../pages/webToonMyScreen";
import BuyToonlist from "../pages/buyToonList";
import EditInfo from "../pages/webToonEditInfo";
import Login from "../pages/loginScreen";
import SignUp from "../pages/signUpScreen";
import Detail from "../pages/detailScreen";
import PointShop from "../pages/pointShop";
import SearchPage from "../pages/searchScreen";
import ToonViewer from "../pages/toonViewer";
import WebToonMemberList from "../pages/webToonMemberList.tsx";
import NovelMemberList from "../pages/novelMemberList.tsx";

export const RouterSetting = () => {
    return (
        <Routes>
            <Route path={MAIN_PATH()} element={<MainHome />}></Route>
            {/*<Route path="/" element={</>}></Route>*/}
            <Route path={BUYTOONLIST_PATH()} element={<BuyToonlist/>}></Route>
            <Route path={WEBTOONMYPAGE_PATH()} element={<MyPage />}></Route>
            <Route path={WEBTOONEDITINFO_PATH()} element={<EditInfo/>}></Route>
            <Route path={LOGINSCREEN_PATH()} element={<Login/>}></Route>
            <Route path={SIGNUPSCREEN_PATH()} element={<SignUp/>}></Route>
            <Route path={DETAILSCREEN_PATH()} element={<Detail/>}></Route>
            <Route path={PIONTSHOPSCREEN_PATH()} element={<PointShop/>}></Route>
            <Route path={SEARCHSCREEN_PATH()} element={<SearchPage/>}></Route>
            <Route path={TOONVIEWER_PATH()} element={<ToonViewer/>}></Route>
            <Route path={WEBTOONLIST_PATH()} element={<WebToonMemberList/>}></Route>
            <Route path={NOVELMEMBERLIST_PATH()} element={<NovelMemberList/>}></Route>
        </Routes>
    )
}

 export default RouterSetting;