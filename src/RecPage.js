// RecPage.js
import './RecPage.css';
import { useEffect, useState } from "react";
import Table from './Table.js';
import HomeNavBar from './HomeNavBar.js';

function RecPage() {
    return (
        <div className='RecPage'>
            <HomeNavBar />
            <h2>Recommended Songs</h2>
            
            <h4>This feature is currently not available on this hosted version because commercial API keys are expensive :/ </h4>
        </div>
    );
}

export default RecPage;
