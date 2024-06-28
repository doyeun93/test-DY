import React from 'react';
import { SwiperLab } from '../plugin/SwiperLab';

function mainlab(props) {
    return (
        <section className="lab-area">
            <div className="lab-text">
                <ul>
                    <li>요리연구소</li>
                    <li>
                        <a href="#">더보기 〉</a>
                    </li>
                </ul>
            </div>
            <SwiperLab />
        </section>
    
    );
}

export default mainlab;