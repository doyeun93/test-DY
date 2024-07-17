
import React from 'react';
import mFn from "../func/function";

function intro_letter(props) {
    

const getBCR = (x) => x.getBoundingClientRect().top;
// 화면기준값(높이의 2/3)
const winH = window.innerHeight / 3;
console.log("화면1/3:", winH);

// 스크롤 등장 대상
// New Item
const inTit = mFn.qs(".intro-title");
const showTg = mFn.qs(".intro-text1");
const showTg2 = mFn.qs(".intro-text2");
const showTg3 = mFn.qs(".intro-text3");

// 윈도우 스크롤 이벤트 설정하기
window.addEventListener("scroll", () => {
  // 대상위치값
  // console.log(getBCR(newItem));
  if (getBCR(inTit) < winH) {
    showTg.classList.add("on");
  } else {
    showTg.classList.remove("on");
  }
  if (getBCR(inTit) < winH) {
    showTg2.classList.add("on");
  } else {
    showTg2.classList.remove("on");
  }
  if (getBCR(inTit) < winH) {
    showTg3.classList.add("on");
  } else {
    showTg3.classList.remove("on");
  }
});




}
export default intro_letter;