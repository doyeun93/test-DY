import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
// 로컬스토리지 게시판 기본데이터 제이슨
import baseData from "../data/board.json";

import "../../css/cookqna.scss";
import "../../css/board_file.scss";
import { initBoardData } from "../func/board_fn";
import { dCon } from "../modules/dCon";
import $ from "jquery";

export default function CookQnA() {
  const myCon = useContext(dCon);

  const sts = myCon.loginSts;
  initBoardData();

  const baseData = JSON.parse(localStorage.getItem("board-data"));
  baseData.sort((a, b) =>
    Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
  );

  const [pageNum, setPageNum] = useState(1);

  const [mode, setMode] = useState("L");

  const totalCount = useRef(baseData.length);

  const selRecord = useRef(null);

  const pgPgNum = useRef(1);

  const unitSize = 8;
  // 페이징의 페이징 개수 : 한번에 보여줄 페이징 개수
  const pgPgSize = 5;

  const bindList = () => {
    let orgData = baseData;

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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // 읽기모드 변경
              setMode("R");
              selRecord.current = v;
            }}
          >
            {v.tit}
          </a>
        </td>
        <td>{v.unm}</td>
        <td>{v.date}</td>
        <td>{v.cnt}</td>
      </tr>
    ));
  }; ///// bindList 함수 ////////

  // 버튼 클릭시 변경함수 ////
  const clickButton = (e) => {
    // 버튼 글자 읽기
    let btnText = e.target.innerText;
    // 버튼별 분기
    switch (btnText) {
      // 글쓰기 모드로 변경
      case "글쓰기":
        setMode("W");
        break;
      // 리스트 모드로 변경
      case "목록":
        setMode("L");
        break;
      // 서브밋일 경우 함수 호출
      case "제출":
        submitFn();
        break;
      // 수정일 경우 수정모드로 변경
      case "수정":
        setMode("M");
        break;
      // 삭제일 경우 삭제 함수 호출
      case "삭제":
        deleteFn();
        break;
    } ///// switch /////
  }; /////// clickButton  ///////

  // 삭제 처리 함수
  const deleteFn = () => {
    // 삭제 여부 확인
    if (window.confirm("해당 글을 삭제하시겠습니까?")) {
    } ////// if 문
    // 1. 해당 항목 idx 담기
    let currIdx = selRecord.current.idx;
    baseData.some((v, i) => {
      if (v.idx == currIdx) {
        baseData.splice(i, 1);
        return true;
      } /////// if ////////
    }); //// some
    localStorage.setItem("board-data", JSON.stringify(baseData));

    totalCount.current = baseData.length;

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
      let arrIdx = baseData.map((v) => parseInt(v.idx));
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
      totalCount.current = baseData.length;

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
      // [3] 기존 데이터로 찾아서 변경하기 : 로컬스 데이터(basedata)
      // find()는 특정항목을 찾아서 리턴하여 데이터를 가져오고, 업데이트 등 작업도 가능함
      baseData.find((v) => {
        console.log(v, selRecord);
        if (v.idx == currIdx) {
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
      }); /////// find /////

      // [4] 로컬스에 업데이트하기
      localStorage.setItem("board-data", JSON.stringify(baseData));

      // [5]리스트로 돌아가기 -> 모드 변경 "L"
      setMode("L");
    } ///// else if
  }; ///// submitFn ///////

  return (
    <>
      <section className="cookqna-top">
        <div className="cookqna-title">
          <span>질문있어요</span>
        </div>
        <div className="cookqna-text">
          <ul>
            <li>
              <Link to="/cookcook">요리해요</Link>
            </li>
            <li className="on">
              <Link to="/cookqna">질문있어요</Link>
            </li>
          </ul>
        </div>
        <div className="cook-Qna">
          <img src={process.env.PUBLIC_URL + `/image/samie4.png`} alt="새미이미지" />
          <div className="cook-qna">
            <ul className="cook-qbox">
              <li>요리에 대한 모든 고민</li>
              <li>고민이 있으세요? 지금 고민을 남기고 함께 해결방안을 찾아봐요!</li>
            </ul>
            <Link to="/login">
              작성하기
              <img src={process.env.PUBLIC_URL + `/image/ic_write.png`} alt="연필그림" />
            </Link>
          </div>
        </div>

        {
          // 1. 리스트 모드일 경우 리스트 출력하기
          mode == "L" && (
            <ListMode
              bindList={bindList}
              totalCount={totalCount}
              unitSize={unitSize}
              pageNum={pageNum}
              setPageNum={setPageNum}
              pgPgNum={pgPgNum}
              pgPgSize={pgPgSize}
            />
          )
        }
        {
          // 2. 읽기 모드일 경우 상세보기 출력하기
          mode == "R" && <ReadMode selRecord={selRecord} sts={sts} />
        }
        {
          // 3. 쓰기 모드일 경우 로그인 정보 보내기
          // sts값은 문자열이므로 파싱하여 객체로 보냄
          mode == "W" && <WriteMode sts={JSON.parse(sts)} />
        }
        {
          // 4.  수정 모드일 경우 상세보기 출력하기
          // sts값은 문자열이므로 파싱하여 객체로 보냄
          mode == "M" && <ModifyMode selRecord={selRecord} />
        }
        <br />
        {/* 모드별 버튼 출력 박스 */}
        <table className="dtbl btngrp">
          <tbody>
            <tr>
              <td>
                {
                  // 1. 글쓰기 버튼은 로그인상태이고 L이면 출력
                  mode == "L" && sts && <button onClick={clickButton}>글쓰기</button>
                }
                {
                  // 2. 읽기 상태일 경우
                  <>
                    {mode == "R" && <button onClick={clickButton}>목록</button>}
                    {/* { console.log("비교:",JSON.parse(sts).uid, "==?" , selRecord.current.uid)} */}

                    {
                      //로그인한 상태이고 글쓴이와 일치할 때 수정모드 이동 버튼이 노출됨
                      // 현재글은 selRecord 참조변수에 저장됨
                      // 글정보 항목 중 uid가 사용자 아이디임
                      // 로그인 상태 정보하위의 sts.uid와 비교함
                      mode == "R" && sts && JSON.parse(sts).uid == selRecord.current.uid && (
                        <button onClick={clickButton}>수정</button>
                      )
                    }
                  </>
                }
                {
                  // 3. 쓰기 상태일 경우
                  mode == "W" && (
                    <>
                      <button onClick={clickButton}>제출</button>
                      <button onClick={clickButton}>목록</button>
                    </>
                  )
                }
                {
                  // 4. 수정 상태일 경우
                  mode == "M" && (
                    <>
                      <button onClick={clickButton}>제출</button>
                      <button onClick={clickButton}>삭제</button>
                      <button onClick={clickButton}>목록</button>
                    </>
                  )
                }
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
} ////////////  Cook함수 ////////

/**********************************************************
                리스트 모드 서브 컴포넌트  
 **********************************************************/

const ListMode = ({ bindList, totalCount, unitSize, pageNum, setPageNum, pgPgNum, pgPgSize }) => {
  return (
    <>
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
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>{bindList()}</tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="paging">
                {
                  <PagingList
                    totalCount={totalCount}
                    unitSize={unitSize}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    pgPgNum={pgPgNum}
                    pgPgSize={pgPgSize}
                  />
                }
              </td>
            </tr>
          </tfoot>
        </table>
        <br />
        <table className="dtbl btngrp">
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}; ////// ListMode //////////////////////////

/**********************************************************
                읽기 모드 서브 컴포넌트  
 **********************************************************/
const ReadMode = ({ selRecord, sts }) => {
  const data = selRecord.current;

  // 1. 없으면 세션스 만들기
  if (!sessionStorage.getItem("bd-rec")) {
    sessionStorage.setItem("bd-rec", "[]");
  }

  // 2. 세션스에 글번호 저장하기

  // (1) 세션스 파싱하여 변수할당
  let rec = JSON.parse(sessionStorage.getItem("bd-rec"));

  // (2) 기존 배열값에 현재글번호 존재여부 검사하기
  // 결과가 true면 조회수를 증가하지 않는다
  let isRec = rec.includes(data.idx);

  // (3) 로그인한 사용자의 글이면 isRec값을 true처리
  // sts가 true면 즉, 로그인한 사용하지면 처리
  if (sts) {
    console.log("선택글 아이디 : ", data.uid, "로그인 사용자 아이디:", JSON.parse(sts).uid);
    // 글쓴이 아이디와 로그인 사용자 아이디가 같은가?
    if (data.uid == JSON.parse(sts).uid) {
      // 글번호 저장과 조회수 증가를 하지 않도록 isRec값을 true로 변경한다
      isRec = true;
    } // if ///
  } //// if ///

  // (4) 배열에 값 추가하기 : 기존값에 없으면 넣기
  if (!isRec) rec.push(data.idx);

  // (5) 다시 세션스에 저장하기
  sessionStorage.setItem("bd-rec", JSON.stringify(rec));

  // 3. 글번호 증가하기
  // -> 게시판 원본 데이터에 조회수 업데이트하기
  if (!isRec) {
    // (1) 게시판 로컬스 데이터 파싱
    let bdData = JSON.parse(localStorage.getItem("board-data"));
    // (2) 게시판 해당 데이터 cnt값 증가
    // 조건 : isRec값이 false일때
    bdData.some((v) => {
      if (v.idx == data.idx) {
        // 기존값에 1증가하여 넣기
        v.cnt = Number(v.cnt) + 1;
        return true;
      } ///// if /////
    }); ////////// some /////////

    // (3) 다시 로컬스에 저장하기
    localStorage.setItem("board-data", JSON.stringify(bdData));
  } ///// if : (!isRec) ////

  return (
    <>
      <table className="dtblview readone">
        <caption>읽기모드</caption>
        <tbody>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" className="name" size="20" readOnly value={data.unm} />
            </td>
          </tr>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" className="subject" size="60" readOnly value={data.tit} />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea
                className="content"
                cols="60"
                rows="10"
                readOnly
                value={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>첨부파일</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ////// ReadMode //////////////////////////

/**********************************************************
      쓰기 모드 서브 컴포넌트  
**********************************************************/
const WriteMode = ({ sts }) => {
  // sts : 로그인 상태정보
  // 로그인한 사람만 글쓰기 가능
  // console.log(sts);

  return (
    <>
      <table className="dtblview readone">
        <caption>글쓰기</caption>
        <tbody>
          <tr>
            <td>작성자</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                // 로그인 한 사람 이름
                value={sts.unm}
              />
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>
              <input
                type="text"
                className="email"
                size="40"
                readOnly
                // 로그인 한 사람 이메일
                value={sts.eml}
              />
            </td>
          </tr>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" className="subject" size="60" />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea className="content" cols="60" rows="10"></textarea>
            </td>
          </tr>
          <tr>
            <td>첨부파일</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ////// WriteMode //////////////////////////

/**********************************************************
         수정 모드 서브 컴포넌트  
**********************************************************/
const ModifyMode = ({ selRecord }) => {
  // 수정모드가 호출되었다는 것은 리스트의 제목이 클릭되었다는 것을 의미
  // 따라서 현재 레코드 값도 저장되었다는 의미

  // console.log("전달된 참조변수:", selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  return (
    <>
      <table className="dtblview readone">
        <caption>수정모드</caption>
        <tbody>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" className="name" size="20" readOnly value={data.unm} />
            </td>
          </tr>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" className="subject" size="60" defaultValue={data.tit} />
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <textarea className="content" cols="60" rows="10" defaultValue={data.cont}></textarea>
            </td>
          </tr>
          <tr>
            <td>첨부파일</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ////// ModifyMode //////////////////////////

/********************************************************
   *  PagingList : 페이징 기능 컴포넌트 
  
********************************************************/
const PagingList = ({ totalCount, unitSize, pageNum, setPageNum, pgPgNum, pgPgSize  }) => {
  /********************************************** 
      [ 전달변수 ]
      1. totalCount : 전체 레코드 개수
      2. unitSize : 게시판 리스트 당 레코드 개수
      3. pageNum : 현재 페이지 번호 
      4. setPageNum : 현재 페이지번호 변경 메소드
  ***********************************************/

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

  let pgPgCount = Math.floor(pagingCount / pgPgSize);

  // 페이징 개수를 페이징의 페이징 단위수로 나눈
  // 나머지가 있으면 다음 페이징의 번호가 필요함
  // 나머지가 0이 아니면 1더하기
  if (pagingCount % pgPgSize > 0) {
    pgPgCount++;
  } /// if

  console.log("페이징의 페이징 개수:", pgPgCount);

  // (2) 리스트 시작값 / 한계값 구하기
  // 시작값 : (페페넘-1)*페페단
  let initNum = (pgPgNum.current - 1) * pgPgSize;
  // 한계값 : 페페넘*페페단
  let limitNum = pgPgNum.current * pgPgSize;

  console.log("시작값:", initNum, "/한계값:", limitNum);


  ////////////////////// [링크코드 만들기] /////////////////////////
  const pgCode = [];

  // 1부터 페이지 끝번호까지 돌면서 코드만들기
  for (let i = initNum; i < limitNum; i++) {
    // 전체 페이징 번호를 만드는 i가
    // 페이징 전체개수보다 클 경우 나가야함
    if (i >= pagingCount) break;

    pgCode.push(
      <Fragment key={i}>
        {
          // 페이징번호와 현재페이지번호 일치시 b요소
          i + 1 === pageNum - 1 ? (
            <b>{i + 1}</b>
          ) : (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPageNum(i + 1);
              }}
            >
              {i + 1}
            </a>
          )
        }
        {/* 사이에 바 넣기 */}
        {i + 1 !== limitNum && i + 1 < pagingCount && " | "}
      </Fragment>
    );
  } ///// [1] for : 페이징 리스트 출력 끝 /////

  {
    // [2] 페이징 이전블록 이동 버튼 만들기
    // 기준 : 1페이지가 아니면 보여라
    // 배열 맨앞추가는 unshift()
    pgCode.unshift(
      pgPgNum.current === 1 ? (
        ""
      ) : (
        // for문으로 만든 리스트에 추가하는 것이므로 key값이 있어야함
        // 단, 중복되면 안됨. 중복안되는 수인 마이너스로 세팅한다
        <Fragment key={-1}>
          &nbsp;&nbsp;
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(-1, false);
            }}
            title="move previous end"
            style={{ marginLeft: "10px" }}
          >
            «
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(-1, true);
            }}
            title="move previous"
            style={{ marginLeft: "10px" }}
          >
            ◀
          </a>
          &nbsp;&nbsp;
        </Fragment>
      )
    );
  }
  {
    // [3] 페이징 다음블록 이동 버튼 만들기
    // 기준 : 끝페이지가 아니면 보여라
    // 배열 맨뒷추가는 push()
    pgCode.push(
      pgPgNum.current === pgPgCount ? (
        ""
      ) : (
        // for문으로 만든 리스트에 추가하는 것이므로 key값이 있어야함
        // 단, 중복되면 안됨. 중복안되는 수인 마이너스로 세팅한다
        <Fragment key={-2}>
          &nbsp;&nbsp;
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(1, true);
            }}
            title="move next"
            style={{ marginLeft: "10px" }}
          >
            ▶
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goPaging(1, false);
            }}
            title="move next end"
            style={{ marginLeft: "10px" }}
          >
            »
          </a>
          &nbsp;&nbsp;
        </Fragment>
      )
    );
  }

  // [블록이동함수] //
  const goPaging = (dir, opt) => {
    // dir - 이동방향(오른쪽: +1, 왼쪽: -1)
    // opt - 일반이동(true), 끝이동(false)
    console.log("방향:", dir, "/옵션:", opt);

    // 새 페이징의 페이징 번호
    let newPgPgNum;
    // 1. opt 옵션에 따라 페이징의 페이징 이동 번호 만들기
    // (1) 일반 페이징 이동은 현재 페이징 번호에 증감
    if (opt) newPgPgNum = pgPgNum.current + dir;
    // (2) 끝 페이징이동은 오른쪽(1)일 경우 맨 끝 페이징번호로 이동(pgPgCount)
    // 왼쪽(-1)일 경우 맨앞 페이징번호로 이동(1)
    else newPgPgNum = dir == 1 ? pgPgCount : 1;

    // 2. 페이징의 페이징 번호 업데이트하기
    pgPgNum.current = newPgPgNum;

    // 3. 새로운 페이지의 페이징 구역의 페이지 번호 업데이트하기
    // 첫번째 페이지번호 업데이트하기
    // -> 항상 이전 블록 수의 마지막 번호 +1이 다음 페이지 첫번호
    // 이동할 페이지 번호
    let landingPage = (pgPgNum.current - 1) * pgPgSize + 1;
    console.log("도착페이지번호:", landingPage);
    // 페이지번호 상태변수 업데이트로 전체 리랜더링
    setPageNum(landingPage);
  }; //////// goPaging ///////////////
  // 코드 리턴
  return pgCode;
}; ///// pagingList 함수 //////////////
