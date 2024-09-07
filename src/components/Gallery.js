import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Data
import artDataJson from '../data/artData.json'; 

const GalleryPage = () => {
  // Load data into state (in a real case, you would fetch this from an API)
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch data
    setArtData(artDataJson);
  }, []);

  return (
    <div id="gallery-page">
      {/* Header */}
      <div id="header">
        <h4 id="header-title">周邊裝置藝術</h4>
      </div>

      {/* Art Installations List */}
      <div id="art-list">
        {artData.map((item) => (
          <div key={item.系統編號} className="art-item">
            <div>
              <h6>{item.作品名稱}</h6>
              <small>{item.設置地點}</small>
              <br />
              <small>{item.距離}</small>
            </div>
            {/* Update the link to use the system ID (系統編號) */}
            <Link to={`/details/${item.系統編號}`} id="gallery-link">打卡</Link>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div id="bottom-nav">
        <Link to="/map" id="map-btn">回到地圖</Link>
      </div>
    </div>
  );
};

export default GalleryPage;
