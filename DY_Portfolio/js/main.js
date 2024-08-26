

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




/////////// 프로젝트 영역 /////////////
const qsEl = (el, x) => el.querySelector(x);
const qsaEl = (el, x) => el.querySelectorAll(x);
const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);
  


const pbox1 = document.querySelector(".proj1");

let pcode1 = "<ul>";

for(let i=1; i<=7; i++) {
    pcode1 += `
        <li>
            <a href="./project1.html">
                <img src="./images/project/p1_${i}.png" 
                alt="갤러리이미지">
            </a>
        </li>
    `;
} ///// for /////

pcode1 += "</ul>";

pbox1.innerHTML = pcode1;

let target1 = qsEl(pbox1,'ul');



const pbox2 = document.querySelector(".proj2");

let pcode2 = "<ul>";
for(let i=1; i<=7; i++){
    pcode2 += `
        <li>
            <a href="./project2.html">
                <img src="./images/project/p2_${i}.png" 
                alt="갤러리이미지">
            </a>
        </li>
    `;
}
pcode2 += "</ul>";

pbox2.innerHTML = pcode2;

let target2 = qsEl(pbox2,'ul');



const pbox3 = document.querySelector(".proj3");

let pcode3 = "<ul>";
for(let i=1; i<=7; i++){
    pcode3 += `
        <li>
            <a href="./project3.html">
                <img src="./images/project/p3_${i}.png" 
                alt="갤러리이미지">
            </a>
        </li>
    `;
}
pcode3 += "</ul>";

pbox3.innerHTML = pcode3;

let target3 = qsEl(pbox3,'ul');



// 기준값 업데이트 함수 : 윈도우 가로폭의 1/4 => li 하나 크기
// window.innerWidth/4
const updateCriteria1 = () => qsaEl(target1,"li")[0].offsetWidth;
const updateCriteria2 = () => qsaEl(target2,"li")[0].offsetWidth;
const updateCriteria3 = () => qsaEl(target3,"li")[0].offsetWidth;

// 기준값(대상 li의 가로크기값)
let criteria1 = updateCriteria1();
let criteria2 = updateCriteria2();
let criteria3 = updateCriteria3();


// 리사이즈시 업데이트
addEvt(window,"resize", ()=> {
    criteria1 = updateCriteria1(); 
    criteria2 = updateCriteria2();  
    criteria3 = updateCriteria3();  
});

// 현재 translate 값
let currVal1 = 0;
let currVal2 = 0;
let currVal3 = 0;


function moveGallery1(){

    target1.style.translate = --currVal1 + "px";
    if(currVal1 <= Math.floor(-criteria1)){
        target1.appendChild(qsaEl(target1,"li")[0]);
        target1.style.translate =  "0px";
        currVal1 = 0;
    } ///////////////// if 문 /////////
    
    // 타임아웃함수로 호출
    // stopSts 변수값이 false일 때만 실행하기
    if(!stopSts)
    setTimeout(moveGallery1,6);
} //////// moveGallery1 ///////////////


function moveGallery2(){
    target2.style.translate = --currVal2 + "px";
    if(currVal2 <= Math.floor(-criteria2)){
        target2.appendChild(qsaEl(target2,"li")[0]);
        target2.style.translate =  "0px";
        currVal2 = 0;
    } ///////////////// if 문 /////////
    
    if(!stopSts)
    setTimeout(moveGallery2,10);
} //////// moveGallery2 ///////////////



function moveGallery3(){
    target3.style.translate = --currVal3 + "px";
    if(currVal3 <= Math.floor(-criteria3)){
        target3.appendChild(qsaEl(target3,"li")[0]);
        target3.style.translate =  "0px";
        currVal3 = 0;
    } ///////////////// if 문 /////////
    
    if(!stopSts)
    setTimeout(moveGallery3,14);
} //////// moveGallery3 ///////////////


// 멈춤상태 변수
let stopSts = false;

addEvt(pbox1,"mouseenter",()=>{
    //  멈춤상태변수 true변경
    stopSts = true;
});

addEvt(pbox1,"mouseleave",()=>{
    //  멈춤상태변수 false 변경
    stopSts = false;
    // 재귀호출함수 호출하기
    moveGallery1();
    moveGallery2();
    moveGallery3();
});





