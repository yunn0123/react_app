import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Data
import artDataJson from '../data/artData.json'; 
import './css/artlist.css';



// Haversine formula to calculate the distance between two points
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000;
  return distance;
};

const GalleryPage = () => {
  // Load data into state (in a real case, you would fetch this from an API)
  const [artData, setArtData] = useState([]);

  // 假設我們在台北市中心(25.0330, 121.5654)
  const currentLocation = {
    latitude: 25.0330,
    longitude: 121.5654
  };

  useEffect(() => {
    // Load art data
    setArtData(artDataJson);
  }, []);

  // Calculate distances and sort the art list
  const sortedArtData = artData.map((item) => {
    const artLocation = {
      latitude: parseFloat(item.緯度), // Convert string to number
      longitude: parseFloat(item.經度), // Convert string to number
    };
    const distance = haversineDistance(currentLocation, artLocation).toFixed(1); // Calculate distance
    return { ...item, distance };
  });
  
  // Sort by distance
  sortedArtData.sort((a, b) => a.distance - b.distance);

  return (
    <div id="gallery-page" className="container">
      {/* Header */}
      <div id="header" className="my-4">
        <h4 id="header-title">周邊裝置藝術</h4>
      </div>

      {/* Art Installations List */}
      <div id="art-list" style={{ overflowY: 'scroll' }}>
        {sortedArtData.map((item) => (
          <div key={item.作品編號} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={item.主圖.startsWith('http') ? item.主圖 : `https:${item.主圖}`}
                  className="img-fluid rounded-start"
                  alt={item.作品名稱}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.作品名稱}</h5>
                  <p className="card-text">
                    {item.設置地點}
                    <br />
                    {item.distance ? `${item.distance} m` : '距離未知'}
                  </p>
                  <Link to={{pathname: `/details/${item.作品編號}`}}
                    className="btn btn-primary"
                  >
                    打開
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom Navigation */}
      <div id="bottom-nav" className="fixed-bottom bg-light text-center p-3">
        <Link to="/map" className="btn btn-outline-primary">
          回到地圖
        </Link>
      </div>
    </div>
  );
};

export default GalleryPage;
