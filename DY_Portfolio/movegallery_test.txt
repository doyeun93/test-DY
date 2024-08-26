import React, { useEffect, useLayoutEffect } from "react";
import { characterData } from "../../data/sub_themandalorian_data";

import "../../css/md_character.scss";

import domFn from "../../js/my_function";

function MdCharacter(props) {
  useLayoutEffect(() => {
    const crtImgBox = domFn.qs(".character-img-box");

    let target = domFn.qsEl(crtImgBox, ".list01");
    let target2 = domFn.qsEl(crtImgBox, ".list02");
    // 기준값 업데이트 함수
    const updateCriteria = () => domFn.qsaEl(target, "li")[0].offsetWidth;
    const updateCriteria2 = () => domFn.qsaEl(target2, "li")[0].offsetWidth;
    // 기준값(대상 li의 가로크기값)
    let criteria = updateCriteria();
    let criteria2 = updateCriteria2();

    domFn.addEvt(window, "resize", () => {
      criteria = updateCriteria();
      criteria2 = updateCriteria2();
    });

    let currVal = 0;
    let currVal2 = 0;

    function moveGallery() {
      target.style.translate = --currVal + "px";

      if (currVal <= Math.floor(-criteria)) {
        target.appendChild(domFn.qsaEl(target, "li")[0]);
        target.style.translate = "0px";
        currVal = 0;
      } /// if///

      if (!stopSts) setTimeout(moveGallery, 6);
    } ////// moveGallery 함수 //////

    function moveGallery2() {
      target2.style.translate = --currVal2 + "px";

      if (currVal2 <= Math.floor(-criteria2)) {
        target2.appendChild(domFn.qsaEl(target2, "li")[0]);
        target2.style.translate = "0px";
        currVal2 = 0;
      } /// if///

      if (!stopSts) setTimeout(moveGallery2, 10);
    } /// moveGallery2 함수

    let stopSts = false;

    domFn.addEvt(crtImgBox, "mouseenter", () => {
      stopSts = true;
    });

    domFn.addEvt(crtImgBox, "mouseleave", () => {
      stopSts = false;
      moveGallery();
      moveGallery2();
    });

    setTimeout(moveGallery);
    setTimeout(moveGallery2);
  }, []);
  return (
    <div id="mdcharacter-area">
      <section className="character-area section-top">
        <div className="inboxman character-wrap">
          <h2>
            <span>Databank: The Mandalorian</span>
          </h2>
          <div className="character-img-box">
            <div className="img-list">
              <ul className="list01">
                {characterData.map(
                  (v, i) =>
                    i < 15 && (
                      <li key={i}>
                        <div className="list-box">
                          <img
                            src={process.env.PUBLIC_URL+"/images/sub_themandalorian_images/" + v.image}
                            alt=""
                          />
                          <h3>
                            <span>{v.name}</span>
                          </h3>
                        </div>
                      </li>
                    )
                )}
              </ul>
            </div>

            <div className="img-list">
              <ul className="list02">
                {characterData.map(
                  (v, i) =>
                    i < 30 &&
                    i >= 14 && (
                      <li key={i}>
                        <div className="list-box">
                          <img
                            src={process.env.PUBLIC_URL+"/images/sub_themandalorian_images/" + v.image}
                            alt=""
                          />
                          <h3>
                            <span>{v.name}</span>
                          </h3>
                        </div>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MdCharacter;
