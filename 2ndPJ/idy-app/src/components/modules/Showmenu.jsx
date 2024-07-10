import React, { useState } from 'react';


export function ShowMenu() {

  const goSub = (e) => {
    document.querySelector(".ham").click();  
  };

  const hideBox = () => {
    document.querySelector(".hbox").style.left = "100%";
  };

  return (
    <>
      <div className="hbox">
        <button className='cbtn' onClick={hideBox}>×</button>
        <nav className="hlist">
          <ul className="htit">
            <li onClick={goSub}>새미네소개</li>
            <li onClick={goSub}>요리초보가이드</li>
            <li onClick={goSub}>요리연구소
              <ul className="htext">
                <li onClick={goSub}>레시피</li>
              < li onClick={goSub}>솔루션</li>
              </ul>
            </li>
            <li onClick={goSub}>요리해요
              <ul className="htext">
                <li onClick={goSub}>요리해요</li>
              < li onClick={goSub}>질문있어요</li>
              </ul>
            </li>
            <li onClick={goSub}>WOW이벤트</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
