

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




/////// 프로젝트 영역 //////////
const qsEl = (el, x) => el.querySelector(x);
const qsaEl = (el, x) => el.querySelectorAll(x);
const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);
  


const pbox = document.querySelector(".proj1");

let pcode = "<ul>";


{/* <a href="https://doyeun93.github.io/IDY-PJ-LIVE/main.html"> */}
for(let i=1; i<=7; i++) {
    pcode += `
        <li>
            <a href="./project1.html">
                <img src="./images/project/p1_${i}.png" 
                alt="갤러리이미지">
            </a>
        </li>
    `;
} ///// for /////

pcode += "</ul>";

pbox.innerHTML = pcode;

let target = qsEl(pbox,'ul');


const pbox1 = document.querySelector(".proj2");

// 기준값 업데이트 함수 : 윈도우 가로폭의 1/4 => li 하나 크기
// window.innerWidth/4
const updateCriteria = () => qsaEl(target,"li")[0].offsetWidth;

// 기준값(대상 li의 가로크기값)
let criteria = updateCriteria();

// 리사이즈시 업데이트
addEvt(window,"resize",
    ()=> {criteria = updateCriteria();  
});

// 현재 translate 값
let currVal = 0;


function moveGallery(){
    // 현재값 1씩 감소

    target.style.translate = --currVal + "px";

    if(currVal <= Math.floor(-criteria)){
        // 1. 맨앞 li 맨뒤로 이동 /  appendChild(맨앞 li)
        // 맨 앞 li는 새로 구해와야함(계속 변경되기때문에)
        target.appendChild(qsaEl(target,"li")[0]);

        // 2. translate 값 초기화
        target.style.translate =  "0px";

        // 3. 하나 크기만큼 나가면 currVal값 초기화
        currVal = 0;

    } ///////////////// if 문 /////////
    
    // 타임아웃함수로 호출
    // stopSts 변수값이 false일 때만 실행하기
    if(!stopSts)
    setTimeout(moveGallery,10);

} //////// moveGallery ///////////////



// 멈춤상태 변수
let stopSts = false;

addEvt(pbox,"mouseenter",()=>{
    //  멈춤상태변수 true변경
    stopSts = true;
});

addEvt(pbox,"mouseleave",()=>{
    //  멈춤상태변수 false 변경
    stopSts = false;
    // 재귀호출함수 호출하기
    moveGallery();
});





