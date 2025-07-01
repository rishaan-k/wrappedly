// RecPage.js
import './RecPage.css';
import HomeNavBar from './HomeNavBar.js';

// Import album covers
import rec1 from './images/rec1.jpg';
import rec2 from './images/rec2.jpg';
import rec3 from './images/rec3.jpg';
import rec4 from './images/rec4.jpg';
import rec5 from './images/rec5.jpg';

function RecPage({ onLogout }) {
  // Favorite songs data with album covers and Spotify links
  const favoriteSongs = [
    { 
      name: "PPP", 
      artist: "Beach House", 
      rank: 1, 
      image: rec1,
      spotifyUrl: "https://open.spotify.com/track/38PTaSqKcn1NKafQRdXSby?si=0e5ba42167864d53"
    },
    { 
      name: "Let Down", 
      artist: "Radiohead", 
      rank: 2, 
      image: rec2,
      spotifyUrl: "https://open.spotify.com/track/2fuYa3Lx06QQJAm0MjztKr?si=ddd90d4915a34b1d"
    },
    { 
      name: "Amoeba", 
      artist: "Clairo", 
      rank: 3, 
      image: rec3,
      spotifyUrl: "https://open.spotify.com/track/0HAqq2GcQKyi3s87GuN7jU?si=3f4cffe8ed9d44a5"
    },
    { 
      name: "Bonehead's Bank Holiday", 
      artist: "Oasis", 
      rank: 4, 
      image: rec4,
      spotifyUrl: "https://open.spotify.com/track/6d1Ic5JjnFCJ1mOISnGxA1?si=479034a189054cdb"
    },
    { 
      name: "Seaforth", 
      artist: "King Krule", 
      rank: 5, 
      image: rec5,
      spotifyUrl: "https://open.spotify.com/track/5pEUZtevfA5f7bFewCDh3c?si=6befaaf6e3074fea"
    }
  ];

  return (
    <div className='Rec'>
      <HomeNavBar onLogout={onLogout} />
      <div className='recContainer'>
        <div className='recContent'>
          <h1 className='recTitle'>recommendations</h1>
          <p className='recSubtitle'>personalized music discovery</p>
          
          <div className='section'>
            <h2 className='sectionTitle'>why no recommendations?</h2>
            <p className='sectionText'>
              i would usually give you song recommendations here but api keys are expensive lol
            </p>
          </div>

          <div className='section'>
            <h2 className='sectionTitle'>here are some of my favorite songs of all time instead</h2>
            <div className='songsList'>
              {favoriteSongs.map((song, index) => (
                <a 
                  key={index} 
                  href={song.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='songItem'
                >
                  <span className='songRank'>{song.rank}</span>
                  <img 
                    src={song.image} 
                    alt={`${song.name} by ${song.artist}`}
                    className='albumCover'
                  />
                  <div className='songInfo'>
                    <span className='songName'>{song.name}</span>
                    <span className='songArtist'>{song.artist}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className='section'>
            <h2 className='sectionTitle'>about these picks</h2>
            <p className='sectionText'>
              these songs represent some of the most impactful tracks in my personal music journey. 
              each one captures a different mood, memory, or moment that shaped my taste in music.
              click on any song to open it in Spotify!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecPage;
