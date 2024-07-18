// 요리연구소 페이지 컴포넌트 ///

import { useState } from "react";
import "../../css/cooklab.scss";
import { rDetailData } from "../data/sub2_1_detail";
import { Link } from "react-router-dom";
import $ from "jquery";
// import LabList from "./LabList";
// import LabDetail from "./LabDetail";

export default function CookLab() {
  // 정렬
  const [sort, setSort] = useState("asc");

  if (sort == "asc") {
    rDetailData.sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0));
  } else if (sort == "desc") {
    rDetailData.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0));
  }

  const [lbar, setLbar] = useState(false);

  const labBar = () => {
    setLbar(!lbar);
  };

  // 상세페이지
  const [tot, setTot] = useState(rDetailData[0]);
  // const [ viewList, setViewList] = useState(true);

  // // 2. 상품 데이터 인덱스값 상태관리 변수
  // const [idx, setIdx] = useState(0);

  // // 3. 선택 아이템 고유 이름 상태관리 변수
  // const [selItem, setSelItem] = useState("레시피");


  //// 코드 리턴 구역
  return (
    <>
      <section className="cooklab-top">
        <div className="cooklab-title">
          <span>레시피</span>
        </div>
        <div className="cooklab-text">
          <ul>
            <li className="on">{labBar && <Link to="/cooklab">레시피</Link>}</li>
            <li>{labBar && <Link to="/cooksol">솔루션</Link>}</li>
          </ul>
        </div>
        <div className="lab-sort">
          <aside className="lsortbx">
            <select
              name="lsel"
              id="lsel"
              className="lsel"
              // 값을 변경할 때 이벤트 발생
              onChange={(e) => {
                // 정렬기준 상태변수 업데이트
                setSort(e.target.value);
              }}
            >
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </aside>
        </div>
        <div className="lab-mid">
          {/* {viewList? <LabList viewDetail={setViewList} updateIdx={setIdx} selItem={selItem}/>:<LabDetail backList={setViewList} gNo={idx} selItem={selItem}/>} */}
          <ul>
            {rDetailData.map((v, i) => (
              <li key={i}>
                <div className="lab-imgbox">
                  <img src={`./image/sub2/${v.imgName}.jpg`} alt={v.title} />
                  <div className="lab-info">
                    <p>{v.type2}</p>
                    <p>{v.type3}</p>
                  </div>
                </div>
                <Link to="/detail">
                  <span>{v.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* 레시피 상세정보 */}
    </>
  );
} ////////////  Lab함수 ////////
