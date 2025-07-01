import './Landing.css';
import { useEffect } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        let token = localStorage.getItem("token");

        if (!token && hash) {
            const hashToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
            if (hashToken) {
                // Set token in localStorage and navigate to home
                localStorage.setItem("token", hashToken);
                window.location.hash = ""; 
                navigate('/', { replace: true }); 
            }
        }
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`;
    };

    return (
        <div className='Home'>
            <div className="App">
                <div className='titleArea'>
                    <div className='titleBox'>
                        <p className="title">TrackTheSpot</p>
                        <p className="subtitle">your personal Spotify data tracker</p>
                        <div className='button'>
                            <Button size="large" variant="contained" color="success" onClick={handleLogin}>
                                <p className='buttonText'>JOIN</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;