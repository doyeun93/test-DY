import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { dCon } from "./components/modules/dCon";

import "./css/index.scss";

import Main from "./components/pages/main";
import Layout from "./components/layout/Layout";
import Intro from "./components/pages/Intro";
import CookGuide from "./components/pages/CookGuide";
import CookLab from "./components/pages/CookLab";
import CookSol from "./components/pages/CookSol";
import CookCook from "./components/pages/CookCook";
import CookQnA from "./components/pages/CookQnA";
import CookEvent from "./components/pages/CookEvent";
import SearchPage from "./components/pages/SearchPage";
import Member from "./components/pages/Member";
import Login from "./components/pages/Login";
import LabDetail from "./components/pages/LabDetail";
import Scrap from "./components/modules/Scrap";




export default function MainComponent(props) {

  let cartTemp = false;

  // 로컬스 카트 데이터 상태변수 
  const [localsScrap, setLocalsScrap] = useState(localStorage.getItem("scrap-data"));

  // 로컬스 카트 데이터 존재 여부에 따라 상태값 변경
  if(localsScrap){
    // 데이터가 있으면 cartTemp값 true로 변경
    // 데이터 개수가 0이 아니여야 함
    let cartCnt = JSON.parse(localsScrap).length;
    

    if(cartCnt > 0) cartTemp = true; 
    
  } // 카트 존재여부 if ////////////////

  const [scrapSts, setScrapSts] = useState(cartTemp);


  return(
    // 라우터 루트로 라우터 구성시작
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollTop />
      <dCon.Provider value={{ setLocalsScrap, setScrapSts, localsScrap, }}>

      <Routes>
        {/* 중요!!! 레이아웃 컴포넌트를 루트로 설정!
        루트 Route 는 홀로닫지말고 반드시 다른
        하위 라우트를 감싸도록한다!!! */}
        <Route path="/" element={<Layout />}>
          {/* 하위 라우트 셋팅 
        -> path설정대신 index키워드를 쓰면 첫페이지로 구성됨 -> MainArea 컴포넌트 <Outlet/>에 출력된다!*/}
        
          <Route index element={<Main />} />
          <Route path="intro" element={<Intro />} />
          <Route path="cookguide" element={<CookGuide />} />
          <Route path="cooklab" element={<CookLab />} />
          <Route path="cooksol" element={<CookSol />} />
          <Route path="cookcook" element={<CookCook />} />
          <Route path="cookqna" element={<CookQnA />} />
          <Route path="cookevent" element={<CookEvent />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="member" element={<Member />}/>
          <Route path="login" element={<Login />}/>
          <Route path="detail" element={<LabDetail />}/>
          

        </Route>
        {/* Layout 루트 Route로 하위 Route를 감싼다! */}
      </Routes>

      {scrapSts && <Scrap /> }
      </dCon.Provider>
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
