import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./css/index.scss";

import Main from "./components/pages/main";
import Layout from "./components/layout/Layout";
import CookGuide from "./components/pages/CookGuide";
import CookLab from "./components/pages/CookLab";
import CookSol from "./components/pages/CookSol";
import CookCook from "./components/pages/CookCook";
import CookQnA from "./components/pages/CookQnA";
import CookEvent from "./components/pages/CookEvent";
import SearchPage from "./components/pages/SearchPage";
import Member from "./components/pages/Member";




export default function MainComponent(props) {
  return(
    // 라우터 루트로 라우터 구성시작
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollTop />
      <Routes>
        {/* 중요!!! 레이아웃 컴포넌트를 루트로 설정!
        루트 Route 는 홀로닫지말고 반드시 다른
        하위 라우트를 감싸도록한다!!! */}
        <Route path="/" element={<Layout />}>
          {/* 하위 라우트 셋팅 
        -> path설정대신 index키워드를 쓰면 첫페이지로 구성됨 -> MainArea 컴포넌트 <Outlet/>에 출력된다!*/}
        
          <Route index element={<Main />} />
          <Route path="cookguide" element={<CookGuide />} />
          <Route path="cooklab" element={<CookLab />} />
          <Route path="cooksol" element={<CookSol />} />
          <Route path="cookcook" element={<CookCook />} />
          <Route path="cookqna" element={<CookQnA />} />
          <Route path="cookevent" element={<CookEvent />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="member" element={<Member />}/>
          

        </Route>
        {/* Layout 루트 Route로 하위 Route를 감싼다! */}
      </Routes>
    </BrowserRouter>
  );
}

// 컴포넌트로 만들고 라우터 안에 넣고 라우터 경로 변경시 스크롤 최상단 이동
const ScrollTop = () => {
   const {pathname} = useLocation();

   useEffect(()=>{
    window.scrollTo(0,0);

   },[pathname]);

   return null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainComponent/>);
