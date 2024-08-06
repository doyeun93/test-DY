


// 1. 전역변수 설정하기
// 1-1. 페이지변수
let pgNum = 0;
// 1-2. 휠 상태변수(true는 막기 , false는 통과)
let stsWheel = false;
// 1-3. .page클래스 요소
const elePage = document.querySelectorAll('.page');
// 1-4. 전체페이지수
const totalCnt = elePage.length;
console.log('대상:', elePage, totalCnt,'개');



// 2. 이벤트 등록하기 ////////////
window.addEventListener('wheel',wheelFn,{passive:false});


// [새로 고침시 스크롤바 위치 인덱싱이 되므로 맨 위로 강제 이동하기 설정]
// scrollTo(x축이동,y축이동)
setTimeout(() => {
    window.scrollTo(0,0);
}, 500);


//////////////// 3. 함수 구현하기 ///////////////////////


function wheelFn(e){ // 이벤트전달변수(자동)
    // 함수호출확인!
    console.log('휠~~~!');

    // 1. 우리는 휠 기본 기능을 막고 자동으로 스크롤을 하나씩 되게 할 것
    
    e.preventDefault();
    // -> passive:false 설정해야함 (윈도우라서)
    
    //// 2. 광 휠 금지 장치
    if(stsWheel) return; // 돌아가
    stsWheel = true;  // 잠금
    setTimeout(() => {
        stsWheel = false; // 잠금해제
    }, 500);


    // 3. 휠 방향 알아내기
    let delta = e.wheelDelta;
    // 휠 델타는 이벤트 객체에서 리턴해주는 방향, 이동거리 등의 정보값 
   
    // -> 마이너스가 아랫방향

    // 4. 방향별 분기하기
    if(delta<0){
        // 아래페이지로 가야하니까 페이지번호 증가
        pgNum++;
        // 한계수 체크(끝번호 고정)
        if(pgNum === totalCnt) { pgNum = totalCnt -1;
            // 마지막 페이지 순번은 전체개수 - 1
        }
    } // if////
    else{
        // 반대는 윗방향이니까 페이지번호 감소
        pgNum--;
        // 한계수 체크(0보다 작으면 고정)
        if(pgNum < 0){
            pgNum = 0;
        }
    } // else //////
    console.log('pgNum: ', pgNum);


    // 5. 페이지 이동하기
    // 5-1. 이동할 위치알아내기 -> .page 요소중 해당 순번페이지 위치
    let pos = elePage[pgNum].offsetTop;
    // offsetTop : 최상단에서부터 거리

    // 5-2. 페이지 스크롤 위치 이동하기
    // scrollTo(0, y축 이동값)
    window.scrollTo(0, pos); 

    // 6. 해당 메뉴 순번 on 넣기 , 나머지 on빼기
    chgMenu(pgNum);
   
   
  

} /////////// wheelFn 함수 ////////////////
///////////////////////////////////////////





const gnb = document.querySelectorAll(".gnb a");

const indic = document.querySelectorAll(".indic a");


// 이벤트 설정하기 + 기능 구현하기
 gnb.forEach((ele,idx) =>{
    ele.onclick = () =>{
        chgMenu(idx);
    }; /// click 함수

}); /////// foreach ////////



indic.forEach((ele,idx)=>{
    ele.onclick = () =>{
        chgMenu(idx);
    }; /// click 함수

}); /////// foreach ////////




//// [메뉴 변경함수 : .gnb + .indic] ///////////
function chgMenu(idx){ 

        // 1. 전역페이지변수에 순번 업데이트
        pgNum = idx;
        // 2. 전체 메뉴에 on빼기
        gnb.forEach((ele,seq)=>{
            // ele - a요소 , seq - 순번
            if(idx === seq){
                // 선택순번과 같으면 on 넣기
                ele.parentElement.classList.add('on');
                indic[seq].parentElement.classList.add('on');
                       

            } ///////////// if //////////
            else{ ///// 기타의 경우 on 지우기
                ele.parentElement.classList.remove('on');
                indic[seq].parentElement.classList.remove('on');

            }/////////////else //////////////
    
        });  //// foreach //////////////////

       
} /// chgMenu 함수 ///////////

