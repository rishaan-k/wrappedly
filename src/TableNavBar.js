import './Table.css';
import Song from './Song.js';
import { useState } from 'react';
import { Link, browserRouter, Route, Routes } from 'react-router-dom'

function TableNavBar() {
    const [activeDatatype, setActiveDatatype] = useState('Songs');
    const [activeDuration, setActiveDuration] = useState('Month');

    const handleDurationClick = (duration) => {
        setActiveDuration(duration);
    };
    const handleDatatypeClick = (datatype) => {
        setActiveDatatype(datatype);
    };

    return (
        <div className='table'>
            <link rel="stylesheet" href="https://use.typekit.net/lll4eml.css"></link>
            <div className='tableNavBar'>
                <div className='tableNavBarCategory'>
                    <div className='tableNavBarItem' style={{ backgroundColor: activeDatatype === 'Songs' ? 'green' : 'red' }}
                        onClick={() => handleDatatypeClick('Songs')}>Songs</div>
                    <div className='tableNavBarItem' style={{ backgroundColor: activeDatatype === 'Artists' ? 'green' : 'red' }}
                        onClick={() => handleDatatypeClick('Artists')}> Artists</div>
                </div>
                <div className='dash'>
                    -
                </div>
                <div className='tableNavBarCategory'>
                    <div className='tableNavBarItem' style={{ backgroundColor: activeDuration === 'Month' ? 'green' : 'red' }}
                        onClick={() => handleDurationClick('Month')}>Month</div>
                    <div className='tableNavBarItem' style={{ backgroundColor: activeDuration === '6 Months' ? 'green' : 'red' }}
                        onClick={() => handleDurationClick('6 Months')}>6 Months</div>
                    <div className='tableNavBarItem' style={{ backgroundColor: activeDuration === 'All Time' ? 'green' : 'red' }}
                        onClick={() => handleDurationClick('All Time')}>All Time</div>
                </div>
            </div>
        </div >
    );
}

export default TableNavBar;