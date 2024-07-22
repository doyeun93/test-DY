import React, { useContext, useEffect } from "react";
import "../../css/detail.scss";
import $ from "jquery";
import { dCon } from "../modules/dCon";

import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import detail_letter from "../func/detail_letter";

function LabDetail() {
  useEffect(() => {
    detail_letter();
  }, []);

  const { state } = useLocation();
  //   const imgName = loc.state.imgName;
  //   const title = loc.state.title;
  //   const text = loc.state.text;
  //   const type = loc.state.type;

  const myCon = useContext(dCon);

  const matchFolder = {
    sub: "sub1",
    re_: "sub2",
    sol: "sub2",
    coo: "sub3",
    eve: "sub4",
  };

  return (
    <>
      {/* 레시피 상세정보 박스 */}
      <div className="lab-detail">
        {/* 스크랩 버튼 구현 */}
        <button
          className="btn"
          onClick={() => {
            if (!localStorage.getItem("scrap-data")) {
              localStorage.setItem("scrap-data", "[]");
            } //// if /////
            let locals = localStorage.getItem("scrap-data");
            locals = JSON.parse(locals);

            let newLocals = locals.map((v) => v.imgName);

            let retSts = newLocals.includes(state.imgName);
            
            if (retSts) {
              // 메시지 보이기
              alert("이미 선택하신 상품입니다");
              // 함수 나가기
              return;
            } ////// if //////////
            
            locals.push({
              idx: state.idx,
              title: state.title,
              kind: state.kind,
              imgName: state.imgName,
            });
            
            
            // 로컬스에 문자화하여 입력하기
            localStorage.setItem("scrap-data", JSON.stringify(locals));
            
            // 로컬스 카트데이터 상태값 변경
            myCon.setLocalsScrap(localStorage.getItem("scrap-data"));

            // 카트리스트 생성 상태값 변경
            myCon.setScrapSts(true);

            // myCon.goPage("/scrap");
          }}
        >
          <FontAwesomeIcon
            style={{
              position: "fixed",
              bottom: "56%",
              left: "85%",
              color: "#15a775",
              fontSize: "40px",
              // border: '1px solid #f5f5f5',
            }}
            icon={faBookmark}
          />
        </button>
        {/* 레시피 상세정보 제목 */}
        <div className="ldetail-top">
          <h2>{state.kind}</h2>
          <span>{state.title}</span>
        </div>
        {/* 레시피 상세정보 소제목 */}
        <div className="ldetail-tit">
          {state.text.split("*").map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>
        {/* 레시피 상세정보 이미지 */}
        <div className="ldetail-pic">
          <img
            style={{ width: "100%", height: "100", objectFit: "cover" }}
            src={`./image/${matchFolder[state.imgName.substr(0, 3)]}/${state.imgName}.jpg`}
            alt={state.title}
          />
        </div>
        {/* 레시피 상세정보 재료 */}
        <div className="ldetail-txt">
          <div className="ldetail-txt1">
            <ul>
              <li>{state.type1}</li>
              <li>{state.type2}</li>
              <li>{state.type3}</li>
            </ul>
          </div>
          <div className="ldetail-txt2">
            <ul>
              <li>{state.type4}</li>
              <li>{state.type5}</li>
              <li>{state.type6}</li>
            </ul>
          </div>
        </div>
        {/* 레시피 상세정보 레시피 이미지 3개*/}
        <div className="ldetail-img">
          <img
            src={`./image/${matchFolder[state.imgName.substr(0, 3)]}/${state.imgName}_1.jpg`}
            alt={state.title}
          />
          <img
            src={`./image/${matchFolder[state.imgName.substr(0, 3)]}/${state.imgName}_2.jpg`}
            alt={state.title}
          />
          <img
            src={`./image/${matchFolder[state.imgName.substr(0, 3)]}/${state.imgName}_3.jpg`}
            alt={state.title}
          />
        </div>
        {/* 레시피 상세정보 레시피 순서 */}
        <div className="ldetail-seq">
          <ul className="rdetail-seq">
            <li className="rdetail-seq1">{state.type7}</li>
            <br />
            <li className="rdetail-seq2">{state.type8}</li>
            <br />
            <li className="rdetail-seq3">{state.type9}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LabDetail;
