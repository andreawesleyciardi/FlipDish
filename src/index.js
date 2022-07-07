import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);



(function() {
    window.onscroll = function () {
        var topnavbar = document.getElementById('topnavbar');
        if (document.body.scrollTop >= 160 || document.documentElement.scrollTop >= 160) {
            topnavbar.classList.add('scroll');
        }
        else {
            topnavbar.classList.remove('scroll');
        }
    };
})(); 