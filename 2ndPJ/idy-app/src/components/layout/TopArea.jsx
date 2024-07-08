import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { gnbData } from '../data/gnb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../css/top_area.scss";

import $ from 'jquery';
import { ShowMenu } from '../modules/Showmenu';


function TopArea(props) {

  const goNav = useNavigate();

  // 햄버거버튼
  const ShowMenu = (e) => {
    $(".ham").toggleClass("on");
      $(".hbox").show();
  }

   // 1. 검색창 보이기 함수
   const showSearch = (e) => {
    e.preventDefault();
    $(".searchingGnb").show();
    $("#schinGnb").focus();
  
  }; /////// showSearch /////////////////////////////////
 
  const enterKey = (e) => {
    console.log(e.key,e.keyCode);
    if(e.key == "Enter"){
      let txt = $(e.target).val().trim();
      console.log(txt);
      
      if(txt!=''){
       $(e.target).val("").parent().hide();
        goSearch(txt);
      }
    } // if

  }; /////// enterKey ///////////////////

  const goSearch = txt => {
    goNav("search",{state:{keyword:txt}})
  }; /////////////// goSearch //////////

    return (
        <section id="top-area">
          <header className="topbox">
              <a className="logo" href="#" >
              <img src={process.env.PUBLIC_URL+"/image/logo.jpg"} alt="로고이미지" 
                onClick={(e) => {e.preventDefault(); 
                goNav("/")}}/>
              </a>
            <nav id="gnb">
              <ul className="top-gnb">
                {gnbData.map((v,i)=>
                <li key={i}>
                  {
                    v.sub ? <a href="#">{v.txt}</a> : <Link to={v.link}>{v.txt}</Link>
                  }
                  {
                    v.sub && <ul className="bt-gnb">
                      {
                        v.sub.map((v,i)=>
                        <li key={i}>
                          <Link to={v.link}>{v.txt}</Link>
                        </li>)
                      }
                    </ul>
                  }
                </li>)}
              </ul>
              <button className="ham" type="button" onClick={ShowMenu}></button>
              {/* <ShowMenu /> */}
            </nav>
            <div className="log">
              <ul>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li style={{color:"#15a775"}}>
                {/* 검색입력박스 */}
                <div className="searchingGnb" >
                  {/* 검색버튼 돋보기 아이콘 */}
                  <FontAwesomeIcon icon={faSearch} className="schbtnGnb" title="Open search"
                   onClick={(e)=>{ 
                    // 검색어 읽기
                    let stxt = e.currentTarget.nextElementSibling.value;
                    if(stxt.trim()!=""){
                      // 검색하기
                      goSearch(stxt);
                    }
                    else{
                      // 검색어 비었을 때 메시지
                       alert("검색어를 입력하세요.");
                    }
                  }}/>
                  {/* 입력창 */}
                  <input type="text" name="schinGnb" id="schinGnb" placeholder="어떤 요리가 궁금하신가요?" onKeyUp={enterKey}/>
                </div>
                {/* 검색기능링크 - 클릭시 검색창 보이기 */}
                <a href="#" onClick={showSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </a>
            </li>
              </ul>
            </div>
          </header>
        </section>
    );
}

export default TopArea;