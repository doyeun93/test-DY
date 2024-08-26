
import React from "react";


import "../../css/searching.scss";

// 라우터돔 Link
import { Link } from "react-router-dom";

function SearchingData({ dt }) {
  // dt - 검색된 배열데이터

  // total - 검색된 배열데이터 개수
  const total = dt.length;
  

  // 경로를 맞추기 위해 배열에 이미지명 앞3글자가 있는지 검사함!
  const route = { sub: "sub1", re_: "sub2", sol: "sub2", coo: "sub3" };
  



  return (
    <>
      {
        // 데이터 개수가 0이 아닐때 출력
        total > 0 && (
          <ul className="clist">
            {dt.map((v, i) => (
              <li key={i}> 
                <Link
                  to={
                    route[v.imgName.substr(0, 3)] == "sub1" ||
                    route[v.imgName.substr(0, 3)] == "sub3"
                      ? "/"
                      : "/detail"
                  }
                  /* state로 3가지 값을 넘겨준다! */
                  state={v}
                >
                 <img
                    src={process.env.PUBLIC_URL+`/image/${route[v.imgName.substr(0, 3)]}/${
                      v.imgName
                    }.jpg`} alt={v.imgName} />
                  <h3>{v.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )
      }
      {
        // 선택데이터가 0개이면 아래 출력
        total == 0 && (
          <h2> 입력하신 데이터가 없습니다.</h2>
        )
      }
    </>
  );
}

export default SearchingData;
