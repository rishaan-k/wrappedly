import './Song.css';

function Song(props) {
  return (
    <div>
      <a className='link' href={props.link} target="_blank">
        <div className='song' >
          <div className='songRank'>
            {props.rank}.
          </div>
          <div className='songImageBody'>
            <img className='songImage' src={props.image} />
          </div>
          <div className='songDetails'>
            <div className='songTitle'>{props.title}</div>
            <div className='songArtist'>{props.artist}</div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Song;