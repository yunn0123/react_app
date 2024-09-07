// Map.js
import React from 'react';
import { Link } from 'react-router-dom';

const MapPage = () => {
  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
        <h3 className="m-0">藝通台北</h3>
        <Link to="/" className="btn-close"></Link>
      </div>
      
      {/* Map placeholder */}
      <div className="map-placeholder" style={{ height: '500px', backgroundColor: '#CBD5E0' }}>
        {/* This div represents the map placeholder */}
      </div>
      
      {/* Bottom info and button */}
      <div className="d-flex justify-content-between align-items-center p-3 border-top fixed-bottom bg-white">
        <p className="m-0">公共裝置藝術資訊</p>
        <button className="btn btn-outline-info">前往打卡</button>
      </div>
    </div>
  );
};

export default MapPage;
