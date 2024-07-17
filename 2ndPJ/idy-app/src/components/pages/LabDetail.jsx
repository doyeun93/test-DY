import React from 'react';

import { useLocation } from "react-router-dom";

function LabDetail(props) {
    const loc = useLocation();
    const title = loc.state.title;
    const text = loc.state.text;
    const type = loc.state.type;

    return (
        <div>
            
        </div>
    );
}

export default LabDetail;