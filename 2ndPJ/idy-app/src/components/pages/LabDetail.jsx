import React, { useContext } from "react";
import "../../css/cooklab_detail.scss";
import $ from "jquery";
import { dCon } from "../modules/dCon";

import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

function LabDetail() {
  const loc = useLocation();
  const imgName = loc.state.imgName;
  const title = loc.state.title;
  const text = loc.state.text;
  const type = loc.state.type;



  const myCon = useContext(dCon);

  return (
    <>
      {/* 레시피 상세정보 박스 */}
      <div className="lab-detail">
        {/* 스크랩 버튼 구현 */}
            <button className="btn" 
            onClick={()=>{
                if (!localStorage.getItem("scrap-data")) {
                    localStorage.setItem("scrap-data", "[]");
                  } //// if /////
                  let locals = localStorage.getItem("scrap-data");
                  locals = JSON.parse(locals);

                //   let newLocals = locals.map(v=>v.idx);

                //   let retSts = newLocals.includes(gIdx);

                //   if(retSts){
                //     // 메시지 보이기
                //     alert("이미 선택하신 상품입니다");
                //     // 함수 나가기
                //     return;
                //   } ////// if //////////

                //   locals.push({
                //     idx: gIdx,
                //     cat: cat,
                //     ginfo: ginfo,
                //     cnt : $("#sum").val(),
                //   });

                   // 로컬스에 문자화하여 입력하기
                   localStorage.setItem("scrap-data", JSON.stringify(locals));

                   // 로컬스 카트데이터 상태값 변경
                   myCon.setLocalsCart(localStorage.getItem("scrap-data"));

                   // 카트리스트 생성 상태값 변경
                  myCon.setCartSts(true);

            }}>
                <FontAwesomeIcon style={{
                        position:'fixed',
                        bottom: '56%',
                        left:'80%',
                        color:'#15a775',
                        fontSize:'40px',
                        // border: '1px solid #f5f5f5',
                      }}  
                icon={faBookmark} />
            </button>
        {/* 레시피 상세정보 제목 */}
        <div className="ldetail-top">
          <h2>레시피</h2>
          <span>{title}</span>
        </div>
        {/* 레시피 상세정보 소제목 */}
        <div className="ldetail-tit">
          {text.split("*").map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>
        {/* 레시피 상세정보 이미지 */}
        <div className="ldetail-pic">{imgName}</div>
        {/* 레시피 상세정보 재료 */}
        <div className="ldetail-txt">
          <div className="ldetail-txt1">
            {/* type1,2,3 들어감 */}
            <ul>
              <li>{type}</li>
              <li>{type}</li>
              <li>{type}</li>
            </ul>
          </div>
          <div className="ldetail-txt2">
            {/* li에 type4,5,6 들어감 */}
            <ul>
              <li>{type}</li>
            </ul>
          </div>
        </div>
        {/* 레시피 상세정보 레시피 이미지 3개*/}
        <div className="ldetail-img"></div>
        {/* 레시피 상세정보 레시피 순서 */}
        <div className="ldetail-seq">{/* type7,8,9 들어감 */}</div>
      </div>
    </>
  );
}

export default LabDetail;
