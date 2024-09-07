//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
///////////////// bootstrap /////////////////////
//////////////// react //////////////////
import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//////////////// components //////////////////
import Navbar from './components/Navbar.js';
import Introduction from './components/Introduction.js';
import Map from './components/Map.js';
import Gallery from './components/Gallery.js';
import Art from './components/Art.js';
import MyPlace from './components/MyPlace.js';
//////////////// json data //////////////////
import artData from './data/artData.json'; 

// 動態取得藝術品名稱的函數，根據作品編號
const getArtNameById = (id) => {
  const art = artData.find(item => item['作品編號'] === id);
  return art ? art['作品名稱'] : "未找到藝術品";
};

// 單個藝術品頁面組件，動態加載藝術品名稱
function ArtPage() {
  const { artID } = useParams(); // 從 URL 參數中獲取 artID
  const artName = getArtNameById(artID); // 根據 artID 從 JSON 中查找對應的藝術品名稱

  return (
    <div>
      <Navbar name={artName} /> {/* 動態傳遞藝術品名稱 */}
      <Art />
    </div>
  );
}

function App() {
  return (
    <div className="App container">
      <Router>
        <Routes>
          {/*產品介紹頁面*/}
          <Route path="/" element={
            <>
            <Navbar name = "藝通台北"/>
            <Introduction />
            </>
            } />
          {/* 地圖頁面 */}
          <Route 
            path="/map" 
            element={
              <div>
                <Navbar name="藝通台北" />
                <Map />
              </div>
            } 
          />
          {/* 地圖頁面 */}
          <Route 
            path="/gallery" 
            element={
              <div>
                <Navbar name="周邊裝置藝術" />
                <Gallery />
              </div>
            } 
          />

          {/* 單個藝術品頁面 */}
          <Route 
            path="/art/:artID" 
            element={<ArtPage />}  // 動態顯示藝術品名稱
          />

          {/* 我的地點頁面 */}
          <Route 
            path="/myPlace" 
            element={
              <div>
                <Navbar name="我的地點" />
                <MyPlace userInfo={{
                  // 傳遞的用戶資訊 props，如：setAuthEmail, authEmail 等
                }} />
              </div>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
