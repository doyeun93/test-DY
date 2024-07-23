import React, { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


import "../../css/searching.scss";

import { guideData } from "../data/sub1";
import { recipeData } from "../data/sub2_1";
import { solutionData } from "../data/sub2_2";
import { cookingData } from "../data/sub3";
import SearchingData from "./SearchingData";



function Searching({ kword }) {

  const [kw, setKw] = useState(kword);
  const [sort, setSort] = useState("asc");
  const [chk,setChk] = useState([true,true]);

  console.log(guideData);
  console.log(recipeData);
  // console.log([...guideData,...recipeData,...solutionData,...cookingData]);


  const selData = [...guideData,...recipeData,...solutionData,...cookingData];

  const beforeKword = useRef(kword);
  
  if (beforeKword.current != kword){
      setKw(kword);
      beforeKword.current = kword;
      document.querySelector("#schin").value = kword; 

  } /////////////// if ////////////


  const newList = selData.filter((v) => {
    let newVal = v.title.toLocaleLowerCase();

    let key = kw.toLocaleLowerCase();

    if(

      (newVal.indexOf(key)!== -1) 
      &&

      (
        (chk[0] ? v.kind == "레시피" : false) ||
        (chk[1] ? v.kind == "솔루션" : false) 
   
      )
      // true && (true || false || false)
      // -> &&문은 모두 true여야 true고 ||문은 하나만 true여도 true다

    ) return true;
  }); ////// filter /////////////////

  // [ 결과 내 재검색 : 데이터 항목 중 alignment값으로 검색함 ]

  // (1) 오름 차순일 경우
  if (sort == "asc") {
    newList.sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0));
  } //// if /////

  // (2) 내림 차순일 경우
  else if (sort == "desc") {
    newList.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0));
  } ///// else if ///////

  /// 코드 리턴 구역
  return (
    <>
      {/* 전체 검색모듈 코드 */}
      <section className="schbx">
        {/* 1. 옵션선택박스 */}
        <div className="schopt">
          {/* 1-1.검색박스 */}
          <div className="searching">
            {/* 검색버튼 돋보기 아이콘 */}
            <FontAwesomeIcon icon={faSearch} className="schbtn" title="Open search" />
            {/* 입력창 */}
            <input
              id="schin"
              type="text"
              placeholder="검색어를 입력해보세요."
              defaultValue={kword}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  // 1. 검색어 상태값 변경
                  setKw(e.target.value);

                  // 2. 처음 검색시 정렬은 기본 정렬 오름차순(asc)
                  setSort("asc");

                  // 정렬 선택 박스 선택 값 변경(DOM에서 보이기 변경)
                  document.querySelector("#sel").value = "asc";
                } //// if //////////
              }}
            />
          </div>
        </div>
        {/* 1-2. 체크박스구역 */}
        <div className="chkbx">
            <ul>
              <li>
                {/* 타이틀 */}
                <h2>
                  전체
                  <span className="spbtn">＋</span>
                </h2>
                {/* 체크박스리스트 */}
                <ol>
                  <li>
                    레시피
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="recipe" className="chkhdn" 
                    // 체크 박스 체크속성값을 훅(상태관리변수) 연결
                    checked={chk[0]}
                    // 체크 변경시 change 이벤트 발생
                    onChange = {(e)=>{
                      // 체크박스의 checked 속성은 체크시 ture, 불체크시 false 리턴
                      // console.log(e.target.checked);
                      // 훅값 업데이트
                      setChk([e.target.checked,chk[1]]);
                    }}/>
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="hero" className="chklb"></label>
                  </li>
                  <li>
                    솔루션
                    {/* 숨긴 체크박스 */}
                    <input type="checkbox" id="solution" className="chkhdn" 
                    // 체크 박스 체크속성값을 훅(상태관리변수) 연결
                    checked={chk[1]}
                     // 체크 변경시 change 이벤트 발생
                     onChange = {(e)=>{
                      // 체크박스의 checked 속성은 체크시 ture, 불체크시 false 리턴
                      // console.log(e.target.checked);
                      // 훅값 업데이트
                      setChk([e.target.checked,chk[0]]);
                    }}/>
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="comp" className="chklb"></label>
                  </li>
                </ol>
              </li>
            </ul>
          </div>

        {/* 2. 결과리스트박스 */}
        <div className="listbx">
          {/* 2-1. 결과 타이틀 */}
          <h2 className="restit">어떤 요리가 궁금하신가요?({newList.length})</h2>
          {/* 2-2. 정렬선택박스 */}
          <aside className="sortbx">
            <select
              name="sel"
              id="sel"
              className="sel"
              // 값을 변경할 때 이벤트 발생
              onChange={(e) => {
                console.log(e.target.value);
                // 정렬기준 상태변수 업데이트
                setSort(e.target.value);
              }}
            >
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </aside>
          {/* 2-3. 캐릭터 리스트 컴포넌트 : 
            데이터 상태변수 중 첫번째값만 보냄 */}
          <SearchingData dt={newList} />
        </div>
      </section>
    </>
  );
}

export default Searching;
