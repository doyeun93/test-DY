// 요리해요 페이지 컴포넌트 ///

import { Link } from "react-router-dom";
import { Fragment, useRef, useState } from "react";
import cooData from "../data/cook_board.json";

import "../../css/cookcook.scss";
import "../../css/board_file.scss";



export default function CookCook(){
    const [pageNum, setPageNum] = useState(1);

    const totalCount = useRef(cooData.length);
    
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
  
      console.log("일부데이터:", selData);
  
      return selData.map((v, i) => (
        <tr key={i}>
          {/* 시작번호(i+1)를 더하여 페이지별 순번을 변경 */}
          <td>{i + 1 + sNum}</td>
          <td>
            <a href="#" data-idx="51">
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
      console.log("페이징개수:", pagingCount, "나머지개수:", totalCount.current % unitSize);
  
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

    //// 코드 리턴 구역
    return(
        <>
            <section className="cookcook-top">
                <div className="cookcook-title">
                    <span>요리해요</span>
                </div>
                <div className="cookcook-text">
                    <ul>
                        <li>
                            <Link to="/cookcook">요리해요</Link>
                        </li>
                        <li>
                            <Link to="/cookqna">질문있어요</Link>
                        </li>
                    </ul>
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


