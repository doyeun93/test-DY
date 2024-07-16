import React, { useEffect } from "react";

import { cookData } from "../data/cookarea";
import mainCookFn from "../func/maincook";

import "../../css/cookpic.scss";
import { Link } from "react-router-dom";

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
            <Link to = "/cookcook">
              <img src={process.env.PUBLIC_URL+`/image/${v.imgName}.jpg`} alt={v.title} />
            </Link>
              <span > {v.title} </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cookpic;
