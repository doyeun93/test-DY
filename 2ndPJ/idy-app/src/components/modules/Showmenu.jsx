import React, { useState } from 'react';
import { gnbData } from '../data/gnb';
import { Link } from 'react-router-dom';


export function ShowMenu() {

  const hideBox = () => {
    document.querySelector(".hbox").style.left = "100%";
  };

  return (
    <>
      <div className="hbox">
        <button className='cbtn' onClick={hideBox}>×</button>
        <nav className="hlist">
          <ul className="htit">
          {gnbData.map((v, i) => (
                <li key={i} onClick={hideBox}>
                  {v.sub ? <a href="#">{v.txt}</a> : <Link to={v.link}>{v.txt}</Link>}
                  {v.sub && (
                    <ul className="htext">
                      {v.sub.map((v, i) => (
                        <li key={i}>
                          <Link to={v.link}>{v.txt}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            {/* <li onClick={goSub}>새미네소개</li>
            <li onClick={goSub}>요리초보가이드</li>
            <li onClick={goSub}>요리연구소
              <ul className="htext">
                <li onClick={goSub}>레시피</li>
                <li onClick={goSub}>솔루션</li>
              </ul>
            </li>
            <li onClick={goSub}>요리해요
              <ul className="htext">
                <li onClick={goSub}>요리해요</li>
                <li onClick={goSub}>질문있어요</li>
              </ul>
            </li>
            <li onClick={goSub}>WOW이벤트</li> */}
          </ul>
        </nav>
      </div>
    </>
  );
}
