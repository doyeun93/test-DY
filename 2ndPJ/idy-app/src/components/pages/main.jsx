// 메인 페이지 컴포넌트 ///

import React, { useLayoutEffect } from 'react';

import "../../css/main.scss";

import {headerdata} from "../data/headerarea";
import headerFn from '../func/header';
import SwiperLab from '../plugin/SwiperLab';
import Cookpic from '../modules/Cookpic';

function Main(props) {
    
  useLayoutEffect(() => {
    headerFn();
  }, []);

  // 코드 리턴구역 ////////////
    return (
        <>
        {/* <!-- 요리초보가이드 --> */}
        <header id="header-area">
          <div className="header-top">
            <ul className="header-text">
              <img src={process.env.PUBLIC_URL+`/image/samie1.png`} alt="새미이미지" />
              <li>추천드려요!</li>
              <li>
                <a href="/cookguide">가이드 더보기 ➕</a>
              </li>
            </ul>
            <ul className="header-title">
              <li>요리초보가이드</li>
            </ul>
          </div>
          <div className="header-img">
            <div className="header-slide">
              <ul>
                {headerdata.map((v,i) => (
                  <li key={i}>
                    <a href="/cookguide">
                      <img src={process.env.PUBLIC_URL+`/image/${v.imgName}.jpg`} alt="header image" />
                    </a>
                    <span>{v.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>
        
        {/* <!-- 요리 연구소 -->  */}
        <div id="lab-area">
          <div className="lab-top">
            <ul>
              <li>요리연구소</li>
              <li>
                <img src={process.env.PUBLIC_URL+`/image/samie4.png`} alt="새미이미지"/>
              </li>
              <li>
                <a href="/cooklab">더보기 〉</a>
              </li>
            </ul>
          </div>
                <SwiperLab />
        </div>

        {/* <!-- 요리해요 --> */}
        <div id="cook-area">
            <div className="cook-top">
              <ul className="cook-title">
                <li>
                  <img src={process.env.PUBLIC_URL+`/image/samie3.jpg`} alt="새미이미지"/>
                </li>
                <li>요리해요 </li>
                <li>
                <a href="/cookcook">더보기 〉</a>
                </li>
              </ul>
            </div>
              <Cookpic />

            <div className="cook-bottom">
              <img src={process.env.PUBLIC_URL+`/image/samie2.png`} alt="새미이미지"/>
              <div className="cook-food">
                <p>나만의 요리를 올려주세요!</p>
                <a href="#">작성하기
                  <img src="/image/ic_write.png" alt="연필그림"/>
                </a>
              </div>
            </div>
        </div>
  
        {/* <!-- 이벤트 구역 --> */}
        <div id="event-area">
          <div className="event-box">
            <ul>
              <li>
                <img src={process.env.PUBLIC_URL+`/image/samie_txt.png`} alt="wow" />
              </li>
              <li>이벤트</li>
            </ul>
            <button className="event-btn">
              <a href="/cookevent">더보기 〉</a>
            </button>
          </div>
          <div className="event-ban">
              <img src={process.env.PUBLIC_URL+`/image/event.png`} alt="이벤트배너" />    
          </div>
        </div>
  
        </>
    );
}

export default Main;