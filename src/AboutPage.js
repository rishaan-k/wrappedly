import './AboutPage.css';
import HomeNavBar from './HomeNavBar.js';

function AboutPage({ onLogout }) {
  return (
    <div className='About'>
      <HomeNavBar onLogout={onLogout} />
      <div className='aboutContainer'>
        <div className='aboutContent'>
          <h1 className='aboutTitle'>about wrappedly</h1>
          <p className='aboutSubtitle'>your personal Spotify data tracker</p>
          
          <div className='section'>
            <h2 className='sectionTitle'>what is wrappedly?</h2>
            <p className='sectionText'>
              wrappedly is a modern web application that gives you instant access to your Spotify listening data. 
              unlike Spotify wrapped which only comes once a year, wrappedly lets you explore your music taste 
              anytime you want.
            </p>
          </div>

          <div className='section'>
            <h2 className='sectionTitle'>features</h2>
            <ul className='featureList'>
              <li className='featureItem'>📊 view your top tracks and artists</li>
              <li className='featureItem'>📅 multiple time ranges (1 month, 6 months, all time)</li>
              <li className='featureItem'>🎵 real-time data from Spotify API</li>
              <li className='featureItem'>📱 responsive design for all devices</li>
              <li className='featureItem'>🔒 secure OAuth authentication</li>
            </ul>
          </div>

          <div className='section'>
            <h2 className='sectionTitle'>how it works</h2>
            <p className='sectionText'>
              wrappedly connects securely to your Spotify account using official Spotify Web API. 
              we only access your listening history to show you personalized insights - no data is stored 
              or shared with third parties.
            </p>
          </div>

          <div className='section'>
            <h2 className='sectionTitle'>tech stack</h2>
            <p className='sectionText'>
              built with React.js, Material-UI, and powered by the Spotify Web API. 
              designed with a focus on performance, accessibility, and beautiful user experience.
            </p>
          </div>

          <div className='creator'>
            <h2 className='creatorTitle'>created by Rishaan Kumar</h2>
            <p className='creatorText'>
              passionate about music, media, and creating meaningful digital experiences.
            </p>
            <a href="https://rishaan.tech" className='creatorLink' target="_blank" rel="noopener noreferrer">
              visit rishaan.tech
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;