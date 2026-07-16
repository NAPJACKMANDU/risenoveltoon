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
    TOONVIEWER_PATH
} from "./index.ts";
import MainHome from "../pages/webToonMain"
import MyPage from "../pages/webToonMyScreen";
import BuyToonlist from "../pages/buyToonList";
import EditInfo from "../pages/webToonEditInfo";
import Login from "../pages/loginScreen";
import SignUp from "../pages/signUpScreen";
import Detail from "../pages/detailScreen";
import PointShop from "../pages/pointShop";
import SearchPage from "../pages/searchScreen";
import ToonViewer from "../pages/toonViewer";

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
        </Routes>
    )
}

 export default RouterSetting;