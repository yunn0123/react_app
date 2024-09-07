import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import artDataJson from '../data/artData.json';


// Haversine formula to calculate distance between two lat/lon points
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
  const distance = R * c;
  return distance * 1000; // Convert to meters
};

const DetailComponent = () => {
  const { artId } = useParams(); // Get artId from route parameters
  const [artPiece, setArtPiece] = useState(null);
  const [distance, setDistance] = useState(null);
  
  // 假設我們在台北市中心(25.0330, 121.5654)
  const currentLocation = {
    latitude: 25.0330,
    longitude: 121.5654
  };

  useEffect(() => {
    // Find the art piece in local JSON data
    const piece = artDataJson.find(p => p.作品編號 === artId);
    setArtPiece(piece);

    if (piece) {
      // Calculate the distance
      const artLocation = {
        latitude: parseFloat(piece.緯度),
        longitude: parseFloat(piece.經度)
      };
      const calculatedDistance = haversineDistance(currentLocation, artLocation).toFixed(1);
      setDistance(calculatedDistance);
    }
  }, [artId]);

  if (!artPiece) return <p>加載中...</p>;

  const isCheckInEnabled = distance && distance < 50;

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{artPiece.作品名稱}</h2>
          <p className="card-text">作者: {artPiece.作者}</p>
          <p className="card-text">設置地點: {artPiece.設置地點}</p>
          <p className="card-text">場域: {artPiece.場域}</p>
          <p className="card-text">{artPiece.作品說明}</p>
          <img src={artPiece.主圖} alt={artPiece.作品名稱} className="img-fluid mb-3" style={{ width: "300px" }} />
          
          {distance && (
            <p className="card-text">
              距離當前位置: {distance < 1000 ? `${distance} 公尺` : `${(distance / 1000).toFixed(2)} 公里`}
            </p>
          )}

          {/* Button Section */}
          <div className="d-flex justify-content-between">
            <Link to="/gallery" className="btn btn-secondary">回到列表</Link>
            
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={isCheckInEnabled ? "打卡" : `距離需小於50公尺，當前距離: ${distance} 公尺`}>
              <button className="btn btn-primary" disabled={!isCheckInEnabled}>
                打卡
              </button>
            </span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
