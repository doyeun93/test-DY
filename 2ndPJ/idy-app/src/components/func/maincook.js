import mFn from "../func/function";

export default function mainCookFn() {
  const gbox = mFn.qs(".cook-img");

  let target = mFn.qsEl(gbox, "ul");
  console.log(target);

  const updateCriteria = () => mFn.qsaEl(target, "li")[0].offsetWidth;

  let criteria = updateCriteria();

  mFn.addEvt(
    window,
    "resize",

    () => {
      criteria = updateCriteria();
    }
  );

  let currVal = 0;

  function moveGallery() {
    target.style.translate = --currVal + "px";

    if (currVal <= Math.floor(-criteria)) {
      target.appendChild(mFn.qsaEl(target, "li")[0]);

      target.style.translate = "0px";

      currVal = 0;
    } ///////////////// if 문 /////////

    if (!stopSts) setTimeout(moveGallery, 10);
  } //////// moveGallery ///////////////

  let stopSts = false;

  mFn.addEvt(gbox, "mouseenter", () => {
    stopSts = true;
  });

  mFn.addEvt(gbox, "mouseleave", () => {
    stopSts = false;

    moveGallery();
  });
} ////// mainCookFn함수 //////////
