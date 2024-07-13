import React from 'react';

import "../../css/intro.scss";



function Intro(props) {
    return (
        <>
        <section className="intro-top">
           <div className="intro-tit">
            <h1>즐거운 요리 혁명, 새미네 부엌</h1>
           </div>
           <div className="intro-header">
            <div className="intro-title">
                <div className="intro-text1">
                    <span>즐거운 요리 혁명</span> 
                    <p>우리맛연구를 통해</p>  
                    <p>요리의 어려움을</p>  
                    <p>즐거움으로 바꾸는</p>  
                    <p>요리혁명을 시작합니다.</p>  
                </div>
                <div className="intro-text2">
                    <span>요리가 놀이다</span>
                    <p>새미네부엌에서는</p>
                    <p>요리가 놀이가 되고,</p>
                    <p>부엌이 놀이터가 됩니다.</p>
                </div>
                <div className="intro-text3">
                    <span>우리맛 연구</span>
                    <p>재료 준비와 조리법을 쉽게,</p>
                    <p>만드는 과정은 즐겁게,</p>
                    <p>누가 만들어도 맛있게</p>
                    <p>먹을 수 있도록 연구했습니다.</p>
                </div>
            </div>
           </div>
           <nav className="intro-mid"></nav>
        </section>    
        </>
    );
}

export default Intro;