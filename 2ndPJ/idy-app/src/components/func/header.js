//  가로 스크롤 구현

import mFn from "./function";


export default function headerFn() {
  const tpg = mFn.qs(".header-img");

  const target = mFn.qs(".header-slide>ul");


  const eachList = mFn.qsaEl(target, "li");

 
  mFn.addEvt(window, "scroll", moveSlide);



  
  function moveSlide() {
    
    let bTop = mFn.getBCR(tpg);
    

    if (bTop > 0) {
      target.style.left = "0px";
    }
    
    else if (bTop <= 0 && bTop >= -3000) {
      target.style.left = bTop + "px";
    }
   
    else {
      target.style.left = "-3000px";
    }

    
    eachList.forEach((ele, idx) => upDownFn(ele, idx));
    
  } ///////// moveSlide 함수 ////////////////////

  
  function upDownFn(ele, idx) {
   
    let mVal = mFn.getBCR2(ele);

   
    mVal = (Math.abs(mVal / window.innerWidth) * 100) / 3;
    
    if (idx % 2 == 0) mVal = -mVal;
    

    ele.style.translate = `0 ${mVal}%`;
  } ///////// upDownFn 함수 //////////
  
} ///////////// headerFn ////////////////////
