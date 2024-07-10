import React, { useState } from 'react';
import "../../css/tt.scss";

export function ShowMenu() {
  const goSub = (e) => {


    document.querySelector(".ham").click();
    
  };

  return (
    <>
      <div className="hbox">
        <nav className="hlist">
          <ul className="htit">
            <li onClick={goSub}>새미네소개</li>
            <li onClick={goSub}>요리초보가이드</li>
            <ul className="htext">
              <li onClick={goSub}>레시피</li>
              <li onClick={goSub}>솔루션</li>
            </ul>
            <ul className="htext">
              <li onClick={goSub}>요리해요</li>
              <li onClick={goSub}>질문있어요</li>
            </ul>
            <li onClick={goSub}>WOW이벤트</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
