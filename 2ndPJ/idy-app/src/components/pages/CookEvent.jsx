// WOW이벤트 페이지 컴포넌트 ///
import React from "react";

import "../../css/cookevent.scss";
import SwiperEvent from "../plugin/SwiperEvent";

export default function CookEvent() {
  //// 코드 리턴 구역
  return (
    <>
      <section className="event-top">
        <div className="evt-title">
          <ul>
            <li>
              <img src="./image/samie_txt.png" alt="wow" />
            </li>
            <li>이벤트</li>
          </ul>
        </div>
        <video src="./image/mv.mp4" style={{width:"100%",height:"70%",objectFit:"cover"}}
        muted loop autoPlay />
      </section>

      <section className="event-mid">
        <div className="event-info">
          <p>↼ Drag ⇀</p>
        </div>
        <SwiperEvent />
      </section>
    </>
  );
} ////////////  Event함수 ////////
