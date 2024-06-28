import React from 'react';
import Searching from '../modules/Searching';

import { useLocation } from 'react-router-dom';

function SearchPage() {
    const loc = useLocation();

    let keyword = loc.state.keyword;


    return (
        <>
             <h1 className='tit'>
                Search Result
            </h1>
            <Searching kword={keyword} />
        </>
    );
}

export default SearchPage;