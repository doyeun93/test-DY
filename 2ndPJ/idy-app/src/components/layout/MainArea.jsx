import React from 'react';
import {Outlet} from 'react-router-dom';


function MainArea(props) {
    return (
        <main id="main-area"> 
            <Outlet /> 
        </main>
    );
}

export default MainArea;