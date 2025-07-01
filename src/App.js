// App.js
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home.js';
import Landing from './Landing.js';
import AboutPage from './AboutPage.js';
import RecPage from './RecPage.js';
import { useState, useEffect } from 'react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate('/landing', { replace: true }); // Navigate to landing page and replace history
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={isAuthenticated ? <Home onLogout={logout} /> : <Landing />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/recommendations" element={isAuthenticated ? <RecPage onLogout={logout} /> : <Landing />} />
                <Route path="/about" element={isAuthenticated ? <AboutPage onLogout={logout} /> : <Landing />} />
            </Routes>
        </div>
    );
}

export default App;
