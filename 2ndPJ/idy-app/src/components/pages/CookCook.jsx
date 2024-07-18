// 요리해요 페이지 컴포넌트 ///

import { Link } from "react-router-dom";
import { Fragment, useContext, useRef, useState } from "react";
import cooData from "../data/cook_board.json";

import "../../css/cookcook.scss";
import "../../css/board_file.scss";
import {initBoardData} from "../func/board_fn";
import { dCon } from "../modules/dCon";
import $ from "jquery";

export default function CookCook() {

  const myCon = useContext(dCon);

  const sts = myCon.loginSts;
  initBoardData();

  const cooData = JSON.parse(localStorage.getItem("board-data"));
  cooData.sort((a, b) =>
   Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
 );

  const [pageNum, setPageNum] = useState(1);

  const [mode, setMode] = useState("L");

  const totalCount = useRef(cooData.length);

  const selRecord = useRef(null);

  const unitSize = 8;

  const bindList = () => {
    let orgData = cooData;

    // 2. 정렬 적용하기 : 내림차순
    orgData.sort((a, b) =>
      Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
    );

    // 3. 일부 데이터만 선택

    let sNum = (pageNum - 1) * unitSize;

    let eNum = pageNum * unitSize;

    // 결과배열
    const selData = [];

    for (let i = sNum; i < eNum; i++) {
      // 끝번호가 전체 개수보다 크면 나가기
      if (i >= totalCount.current) break;
      // 대상 배열값 추가
      selData.push(orgData[i]);
    } ////// for ////////

    return selData.map((v, i) => (
      <tr key={i}>
        {/* 시작번호(i+1)를 더하여 페이지별 순번을 변경 */}
        <td>{i + 1 + sNum}</td>
        <td>
          <a href="#" onClick={(e) => {
              e.preventDefault();
              // 읽기모드 변경
              setMode("R");
              selRecord.current = v;  
            }}>
            {v.tit}
          </a>
        </td>
        <td>{v.unm}</td>
        <td>{v.date}</td>
        <td>{v.cnt}</td>
      </tr>
    ));
  }; ///// bindList 함수 ////////

  const pagingList = () => {
    // 전체 페이징 개수 : 전체레코드수 / 페이지당 개수
    // 유의점 : 나머지가 있는지 검사해서 있으면 +1

    // 1. 페이징 개수
    let pagingCount = Math.floor(totalCount.current / unitSize);

    // 나머지가 있으면 다음 페이지가 필요함
    // 나머지가 0이 아니면 1더하기
    if (totalCount.current % unitSize > 0) {
      pagingCount++;
    }
    // console.log("페이징개수:", pagingCount, "나머지개수:", totalCount.current % unitSize);

    // 링크코드 만들기
    const pgCode = [];

    // 1부터 페이지 끝번호까지 돌면서 코드만들기
    for (let i = 1; i <= pagingCount; i++) {
      pgCode.push(
        <Fragment key={i}>
          {
            // 페이징번호와 현재페이지번호 일치시 b요소
            i === pageNum ? (
              <b>{i}</b>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPageNum(i);
                }}
              >
                {i}
              </a>
            )
          }
          {/* 사이에 바 넣기 */}
          {i !== pagingCount && " | "}
        </Fragment>
      );
    } ///// for /////

    // 코드 리턴
    return pgCode;
  }; ///// pagingList 함수 //////////////

  // 버튼 클릭시 변경함수 ////
  const clickButton = (e) => {
    // 버튼 글자 읽기
    let btnText = e.target.innerText;
    // 버튼별 분기
    switch (btnText) {
      // 글쓰기 모드로 변경
      case "Write":
        setMode("W");
        break;
      // 리스트 모드로 변경
      case "List":
        setMode("L");
        break;
      // 서브밋일 경우 함수 호출
      case "Submit":
        submitFn();
        break;
      // 수정일 경우 수정모드로 변경
      case "Modify":
        setMode("M");
        break;
      // 삭제일 경우 삭제 함수 호출
      case "Delete":
        deleteFn();
        break;
    } ///// switch /////
  }; /////// clickButton  ///////

  
  // 삭제 처리 함수
  const deleteFn = () => {
    // 삭제 여부 확인
    if(window.confirm("해당 글을 삭제하시겠습니까?")){

    } ////// if 문
    // 1. 해당 항목 idx 담기
    let currIdx = selRecord.current.idx;
    cooData.some((v,i)=>{
      if(v.idx == currIdx){
        cooData.splice(i,1);
        return true;
      } /////// if ////////
    }); //// some
       localStorage.setItem("board-data", JSON.stringify(cooData));

       totalCount.current = cooData.length;
 
       // 4. 리스트로 돌아가기(리랜더링) -> 모드 변경 "L"
       setMode("L");
       // -> 삭제 후 첫페이지로 이동
       setPageNum(1);
    //  } ////// if ///////

  }; //////// deleteFn /////////////////


  // 서브밋 처리함수
  const submitFn = () => {
    // 제목 입력 항목
    let title = $(".subject").val().trim();
    // 내용 입력 항목
    let cont = $(".content").val().trim();
    // trim으로 앞 뒤 공백 제거 후 검사

    // 1. 공통 유효성 검사
    // 제목, 내용 모두 비었으면 리턴
    if (title == "" || cont == "") {
      alert("제목이나 내용을 입력해주세요!");
      return; // submit 없이 함수 나가기
    }

    // 2. 글쓰기 서브밋 (mode == "W")
    if (mode == "W") {
      let person = JSON.parse(sts);

      // [1] 오늘날짜 생성하기
      let today = new Date();

      // [2] 글번호 만들기
      let arrIdx = cooData.map((v) => parseInt(v.idx));
      // 최대값 찾기 :  스프레드 연산자로 배열값만 넣음
      let maxNum = Math.max(...arrIdx);
  

      // [3] 입력 데이터 객체 형식으로 바꾸기
      let data = {
        idx: maxNum + 1,
        tit: title,
        cont: cont,
        att: "",
        date: today.toJSON().substr(0, 10),
        uid: person.uid,
        unm: person.unm,
        cnt: "0",
      };
      // console.log("글쓰기 서브밋:", data);

      // [4] 로컬스에 입력하기
      // (1) 로컬스에 파싱
      let locals = localStorage.getItem("board-data");
      locals = JSON.parse(locals);
      // (2) 파싱 배열에 push
      locals.push(data);
      // (3) 새배열을 문자화하여 로컬스에 넣기
      localStorage.setItem("board-data", JSON.stringify(locals));

      // 4. 추가후 리스트 리랜더링시 리스트 불일치로 인한
      // 에러를 방지하기 위하여 전체 개수를 바로 업데이트한다!
      totalCount.current = cooData.length;

      // [5]리스트로 돌아가기(리랜더링) -> 모드 변경 "L"
      setMode("L");
       // -> 추가 후 첫페이지로 이동
       setPageNum(1);
    }

    // 3. 수정모드 서브밋(mode == "M")
    else if (mode == "M") {
     

      // [1] 오늘날짜 생성하기
      // -> 수정시 수정날짜 항목을 새로 만들고 입력함
      let today = new Date();

      // [2] 현재 데이터 idx값
      let currIdx = selRecord.current.idx;
      // [3] 기존 데이터로 찾아서 변경하기 : 로컬스 데이터(coodata)
      // find()는 특정항목을 찾아서 리턴하여 데이터를 가져오고, 업데이트 등 작업도 가능함
      cooData.find(v=>{
        console.log(v,selRecord);
        if(v.idx == currIdx){
          // [ 업데이트 작업하기 ]
          // 이미 선택된 selRecord 참조변수의 글번호인 idx로 원본 데이터를 조회하여 기존 데이터를 업데이트함
          // 기존 항목 변경 : tit, cont
          // (1) 글제목 : tit
          v.tit = title;
          // (2) 글내용 : cont
          v.cont = cont;
          // (3) 수정일 : mdate
          v.mdate = today.toJSON().substr(0, 10); // 수정일

          // 해당 항목을 만나면 끝남
          return true;
        }
      }) /////// find /////


      // [4] 로컬스에 업데이트하기
      localStorage.setItem("board-data", JSON.stringify(cooData));

      // [5]리스트로 돌아가기 -> 모드 변경 "L"
      setMode("L");

    } ///// else if

  }; ///// submitFn ///////


  //// 코드 리턴 구역
  return (
    <>
      <section className="cookcook-top">
        <div className="cookcook-title">
          <span>요리해요</span>
        </div>
        <div className="cookcook-text">
          <ul>
            <li className="on">
              <Link to="/cookcook">요리해요</Link>
            </li>
            <li>
              <Link to="/cookqna">질문있어요</Link>
            </li>
          </ul>
        </div>
        <div className="cook-write">
          <img src={process.env.PUBLIC_URL + `/image/samie2.png`} alt="새미이미지" />
          <div className="cook-cook">
            <ul className="cook-cbox">
              <li>나만의 요리를 올려주세요!</li>
              <li>나만의 요리법, 재밌는 플레이팅, 요리 꿀팁 등 다양한 이야기를 새미네부엌에서 함께 나눠 주세요!</li>
            </ul>
            <Link to="/login">
              작성하기
              <img src={process.env.PUBLIC_URL + `/image/ic_write.png`} alt="연필그림" />
            </Link>
          </div>
        </div>
      

        <main className="cont">
          <div className="selbx">
            <select name="cta" id="cta" className="cta">
              <option value="tit">제목</option>
              <option value="cont">내용</option>
              <option value="unm">작성자</option>
            </select>
            <select name="sel" id="sel" className="sel">
              <option value="0">최신순</option>
              <option value="1">오래된순</option>
            </select>
            <input id="stxt" type="text" maxLength="50" />
            <button className="sbtn">Search</button>
          </div>
          <table className="dtbl" id="board">
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Writer</th>
                <th>Date</th>
                <th>Hits</th>
              </tr>
            </thead>
            <tbody>{bindList()}</tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="paging">
                  {pagingList()}
                </td>
              </tr>
            </tfoot>
          </table>
          <br />
          <table className="dtbl btngrp">
            <tbody>
              <tr>
                <td>
                  <button>
                    <a href="#">Write</a>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </section>
    </>
  );
} ////////////  Cook함수 ////////
