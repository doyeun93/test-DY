import { lDetailData } from '../data/sub2_1_detail';
import "../../css/detail.scss";

import React from 'react';

function LabDetail() {
    
    const ldData = lDetailData;

    return (
        <section className="recipe-box">
            <div className="recipe-title">
                <span>레시피</span>
            </div>
            <div className="recipe-top">
                {ldData.map((v,i)=>(
                    <div className="recipe-tit" key={i}>
                        <h1>{v.title}</h1>
                        <div className="recipe-txt">
                            {v.text.split("*").map((v,i)=>(
                                <p key={i}>{v}</p>
                            ))}
                         </div>
                         <div className="recipe-img">
                            <img src={process.env.PUBLIC_URL + `/image/sub2/detail/${v.imgName}.jpg`} alt={v.imgName} />
                         </div>

                    </div>




                ))}
            </div>
            
        </section>
    );
}

export default LabDetail;