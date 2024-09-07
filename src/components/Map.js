import React from 'react';
import { Link } from 'react-router-dom';
import MapComponent from './ArtMap.js';

const MapPage = () => {
  return (
    <div id="map-page">
      {/* Map placeholder */}
      <div id="map-placeholder">
        <MapComponent />  
      </div>
      
      {/* Bottom info and button */}
      <div id="bottom-info">
        <Link to="/gallery" className="btn btn-info mt-3 w-100 font-H3-semibold" style={{ backgroundColor: '#5AB4C5', border: 'none', color: 'white', padding: '10px' }}>前往打卡</Link>
      </div>
    </div>
  );
};

export default MapPage;
