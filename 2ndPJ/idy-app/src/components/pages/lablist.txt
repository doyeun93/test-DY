import React from "react";
import { lDetailData } from "../data/sub2_1_detail";
import { sDetailData } from "../data/sub2_2_detail";

function LabList({ viewDetail, updateIdx, selItem }) {
  const selData = selItem == "레시피" ? lDetailData : selItem == "솔루션" ? sDetailData : [];

  return (
    <ul>
      {selData.map((v, i) => (
        <li key={i}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              viewDetail(false);
              updateIdx(i);
            }}>
            <div className="lab-imgbox">
                {
                   selItem=="레시피"? <img src={`./image/sub2/${v.imgName}.jpg`} alt={v.title} /> :
                   selItem=="솔루션"? <img src={`./image/sub2/${v.imgName}.jpg`} alt={v.title} /> : []

                }
              <div className="lab-info">
                <p>{v.type1}</p>
                <p>{v.type2}</p>
              </div>
            </div>
            <span>{v.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default LabList;
