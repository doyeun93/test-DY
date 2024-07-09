// 스와이퍼 플러그인 컴포넌트

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./css/swiper.scss";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
import { Navigation } from "swiper/modules";

import { mainData } from "../data/mainarea";
import { Link } from "react-router-dom";

export default function SwiperLab() {
  // 불러 올 이미지 리스트
  const selData = mainData;

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={50}
        loop = {true}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Navigation]}
        breakpoints={{
            200: {
                slidesPerView: 1,
            },
            500: {
                slidesPerView: 2,
            },
            900: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
          }
        }

        className="mySwiper"
      >
        {selData.map((v, i) => (
          <SwiperSlide key={i}>
            <section className="lab-img">
              {/* 이미지영역 */}
              <div className="lab-img2">
                <Link to="/cooklab">
                  <img src={process.env.PUBLIC_URL+`/image/${v.imgName}.jpg`} alt={v.title} />
                </Link>
              </div>
              <section className={v.category=="솔루션"?"lab-text sol":"lab-text rec"}>
                {/* 이미지 타이틀영역 */}
                <div className="lab-tit">
                  <span>{v.title}</span>
                  <p>{v.text}</p>
                </div>
                <div className="lab-cate">
                  <span>{v.category}</span>
                </div>
                <ul className="lab-type">
                    <li>{v.type1}</li>
                    <li>{v.type2}</li>
                </ul>
              </section>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
} /////////// SwiperLab 컴포넌트 ///////////

