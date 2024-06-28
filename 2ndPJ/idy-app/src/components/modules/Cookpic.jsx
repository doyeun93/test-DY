import React, { useEffect } from "react";

import { cookData } from "../data/cookarea";
import mainCookFn from "../func/maincook";

import "../../css/cookpic.scss";

console.log(cookData);

function Cookpic(props) {
  useEffect(() => {
    mainCookFn();
  }, []);

  return (
    <div className="cook-img">
      <ul >
        {cookData.map((v, i) => (
          <li key={i} >
            <a href="/cookcook">
              <img src={process.env.PUBLIC_URL+`/image/${v.imgName}.jpg`} alt={v.title} />
              <span > {v.title} </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cookpic;
