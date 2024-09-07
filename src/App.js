// Import Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';

//////////////// react //////////////////
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

//////////////// components //////////////////
import Navbar from './components/Navbar.js';
import Introduction from './components/Introduction.js';
import Map from './components/Map.js';
import Gallery from './components/Gallery.js';
import MyPlace from './components/MyPlace.js';
import ArtMap from './components/ArtMap.js';
import ArtDetail from './components/ArtDetail.js';

//////////////// json data //////////////////
import artData from './data/artData.json'; 

// 動態取得藝術品名稱的函數，根據作品編號
const getArtNameById = (id) => {
  const art = artData.find(item => item['作品編號'] === id);
  return art ? art['作品名稱'] : "未找到藝術品";
};


function App() {
  return (
    <div className="App container">
      <Router>
        <Routes>
          {/* 產品介紹頁面 */}
          <Route path="/" element={
            <>
              <Navbar name="藝通台北" />
              <Introduction />
            </>
          } />

          {/* 地圖頁面 */}
          <Route path="/map" element={
            <>
              <Navbar name="藝通台北" />
              <Map />
            </>
          } />

          {/* 圖庫頁面 */}
          <Route path="/gallery" element={
            <>
              <Navbar name="周邊裝置藝術" />
              <Gallery />
            </>
          } />

          {/* 我的地點頁面 */}
          <Route path="/myPlace" element={
            <>
              <Navbar name="我的地點" />
              <MyPlace userInfo={{
                // 傳遞用戶資訊，如：setAuthEmail, authEmail 等
              }} />
            </>
          } />

          {/* 動態的藝術品詳細頁面（DetailComponent） */}
          <Route path="/details/:artId" element={<ArtDetail />} />

          {/* 動態地圖頁面（MapComponent） */}
          <Route path="/dynamic-map" element={<ArtMap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
