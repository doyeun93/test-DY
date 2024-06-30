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
            <h2>팝업 제목</h2>
            <p>팝업 내용을 여기에 작성합니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
