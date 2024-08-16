import React, { useContext, useEffect, useState } from "react";
import { dCon } from "./dCon";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import "../../css/scrap.scss";
import { Link } from "react-router-dom";

function Scrap(props) {
  const [force, setForce] = useState(false);
  const myCon = useContext(dCon);
  const selData = JSON.parse(myCon.localsScrap);
  const dataCnt = selData.length;

  useEffect(() => {
    $("#myScrap")
      .removeClass("on")
      .delay(300) 
      .fadeIn(300, function () {
        $(this).addClass("on");
      }); //// fadeIn ///////
  }, [dataCnt, force]);

  return (
    <>
      <div className="scrap-box">
        <section id="scraplist">
          <a
            href="#"
            className="cbtn cbtn2"
            onClick={(e) => {
              e.preventDefault();
              $("#scraplist").animate({ right: "-60vw" }, 400);
            }}
          >
            <span>닫기버튼</span>
          </a>
          <table>
            {/* 항목별 세로 비율 설정 */}
            <colgroup>
              <col span="1" style={{ width: "7%" }} />
              <col span="1" style={{ width: "14%" }} />
              <col span="1" style={{ width: "18%" }} />
              <col span="1" style={{ width: "24%" }} />
              <col span="1" style={{ width: "12%" }} />
              <col span="1" style={{ width: "10%" }} />
              <col span="1" style={{ width: "7%" }} />
              <col span="1" style={{ width: "14%" }} />
            </colgroup>
            {/* 테이블 제목 */}
            <caption>
              <h1> 스크랩 ({dataCnt})</h1>
            </caption>
            {/* 테이블 상단영역 : 분류항목 출력 */}
            <thead>
              <tr>
                <th>번호</th>
                <th>상품</th>
                <th></th>
                <th>상품명</th>
                <th></th>
                <th>종류</th>
                <th></th>
                <th>삭제</th>
              </tr>
            </thead>
            {/* 테이블 메인 영역 */}
            <tbody>
              <tr>
                <td colSpan={8}>
                  {/* 내부 */}
                  <div className="scbar" style={{ overflowY: "auto", height: "64vh", width: "100%" }}>
                    {/* 내부용 스크롤 되는 테이블 */}
                    <table style={{ margin: "0", width: "100%" }}>
                      <tbody>
                        {selData.map((v, i) => (
                          <tr key={i}>
                            {/* 일련번호 */}
                            <td>{i + 1}</td>
                            {/* 상품이미지 */}
                            <td>
                              <Link to="/cooklab">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + `/image/sub2/${v.imgName}.jpg`
                                  }
                                  alt="item"
                                />
                                </Link>
                            </td>
                             
                            <td>{v.title}</td>
                              
                            <td>{v.kind}</td>
        
                            <td className="cnt-part">
                              <div>
                                <span>
                                  {/* <input
                                    type="text"
                                    className="item-cnt"
                                    readOnly=""
                                    defaultValue={v.cnt}
                                    onBlur={() => {
                                    }}
                                  /> */}
                                  {/* 반영 버튼 */}
                                  <button
                                    className="btn-insert"
                                    onClick={(e) => {
                                      selData[i].cnt = $(e.currentTarget).siblings(".item-cnt").val();
        
                                      let res = JSON.stringify(selData);
                                      
                                      localStorage.setItem("scrap-data", res);
                                      
                                      myCon.setLocalsScrap(res);
                                   
                                      $(e.currentTarget)
                                        .hide()
                                        .next() 
                                        .hide();
                                      setForce(!force);
                                    }}
                                  >
                                    반영
                                  </button>
                                  {/* 취소 버튼 */}
                                  <button
                                    className="btn-cancel"
                                    onClick={(e) => {
                                      $(e.currentTarget)
                                        .hide()
                                        .prev() 
                                        .hide()
                                        .siblings("input")
                                        .val(v.cnt);
                                    }}
                                  >
                                    취소
                                  </button>
                                  <b
                                    className="btn-cnt"
                                    onClick={(e) => {
                                      let tg = $(e.currentTarget).siblings("input");
                                      let btnAlt = $(e.target).attr("alt");
                                      if (btnAlt == "증가") {
                                        tg.val(Number(tg.val()) + 1);
                                      } 
                                      else if (btnAlt == "감소") {
                                        tg.val(Number(tg.val()) == 1 ? 1 : Number(tg.val() - 1));
                                      }
                                      $(e.currentTarget)
                                        .siblings(".btn-insert")
                                        .show()
                                        .next() 
                                        .show();
                                    }}
                                  >
                                    {/* <img
                                      src={process.env.PUBLIC_URL + "/image/cnt_up.png"}
                                      alt="증가"
                                    />
                                    <img
                                      src={process.env.PUBLIC_URL + "/image/cnt_down.png"}
                                      alt="감소"
                                    /> */}
                                  </b>
                                </span>
                              </div>
                            </td>
                            <td>
                            </td>
                            <td>
                              {/* 데이터 삭제 기능 버튼 */}
                              <button
                                className="cfn"
                                onClick={() => {
                                  if (window.confirm("해당 상품을 삭제하시겠습니까?")) {
                                    
                                    selData.splice(i, 1);
                                    let res = JSON.stringify(selData);
                                    
                                    localStorage.setItem("scrap-data", res);
                                    
                                    myCon.setLocalsScrap(res);
                              
                                    if (selData.length == 0) myCon.setScrapSts(false);
                                  } ///// if //////
                                }}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
            {/* 테이블 하단 영역 */}
            <tfoot>
              {/* <tr>
                <td colSpan="6">총 개수 :</td>
                <td>
                  <span className="total-num"></span>개
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="8" className="paging">
                  {/* <button>Buy Now</button> */}
                {/* </td>
              </tr>  */}
            </tfoot>
          </table>
        </section>
      </div>
      {/* 스크랩 버튼 이미지 박스 */}
      <div
        id="myScrap"
        onClick={(e) => {
          e.preventDefault();
          // 왼쪽으로 이동하여 나타남
          $("#scraplist").animate({ right: "0" }, 400);
        }}
      >
        {/* 스크랩 이미지  */}
        <img
          src={process.env.PUBLIC_URL + `/image/ic_scrap.png`}
          title={dataCnt}
          alt="스크랩"
        />
        {/* <FontAwesomeIcon
            style={{
              position: "fixed",
              bottom: "56%",
              left: "85%",
              color: "#15a775",
              fontSize: "40px",
              // border: '1px solid #f5f5f5',
            }}
            icon={faBookmark}
          /> */}
        {/* 카트 상품 개수 출력 박스 */}
        <div className="cntBx">{dataCnt}</div>
      </div>
    </>
  );
}

export default Scrap;
