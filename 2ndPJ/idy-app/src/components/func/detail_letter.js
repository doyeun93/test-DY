
import React from 'react';
import mFn from "./function";

function detail_letter(props) {
    

const getBCR = (x) => x.getBoundingClientRect().top;

const winH = window.innerHeight / 4*3;
// console.log("화면:", winH);


// 스크롤 등장 대상
// New Item
const inTit = mFn.qs(".rdetail-seq");
const showTg = mFn.qs(".rdetail-seq1");
const showTg2 = mFn.qs(".rdetail-seq2");
const showTg3 = mFn.qs(".rdetail-seq3");

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
export default detail_letter;