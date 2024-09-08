import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Data
import artDataJson from '../data/artData.json'; 
//import './css/artlist.css';
import { getCurrentLocation } from './GetLocation';  // 匯入位置取得函數


// Haversine formula to calculate the distance between two points
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180; // 角度轉換為弧度
  const R = 6371; // 地球半徑 (公里)
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // 將距離轉換為公尺
  return distance;
};


const GalleryPage = () => {
  const [artData, setArtData] = useState([]);  // 藝術品資料狀態
  const [currentLocation, setCurrentLocation] = useState(null); // 使用者位置狀態

  useEffect(() => {
    // 加載藝術品資料
    setArtData(artDataJson);
    
    // 使用 getCurrentLocation 動態取得使用者位置
    getCurrentLocation()
      .then(location => setCurrentLocation({
        latitude: location.lat,
        longitude: location.lng
      }))
      .catch(error => {
        console.error("無法取得位置", error);
        setCurrentLocation({
          latitude: 25.0330, // 預設為台北市中心
          longitude: 121.5654
        });
      });
  }, []); // 空陣列作為依賴，表示這個 useEffect 僅在組件初次加載時運行

  if (!currentLocation) {
    return <p>正在加載位置...</p>;
  }

  // 計算每個藝術品與使用者的距離，並排序
  const sortedArtData = artData.map((item) => {
    const artLocation = {
      latitude: parseFloat(item.緯度),
      longitude: parseFloat(item.經度),
    };
    const distance = haversineDistance(currentLocation, artLocation).toFixed(1); // 計算距離
    return { ...item, distance };
  });

  // 依距離進行排序
  sortedArtData.sort((a, b) => a.distance - b.distance);

  return (
    <div id="gallery-page" className="container">
      {/* 頁面標題 */}
      <div id="header" className="my-4">
        <h4 id="header-title">周邊裝置藝術</h4>
      </div>

      {/* 藝術品列表 */}
      <div id="art-list" style={{ overflowY: 'scroll' }}>
        {sortedArtData.map((item) => (
          <div key={item.系統編號} className="card mb-3">
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
                  <Link to={`/details/${item.系統編號}`}
                    className="btn btn-outline-info mt-3 w-100">
                    打開
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部導航按鈕 */}
      <div id="bottom-nav" className="fixed-bottom bg-light text-center p-3">
        <Link to="/map" className="btn mt-3 w-100" style={{ backgroundColor: '#5AB4C5', border: 'none', color: 'white', padding: '10px' }}>
          回地圖
        </Link>
      </div>
    </div>
  );
};

export default GalleryPage;
