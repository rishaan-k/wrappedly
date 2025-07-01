import './AboutPage.css';
import { useEffect, useState, useRef } from "react";
import Home from './Home.js';
import Landing from './Landing.js';
import HomeNavBar from './HomeNavBar.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function AboutPage() {
    const [token, setToken] = useState("")

    const logout = () => {
        console.log(token);
        setToken("")
        window.localStorage.removeItem("token")
        window.location.reload();
    }
  return (
    <div className='main'>
        <HomeNavBar />
        <h2>Created by Rishaan Kumar</h2>
        <h3>Go to <a href="https://rishaan.live">https://rishaan.live</a> to learn more!</h3>
    </div>
  );
}

export default AboutPage;