// 전체 레이아웃 컴포넌트 ///
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {TopArea} from "./TopArea";
import MainArea from "./MainArea";
import FooterArea from "./FooterArea";

import { dCon } from "../modules/dCon";

function Layout() {
  
    // 상태관리 변수 ///
    // 1. 로그인 상태관리 변수 -> 초기값으로 세션스토리지 "minfo"를 할당함
    const [loginSts, setLoginSts] = 
    useState(sessionStorage.getItem("minfo"));


    // 2. 로그인 환영 메시지 상태변수
    const [loginMsg, setLoginMsg] = useState(null);

    // [ 공통 함수]
    // 1. 라우팅 이동 함수 : 라우팅 이동후크인 useNavigate는 
    // 다른 useCallback() 후크로 처리할 수 없다. 따라서 별도의 함수를 만들고 콜백처리해준다
    // -> const goPage = useCallback
    const goNav = useNavigate();

    // 함수메모처리위해 useCallback()에 넣어준다 -> 기억해놨다가 나중에 불러와서 쓰려고
    const goPage = useCallback((pm1, pm2) => {
        goNav(pm1,pm2);
    }, []);

    // 2. 로그인 환영메시지 생성함수
    const makeMsg = useCallback((name) => {
        let usrIcon = ["🙍‍♂","🧏‍♀","🦸‍♂","👨‍🎤","🦸‍♀"];
        let rdm = Math.floor(Math.random() *5);
        setLoginMsg(`Welcome ${name} ${usrIcon[rdm]}`);
    },[]); ////// makeMsg 함수 ///////////

    // 3. 로그아웃 함수
    const logoutFn = useCallback(() => {
        setLoginSts(null);
        sessionStorage.removeItem("minfo");
        setLoginMsg(null);
        goPage("/");

    },[]) /////// logoutFn 함수 /////////

     // 4. 로그인 상태 체크함수 -> 화면 랜더링 상태 체크 
     useEffect(()=>{
        if(sessionStorage.getItem("minfo")){
            let ss = sessionStorage.getItem("minfo");
            setLoginSts(ss);
            makeMsg(JSON.parse(ss).unm);
            
        } ////// if ///////

     },[]);


  return (
    <dCon.Provider value={{loginSts, setLoginSts,loginMsg,setLoginMsg,goPage,makeMsg,logoutFn}}>
      {/* 1.상단영역 */}
      <TopArea loginMsg={loginMsg} loginSts={loginSts} logoutFn={logoutFn} goPage={goPage}/>
      {/* 2.메인영역 */}
      <MainArea />
      {/* 3.하단영역 */}
      <FooterArea />
    </dCon.Provider>
  );
}

export default Layout;
