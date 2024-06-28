import React from 'react';

import { Swiper , SwiperSlide } from "swiper/react";

import { EffectCreative } from "swiper/modules";


import { eventData } from '../data/sub4';

function SwiperEvent() {
    const eData = eventData;

    return (
        <>
        <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            // shadow: true,
            backgroundColor: "#fffae847",
            translate: [0, 0, -800],
            rotate: [180, 0, 0],
          },
          next: {
            // shadow: true,
            translate: [0, 0, -800],
            rotate: [-180, 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper1"
      >
        {eData.map((v,i) => (
            <SwiperSlide key={i}>
                <div className="eventcook-box">
                    <img className="eventcook-pic" src={v.imgName} alt={v.title} />
                    <span>{v.title}</span>
                </div>
            </SwiperSlide>

        ))}

      </Swiper>
        </>
    );
}

export default SwiperEvent;