import React, { useState } from 'react';
import '../../css/popup.scss'; 

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="popup-example">
      <button onClick={togglePopup}>팝업 열기</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={togglePopup}>X</span>
            <h2>즐거운 요리 혁명, 새미네부엌</h2>
            <p>오늘 뭐 해 먹지? 어떻게 만들지? 맛있게 될까?</p>
            <p>스트레스 받지는 않으셨나요?</p>
            <p>새미네부엌은 새로운 조리법과 최적의 양념으로</p>
            <p>언제나 맛있는 요리를 쉽게 즐길 수 있도록 도와줍니다.</p>
            <p>새미네부엌이 함께하면 당신의 요리시간은 짧아지고 저녁시간은 길어집니다.</p>
            <p>새미네부엌은 75년간 우리맛을 연구해 온 노하우를 통해</p>
            <p>누구나 쉽고 맛있는 요리를 즐기도록 하겠다는 샘표의 꿈을 담았습니다.</p>
            <p>요리도 놀이가 되고, 부엌도 놀이터가 됩니다.</p>
            <p>즐거운 요리혁명</p>
            <p>새미네부엌</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
