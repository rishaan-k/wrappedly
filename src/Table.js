// Table.js
import './Table.css';
import Song from './Song.js';
import Artist from './Artist.js';

function Table({ topItems, datatype }) {
    return (
        <div className='table'>
            <div className='items'>
                {topItems.length > 0 ? topItems.map((item, index) => (
                    datatype === 'tracks' ? (
                        <Song
                            key={index}
                            title={item.name}
                            artist={item.artists && item.artists.length > 0 ? item.artists[0].name : 'Unknown Artist'}
                            rank={index + 1}
                            link={item.external_urls ? item.external_urls.spotify : '#'}
                            image={item.album && item.album.images && item.album.images.length > 0 ? item.album.images[0].url : 'https://via.placeholder.com/150'}
                        />
                    ) : (
                        <Artist
                            key={index}
                            name={item.name}
                            genres={item.genres || []}
                            rank={index + 1}
                            link={item.external_urls ? item.external_urls.spotify : '#'}
                            image={item.images && item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/150'}
                        />
                    )
                )) : <p>No data available</p>}
            </div>
        </div>
    );
}

export default Table;
