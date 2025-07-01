// Artist.js
import './Artist.css';

function Artist({ name, genres = [], rank, link, image }) {
    return (
        <div className='artist'>
            <a className='link' href={link} target="_blank" rel="noopener noreferrer">
                <div className='artistContainer'>
                    <div className='artistRank'>
                        {rank}.
                    </div>
                    <div className='artistImageBody'>
                        <img className='artistImage' src={image} alt={name} />
                    </div>
                    <div className='artistDetails'>
                        <div className='artistName'>{name}</div>
                        <div className='artistGenres'>Genres: {genres.length > 0 ? genres.join(', ') : 'No genres available'}</div>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Artist;
