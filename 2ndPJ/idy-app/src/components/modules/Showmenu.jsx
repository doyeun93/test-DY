import React, { useState } from 'react';
import "../../css/tt.scss";

export function ShowMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hbox">
        <nav className={`hlist ${isOpen ? 'open' : ''}`}>
          <ul className="htit">
            <li onClick={toggleMenu}>요리초보가이드</li>
            <ul className="htext">
              <li onClick={toggleMenu}>레시피</li>
              <li onClick={toggleMenu}>솔루션</li>
            </ul>
            <ul className="htext">
              <li onClick={toggleMenu}>요리해요</li>
              <li onClick={toggleMenu}>질문있어요</li>
            </ul>
            <li onClick={toggleMenu}>WOW이벤트</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
