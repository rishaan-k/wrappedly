import './Home.css';
import { useEffect, useState } from "react";
import Table from './Table.js';
import HomeNavBar from './HomeNavBar.js';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home({ onLogout }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [topItems, setTopItems] = useState([]);
    const [activeDatatype, setActiveDatatype] = useState('tracks');
    const [activeDuration, setActiveDuration] = useState('short_term');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/landing');
            return;
        }
        fetchTopItems();
    }, [token, activeDatatype, activeDuration, navigate]);

    const fetchTopItems = async () => {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/me/top/${activeDatatype}?time_range=${activeDuration}&limit=50`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch top items: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("API Response Data:", data); // Log API response
            setTopItems(data.items || []);
        } catch (error) {
            console.error("Error fetching top items:", error);
        }
    };

    const handleDatatypeClick = (datatype) => {
        setActiveDatatype(datatype);
    };

    const handleDurationClick = (duration) => {
        setActiveDuration(duration);
    };

    const isActive = (current, active) => current === active;

    return (
        <div className='Home'>
            <HomeNavBar onLogout={onLogout} />
            <div className='controls'>
                <div className='typeControls'>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: isActive('tracks', activeDatatype) ? '#479454' : '#8B0000',
                            '&:hover': {
                                backgroundColor: isActive('tracks', activeDatatype) ? '#3a7a46' : '#600000',
                            },
                            color: 'white',
                        }}
                        onClick={() => handleDatatypeClick('tracks')}
                    >
                        Songs
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: isActive('artists', activeDatatype) ? '#479454' : '#8B0000',
                            '&:hover': {
                                backgroundColor: isActive('artists', activeDatatype) ? '#3a7a46' : '#600000',
                            },
                            color: 'white',
                        }}
                        onClick={() => handleDatatypeClick('artists')}
                    >
                        Artists
                    </Button>
                </div>
                <div className='timeControls'>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: isActive('short_term', activeDuration) ? '#479454' : '#8B0000',
                            '&:hover': {
                                backgroundColor: isActive('short_term', activeDuration) ? '#3a7a46' : '#600000',
                            },
                            color: 'white',
                        }}
                        onClick={() => handleDurationClick('short_term')}
                    >
                        Month
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: isActive('medium_term', activeDuration) ? '#479454' : '#8B0000',
                            '&:hover': {
                                backgroundColor: isActive('medium_term', activeDuration) ? '#3a7a46' : '#600000',
                            },
                            color: 'white',
                        }}
                        onClick={() => handleDurationClick('medium_term')}
                    >
                        6 Months
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: isActive('long_term', activeDuration) ? '#479454' : '#8B0000',
                            '&:hover': {
                                backgroundColor: isActive('long_term', activeDuration) ? '#3a7a46' : '#600000',
                            },
                            color: 'white',
                        }}
                        onClick={() => handleDurationClick('long_term')}
                    >
                        All Time
                    </Button>
                </div>
            </div>
            {topItems.length > 0 ? (
                <Table topItems={topItems} datatype={activeDatatype} />
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default Home;