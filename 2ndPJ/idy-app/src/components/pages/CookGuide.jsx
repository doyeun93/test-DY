// 요리초보가이드 페이지 컴포넌트 ///
import { useState } from "react";
import "../../css/cookguide.scss";
import { guideData } from "../data/sub1";


export default function CookGuide() {

  
  // 정렬
  const [sort, setSort] = useState("asc");

  if (sort == "asc"){
    guideData.sort((a,b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0));
  }
  else if (sort == "desc"){
    guideData.sort((a,b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0));
  }

  //// 코드 리턴 구역
  return (
    <>
      <section className="guide-top">
        <div className="guide-title">
            <span>요리초보가이드</span>
        </div>
        <div className="guide-sort">
        <aside className="gsortbx">
            <select
              name="gsel"
              id="gsel"
              className="gsel"
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
        <div className="guide-mid">
            <ul>
                {guideData.map((v,i) =>(
                    <li key={i} >
                        <div className="guide-imgbox" >
                            <img src={`./image/sub1/${v.imgName}.jpg`} alt={v.title} />
                            <div className="guide-info">
                              <p>{v.text1}</p>
                              <p>{v.text2}</p>
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
} ////////////  Guide함수 ////////
