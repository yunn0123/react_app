
//////////////// react //////////////////
import React from 'react';
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//////////////// components //////////////////
import Introduction from './components/Introduction.js';
import Map from './components/Map.js';
import Gallery from './components/Gallery.js';
import MyPlace from './components/MyPlace.js';
import MapComponent from './components/ArtMap.js';
import ArtDetail from './components/ArtDetail.js';

//////////////// json data //////////////////
import artDataJson from './data/artData.json'; 

function App() {
  return (
    <div className="App container">
      <Router>
        <Routes>
    
          {/*產品介紹頁面*/}
          <Route path="/" element={<Introduction />} />
          
          {/* 地圖頁面 */}
          <Route path="/map" element={<Map />} />
          
          {/* 周邊裝置藝術頁面 */}
          <Route path="/gallery" element={<Gallery />} />

          {/* 動態的藝術品詳細頁面（DetailComponent） */}
          <Route path="/details/:artId" element={<ArtDetail />} />

          {/* 動態地圖頁面（MapComponent） */}
          {/* <Route path="/dynamic-map" element={<MapComponent />} /> */}

          {/* 我的地點頁面 */}
          <Route 
            path="/myPlace" 
            element={<MyPlace userInfo={{
              // 傳遞的用戶資訊 props，如：setAuthEmail, authEmail 等
            }} />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
