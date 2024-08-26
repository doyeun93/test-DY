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

 


  return(
    
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout />}>
        
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
          <Route path="scrap" element={<Scrap />}/>
          

        </Route>
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
