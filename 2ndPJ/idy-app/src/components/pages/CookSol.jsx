import React, { useState } from "react";

import "../../css/cooksol.scss";
import { solutionData } from "../data/sub2_2";
import { Link } from "react-router-dom";

export default function CookSol() {
    // 정렬
  const [sort, setSort] = useState("asc");

  if (sort == "asc") {
    solutionData.sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0));
  } else if (sort == "desc") {
    solutionData.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0));
  }


  // 코드 리턴 구역
  return (
    <>
      <section className="cooksol-top">
        <div className="cooksol-title">
          <span>솔루션</span>
        </div>
        <div className="cooksol-text">
          <ul>
            <li>
              <Link to="/cooklab">레시피</Link>
            </li>
            <li className="on">
              <Link to="/cooksol">솔루션</Link>
            </li>
          </ul>
        </div>
        <div className="sol-sort">
          <aside className="ssortbx">
            <select
              name="ssel"
              id="ssel"
              className="ssel"
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
        <div className="sol-mid">
          <ul>
            {solutionData.map((v, i) => (
              <li key={i}>
                <div className="sol-imgbox">
                  <img src={`./image/sub2/${v.imgName}.jpg`} alt={v.title} />
                  <div className="sol-info">
                    <p>{v.type1}</p>
                    <p>{v.type2}</p>
                  </div>
                </div>
                <span>{v.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
