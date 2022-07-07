import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Menu from './../features/Menu.jsx';
import Developer from './../features/Developer';



const Main = React.memo((props) => {
    
    return (
        <main>
            <Routes>
                <Route path="/" element={ <React.Suspense fallback={<></>}> <Menu { ...props } /> </React.Suspense> } />
                <Route path="/menu" element={ <React.Suspense fallback={<></>}> <Menu { ...props } /> </React.Suspense> } />
                <Route path="/developer" element={ <React.Suspense fallback={<></>}> <Developer { ...props } /> </React.Suspense> } />
            </Routes>
        </main>
    );
});

export default Main;
