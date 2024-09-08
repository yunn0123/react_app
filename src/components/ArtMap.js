import React, { useEffect } from "react";

import artDataJson from '../data/artData.json'; 
// import './css/artMap.css';

const MapComponent = () => {
  useEffect(() => {
    // 初始化地圖
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 25.0330, lng: 121.5654 } // 台北市中心
      });

      // 只創建一個 InfoWindow
      const infoWindow = new window.google.maps.InfoWindow();

      artDataJson.forEach(piece => {
        console.log('success');
        const lat = parseFloat(piece.緯度);
        const lng = parseFloat(piece.經度);
        const name = piece.作品名稱;
        const author = piece.作者;
        const imageUrl = piece.主圖;
        const detailUrl = `/details/${piece.系統編號}`;

        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: name
          });

          // 點擊標記時更新 InfoWindow 的內容
          marker.addListener("click", () => {
            infoWindow.setContent(`
              <div>
                <h3>${name}</h3>
                <p>作者: ${author}</p>
                <img src="${imageUrl}" alt="${name}" style="width:200px;">
              </div>
            `);
            infoWindow.open(map, marker);
          });
        }
      });
    };

    window.initMap = initMap;

    // 加載 Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfTGP2hy7vxs9b-MDzMNBlAxQe3e9i1sg&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 清除地圖 API
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "82vh", margin: "0", padding: "0" }}></div>;
};

export default MapComponent;