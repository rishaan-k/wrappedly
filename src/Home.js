import './Home.css';
import { useEffect, useState } from "react";
import Table from './Table.js';
import HomeNavBar from './HomeNavBar.js';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

function Home({ onLogout }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [topItems, setTopItems] = useState([]);
    const [activeDatatype, setActiveDatatype] = useState('tracks');
    const [activeDuration, setActiveDuration] = useState('short_term');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/landing');
            return;
        }
        fetchTopItems();
    }, [token, activeDatatype, activeDuration, navigate]);

    const fetchTopItems = async () => {
        setLoading(true);
        setTopItems([]); // Clear old data immediately to prevent stutter
        
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
            
            // Set new data immediately for smoother experience
            setTopItems(data.items || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching top items:", error);
            setLoading(false);
        }
    };

    const handleDatatypeClick = (datatype) => {
        if (datatype !== activeDatatype && !loading) {
            setActiveDatatype(datatype);
        }
    };

    const handleDurationClick = (duration) => {
        if (duration !== activeDuration && !loading) {
            setActiveDuration(duration);
        }
    };

    const isActive = (current, active) => current === active;
    const isDisabled = loading;

    const SkeletonLoader = () => (
        <div className="skeleton-container">
            {[...Array(10)].map((_, index) => (
                <div key={index} className="skeleton-item">
                    <Skeleton 
                        variant="rectangular" 
                        width={60} 
                        height={60} 
                        sx={{ borderRadius: '8px', backgroundColor: 'rgba(71, 148, 84, 0.1)' }}
                    />
                    <div className="skeleton-text">
                        <Skeleton 
                            variant="text" 
                            width="60%" 
                            height={24}
                            sx={{ backgroundColor: 'rgba(71, 148, 84, 0.1)' }}
                        />
                        <Skeleton 
                            variant="text" 
                            width="40%" 
                            height={20}
                            sx={{ backgroundColor: 'rgba(71, 148, 84, 0.1)' }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='Home'>
            <HomeNavBar onLogout={onLogout} />
            <div className='controls'>
                <div className='typeControls'>
                    <div className="toggle-group">
                        <Button
                            className="toggle-button"
                            variant={isActive('tracks', activeDatatype) ? "contained" : "outlined"}
                            disabled={isDisabled}
                            sx={{
                                backgroundColor: isActive('tracks', activeDatatype) ? '#1a1a1a' : 'transparent',
                                border: isActive('tracks', activeDatatype) ? '2px solid #ffffff' : '2px solid #333333',
                                '&:hover': {
                                    backgroundColor: isActive('tracks', activeDatatype) ? '#2a2a2a' : '#1a1a1a',
                                    border: '2px solid #666666',
                                },
                                '&:disabled': {
                                    backgroundColor: isActive('tracks', activeDatatype) ? '#1a1a1a' : 'transparent',
                                    border: isActive('tracks', activeDatatype) ? '2px solid #ffffff' : '2px solid #333333',
                                    opacity: 0.6,
                                },
                                color: isActive('tracks', activeDatatype) ? '#ffffff' : '#cccccc',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontSize: '14px',
                                fontWeight: '600',
                                textTransform: 'lowercase',
                                borderRadius: '25px',
                                padding: '12px 24px',
                                minWidth: '120px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: isActive('tracks', activeDatatype) ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
                            }}
                            onClick={() => handleDatatypeClick('tracks')}
                        >
                            {loading && isActive('tracks', activeDatatype) ? 
                                <CircularProgress size={16} sx={{ color: 'white', marginRight: 1 }} /> : null
                            }
                            songs
                        </Button>
                        <Button
                            className="toggle-button"
                            variant={isActive('artists', activeDatatype) ? "contained" : "outlined"}
                            disabled={isDisabled}
                            sx={{
                                backgroundColor: isActive('artists', activeDatatype) ? '#1a1a1a' : 'transparent',
                                border: isActive('artists', activeDatatype) ? '2px solid #ffffff' : '2px solid #333333',
                                '&:hover': {
                                    backgroundColor: isActive('artists', activeDatatype) ? '#2a2a2a' : '#1a1a1a',
                                    border: '2px solid #666666',
                                },
                                '&:disabled': {
                                    backgroundColor: isActive('artists', activeDatatype) ? '#1a1a1a' : 'transparent',
                                    border: isActive('artists', activeDatatype) ? '2px solid #ffffff' : '2px solid #333333',
                                    opacity: 0.6,
                                },
                                color: isActive('artists', activeDatatype) ? '#ffffff' : '#cccccc',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontSize: '14px',
                                fontWeight: '600',
                                textTransform: 'lowercase',
                                borderRadius: '25px',
                                padding: '12px 24px',
                                minWidth: '120px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: isActive('artists', activeDatatype) ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
                            }}
                            onClick={() => handleDatatypeClick('artists')}
                        >
                            {loading && isActive('artists', activeDatatype) ? 
                                <CircularProgress size={16} sx={{ color: 'white', marginRight: 1 }} /> : null
                            }
                            artists
                        </Button>
                    </div>
                </div>
                <div className='timeControls'>
                    <div className="toggle-group">
                        <Button
                            className="toggle-button"
                            variant={isActive('short_term', activeDuration) ? "contained" : "outlined"}
                            disabled={isDisabled}
                            sx={{
                                backgroundColor: isActive('short_term', activeDuration) ? '#1a1a1a' : 'transparent',
                                border: isActive('short_term', activeDuration) ? '2px solid #ffffff' : '2px solid #333333',
                                '&:hover': {
                                    backgroundColor: isActive('short_term', activeDuration) ? '#2a2a2a' : '#1a1a1a',
                                    border: '2px solid #666666',
                                },
                                '&:disabled': {
                                    backgroundColor: isActive('short_term', activeDuration) ? '#1a1a1a' : 'transparent',
                                    border: isActive('short_term', activeDuration) ? '2px solid #ffffff' : '2px solid #333333',
                                    opacity: 0.6,
                                },
                                color: isActive('short_term', activeDuration) ? '#ffffff' : '#cccccc',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontSize: '14px',
                                fontWeight: '600',
                                textTransform: 'lowercase',
                                borderRadius: '25px',
                                padding: '12px 20px',
                                minWidth: '100px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: isActive('short_term', activeDuration) ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
                            }}
                            onClick={() => handleDurationClick('short_term')}
                        >
                            {loading && isActive('short_term', activeDuration) ? 
                                <CircularProgress size={16} sx={{ color: 'white', marginRight: 1 }} /> : null
                            }
                            month
                        </Button>
                        <Button
                            className="toggle-button"
                            variant={isActive('medium_term', activeDuration) ? "contained" : "outlined"}
                            disabled={isDisabled}
                            sx={{
                                backgroundColor: isActive('medium_term', activeDuration) ? '#1a1a1a' : 'transparent',
                                border: isActive('medium_term', activeDuration) ? '2px solid #ffffff' : '2px solid #333333',
                                '&:hover': {
                                    backgroundColor: isActive('medium_term', activeDuration) ? '#2a2a2a' : '#1a1a1a',
                                    border: '2px solid #666666',
                                },
                                '&:disabled': {
                                    backgroundColor: isActive('medium_term', activeDuration) ? '#1a1a1a' : 'transparent',
                                    border: isActive('medium_term', activeDuration) ? '2px solid #ffffff' : '2px solid #333333',
                                    opacity: 0.6,
                                },
                                color: isActive('medium_term', activeDuration) ? '#ffffff' : '#cccccc',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontSize: '14px',
                                fontWeight: '600',
                                textTransform: 'lowercase',
                                borderRadius: '25px',
                                padding: '12px 20px',
                                minWidth: '100px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: isActive('medium_term', activeDuration) ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
                            }}
                            onClick={() => handleDurationClick('medium_term')}
                        >
                            {loading && isActive('medium_term', activeDuration) ? 
                                <CircularProgress size={16} sx={{ color: 'white', marginRight: 1 }} /> : null
                            }
                            6 months
                        </Button>
                        <Button
                            className="toggle-button"
                            variant={isActive('long_term', activeDuration) ? "contained" : "outlined"}
                            disabled={isDisabled}
                            sx={{
                                backgroundColor: isActive('long_term', activeDuration) ? '#1a1a1a' : 'transparent',
                                border: isActive('long_term', activeDuration) ? '2px solid #ffffff' : '2px solid #333333',
                                '&:hover': {
                                    backgroundColor: isActive('long_term', activeDuration) ? '#2a2a2a' : '#1a1a1a',
                                    border: '2px solid #666666',
                                },
                                '&:disabled': {
                                    backgroundColor: isActive('long_term', activeDuration) ? '#1a1a1a' : 'transparent',
                                    border: isActive('long_term', activeDuration) ? '2px solid #ffffff' : '2px solid #333333',
                                    opacity: 0.6,
                                },
                                color: isActive('long_term', activeDuration) ? '#ffffff' : '#cccccc',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontSize: '14px',
                                fontWeight: '600',
                                textTransform: 'lowercase',
                                borderRadius: '25px',
                                padding: '12px 20px',
                                minWidth: '100px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: isActive('long_term', activeDuration) ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
                            }}
                            onClick={() => handleDurationClick('long_term')}
                        >
                            {loading && isActive('long_term', activeDuration) ? 
                                <CircularProgress size={16} sx={{ color: 'white', marginRight: 1 }} /> : null
                            }
                            all time
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className={`content-container ${loading ? 'loading' : 'loaded'}`}>
                {loading ? (
                    <SkeletonLoader />
                ) : topItems.length > 0 ? (
                    <Table topItems={topItems} datatype={activeDatatype} />
                ) : (
                    <p className="no-data">No data available</p>
                )}
            </div>
        </div>
    );
}

export default Home;