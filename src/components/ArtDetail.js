import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import artDataJson from '../data/artData.json';
import { getCurrentLocation } from './GetLocation';  // 匯入位置取得函數

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
  const [currentLocation, setCurrentLocation] = useState(null); // 使用者位置狀態
  const [error, setError] = useState(null);

  // 用於不斷嘗試取得位置資料，直到成功或達到最大次數
  useEffect(() => {
    let intervalId;
    let maxAttempts = 10; // 最大嘗試次數
    let attemptCount = 0;

    const fetchLocation = () => {
      getCurrentLocation()
        .then((location) => {
          setCurrentLocation(location);
          clearInterval(intervalId); // 成功取得位置後清除定時器
        })
        .catch((err) => {
          console.error(err);
          attemptCount++;
          if (attemptCount >= maxAttempts) {
            setError("無法取得您的位置，請啟用定位服務或稍後重試");
            clearInterval(intervalId); // 達到最大次數後停止嘗試
          }
        });
    };

    // 每2秒嘗試取得一次位置
    intervalId = setInterval(fetchLocation, 2000);

    // 在組件卸載時清除定時器
    return () => clearInterval(intervalId);
  }, []);

  // 根據使用者位置和藝術品位置計算距離
  useEffect(() => {
    
    // Find the art piece in local JSON data
    const piece = artDataJson.find(p => p.系統編號 === artId);
    setArtPiece(piece);

    if (piece && currentLocation) {
      // 確保緯度和經度是數字
      const artLocation = {
        latitude: Number(piece.緯度), // 使用 Number() 來轉換為數字
        longitude: Number(piece.經度)
      };

      currentLocation.latitude = Number(currentLocation.lat);
      currentLocation.longitude = Number(currentLocation.lng);

      // 計算距離
      const calculatedDistance = haversineDistance(currentLocation, artLocation).toFixed(1);
      setDistance(calculatedDistance)
    }
  }, [artId, currentLocation]); // 依賴 currentLocation 來重新計算距離

  // 檢查 currentLocation 是否存在，否則不渲染
  if (!artPiece || !currentLocation) return <p>加載中...</p>;

  const isCheckInEnabled = distance && distance < 500;

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
            <Link to="/gallery" className="btn" style={{ backgroundColor: '#5AB4C5', border: 'none', color: 'white', padding: '10px' }}>回列表</Link>
            
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip">
              <button className="btn btn-primary" disabled={!isCheckInEnabled} style={{ backgroundColor: '#5AB4C5', border: 'none', color: 'white', padding: '10px' }}>
                {isCheckInEnabled ? "打卡" : `距離需小於500公尺，當前距離: ${distance} 公尺`}
              </button>
            </span>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
