import React from 'react';
import "../../css/cooklab_detail.scss";
import $ from "jquery";
import {dCon} from "../modules/dCon";

import { useLocation } from "react-router-dom";

function LabDetail() {
    const loc = useLocation();
    const imgName = loc.state.imgName;
    const title = loc.state.title;
    const text = loc.state.text;
    const type = loc.state.type;
    

    return (
        <>
            {/* 레시피 상세정보 박스 */}
            <div className="lab-detail">
                {/* 레시피 상세정보 제목 */}
                <div className="ldetail-top">
                    <h2>레시피</h2>
                    <span>{title}</span>
                </div>
                {/* 레시피 상세정보 소제목 */}
                <div className="ldetail-tit">
                    {
                        text.split("*").map((v,i)=>(
                            <p key={i}>{v}</p>
                        ))
                    }
                </div>
                {/* 레시피 상세정보 이미지 */}
                <div className="ldetail-pic">
                    {imgName}
                </div>
                {/* 레시피 상세정보 재료 */}
                <div className="ldetail-txt">
                    <div className="ldetail-txt1">
                        {/* type1,2,3 들어감 */}
                        <ul> 
                            <li>{type}</li>
                            <li>{type}</li>
                            <li>{type}</li>
                        </ul>
                    </div>
                    <div className="ldetail-txt2">
                        {/* li에 type4,5,6 들어감 */}
                        <ul> 
                            <li>{type}</li>
                        </ul>
                    </div>
                </div>
                {/* 레시피 상세정보 레시피 이미지 3개*/}
                <div className="ldetail-img">

                </div>
                {/* 레시피 상세정보 레시피 순서 */}
                <div className="ldetail-seq">
                    {/* type7,8,9 들어감 */}
                </div>
            </div>
        </>
    );
}

export default LabDetail;