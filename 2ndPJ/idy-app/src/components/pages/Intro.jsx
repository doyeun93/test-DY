import React from 'react';

import "../../css/intro.scss";



function Intro(props) {
    return (
        <>
        <section className="intro-top">
           <div className="intro-tit">
            <h1>즐거운 요리 혁명, 새미네 부엌</h1>
           </div>
           <nav className="intro-header">
            <div className="intro-title">
                <div className="intro-text">
                    <span>즐거운 요리 혁명</span>   
                </div>
                <div className="intro-text">
                    <span>요리가 놀이다</span>
                </div>
                <div className="intro-text">
                    <span>우리맛 연구</span>
                </div>
            </div>
           </nav>
           <nav className="intro-mid"></nav>
        </section>    
        </>
    );
}

export default Intro;