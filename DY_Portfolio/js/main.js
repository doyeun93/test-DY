
// 1. 전역변수 설정하기
let pgNum = 0;

let stsWheel = false;

const elePage = document.querySelectorAll('.page');

const totalCnt = elePage.length;


// 2. 이벤트 등록하기 ////////////
window.addEventListener('wheel',wheelFn,{passive:false});

setTimeout(() => {
    window.scrollTo(0,0);
}, 500);


//////////////// 3. 함수 구현하기 ///////////////////////

function wheelFn(e){ 
    e.preventDefault();
    // -> passive:false 설정해야함 (윈도우라서)
    //// 2. 광 휠 금지 장치
    if(stsWheel) return; 
    stsWheel = true; 
    setTimeout(() => {
        stsWheel = false; 
    }, 500);

    // 3. 휠 방향 알아내기
    let delta = e.wheelDelta;

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


// 스킬 영역
const skill = document.querySelector(".pg2");

let hcode = "<ul>";

for (let i = 1; i <= 5; i++){
    hcode += `
    <li>
        <img src="./images/skill/s${i}.png"
        alt="스킬로고이미지">    
    </li>
    `;
}

hcode += "</ul>";

skill.innerHTML = hcode;




