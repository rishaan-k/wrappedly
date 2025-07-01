// Table.js
import './Table.css';
import Song from './Song.js';
import Artist from './Artist.js';
import { useEffect, useState } from 'react';

function Table({ topItems, datatype }) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        // Trigger re-animation when data changes
        setAnimationKey(prev => prev + 1);
    }, [topItems, datatype]);

    return (
        <div className='table' key={animationKey}>
            <div className='items fade-in-container'>
                {topItems.length > 0 ? topItems.map((item, index) => (
                    <div 
                        key={`${datatype}-${item.id || item.name}-${index}`}
                        className="item-wrapper"
                        style={{ 
                            animationDelay: `${index * 0.02}s`,
                            opacity: 0,
                            animation: 'fadeInUp 0.3s ease forwards'
                        }}
                    >
                        {datatype === 'tracks' ? (
                            <Song
                                title={item.name}
                                artist={item.artists && item.artists.length > 0 ? item.artists[0].name : 'Unknown Artist'}
                                rank={index + 1}
                                link={item.external_urls ? item.external_urls.spotify : '#'}
                                image={item.album && item.album.images && item.album.images.length > 0 ? item.album.images[0].url : 'https://via.placeholder.com/150'}
                            />
                        ) : (
                            <Artist
                                name={item.name}
                                genres={item.genres || []}
                                rank={index + 1}
                                link={item.external_urls ? item.external_urls.spotify : '#'}
                                image={item.images && item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/150'}
                            />
                        )}
                    </div>
                )) : <p className="no-data">No data available</p>}
            </div>
        </div>
    );
}

export default Table;
