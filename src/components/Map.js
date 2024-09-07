// Map.js
import React from 'react';
import { Link } from 'react-router-dom';

const MapPage = () => {
  return (
    <div id="map-page">
      {/* Header */}
      <div id="header">
        <h3 id="title">藝通台北</h3>
      </div>
      
      {/* Map placeholder */}
      <div id="map-placeholder" style={{ height: '500px', backgroundColor: '#CBD5E0' }}>
        {/* This div represents the map placeholder */}
      </div>
      
      {/* Bottom info and button */}
      <div id="bottom-info">
        <p id="art-info">公共裝置藝術資訊</p>
        <Link to="/gallery" id="gallery-link">前往打卡</Link>
      </div>
    </div>
  );
};

export default MapPage;
