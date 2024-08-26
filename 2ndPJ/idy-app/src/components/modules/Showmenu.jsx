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
          </ul>
        </nav>
      </div>
    </>
  );
}
