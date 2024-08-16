import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { gnbData } from "../data/gnb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../css/top_area.scss";

import $ from "jquery";
import { ShowMenu } from "../modules/Showmenu";


export const TopArea = memo(({loginMsg,loginSts,logoutFn,goPage}) =>{
  const goNav = useNavigate();

  // 햄버거버튼
  const showMenuFn = () => {
    $(".hbox").css({left:"0"});
  };

  // 검색창 보이기 함수
  const showSearch = (e) => {
    e.preventDefault();
    $(".searchingGnb").show();
    $("#schinGnb").focus();
  }; /////// showSearch /////////////////////////////////


  //  검색창 숨기기 함수
  const hideSearch = (e) => {
    e.preventDefault();
    $(".searchingGnb").hide();
  }

  const enterKey = (e) => {
    console.log(e.key, e.keyCode);
    if (e.key == "Enter") {
      let txt = $(e.target).val().trim();
      console.log(txt);

      if (txt != "") {
        $(e.target).val("").parent().hide();
        goSearch(txt);
      }
    } // if
  }; /////// enterKey ///////////////////

  const goSearch = (txt) => {
    goNav("search", { state: { keyword: txt } });
  }; /////////////// goSearch //////////

  return (
    <>
      <section id="top-area">
        <header className="topbox">
          <a className="logo" href="#">
            <img
              src={process.env.PUBLIC_URL + "/image/logo.jpg"}
              alt="로고이미지"
              onClick={(e) => {
                e.preventDefault();
                goNav("/");
              }}
            />
          </a>
          <div className="logmsg">{loginMsg}</div>
          <nav id="gnb">
            <ul className="top-gnb">
              {gnbData.map((v, i) => (
                <li key={i}>
                  {v.sub ? <a href="#">{v.txt}</a> : <Link to={v.link}>{v.txt}</Link>}
                  {v.sub && (
                    <ul className="bt-gnb">
                      {v.sub.map((v, i) => (
                        <li key={i}>
                          <Link to={v.link}>{v.txt}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <button
              className="ham"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                showMenuFn();
              }}
            ></button>
          </nav>
          <div className="log">
            <ul>
              {loginSts === null && (
                <>
                  <li>
                    <Link to="/member">회원가입</Link>
                  </li>
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                </>
              )}
              {
                /* 로그인 상태면 로그아웃버튼 보임 */
                loginSts !== null && (
                  <>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          // 로그아웃처리함수 호출
                          logoutFn();
                        }}
                      >
                        LOG OUT
                      </a>
                    </li>
                  </>
                )
              }
              <li style={{ color: "#15a775" }}>
                {/* 검색입력박스 */}
                <div className="searchingGnb">
                  {/* 검색버튼 돋보기 아이콘 */}
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="schbtnGnb"
                    title="Open search"
                    onClick={(e) => {
                      // 검색어 읽기
                      let stxt = e.currentTarget.nextElementSibling.value;
                      if (stxt.trim() != "") {
                        // 검색하기
                        goSearch(stxt);
                      } else {
                        // 검색어 비었을 때 메시지
                        alert("검색어를 입력하세요.");
                      }
                    }}
                  />
                  {/* 입력창 */}
                  <input
                    type="text"
                    name="schinGnb"
                    id="schinGnb"
                    placeholder="어떤 요리가 궁금하신가요?"
                    onKeyUp={enterKey}
                  />
                  <div className="schhbtn"
                  onClick={hideSearch}>✕</div>
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
      <ShowMenu />
    </>
  );
}
)

