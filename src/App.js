
//////////////// react //////////////////
import React from 'react';
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//////////////// components //////////////////
import Introduction from './components/Introduction.js';
import Map from './components/Map.js';
import Gallery from './components/Gallery.js';
import MyPlace from './components/MyPlace.js';
import ArtMap from './components/ArtMap.js';
import ArtDetail from './components/ArtDetail.js';

//////////////// json data //////////////////
import artDataJson from './data/artData.json'; 


// 動態取得藝術品名稱的函數，根據作品編號
const getArtNameById = (id, data) => {
  const art = data.find(item => item['系統編號'] === id);
  return art ? art['作品名稱'] : "未找到藝術品";
};

// 單個藝術品頁面組件，動態加載藝術品名稱
function ArtPage() {
  const { artID } = useParams(); // 從 URL 參數中獲取 artID
  const artName = getArtNameById(artID, artDataJson); // 根據 artID 從 JSON 中查找對應的藝術品名稱

  return (
    <div>
      <h1>{artName}</h1>
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
          <Route path="/" element={<Introduction />} />
          
          {/* 地圖頁面 */}
          <Route path="/map" element={<Map />} />
          
          {/* 周邊裝置藝術頁面 */}
          <Route path="/gallery" element={<Gallery />} />

          {/* 單個藝術品頁面 */}
          <Route path="/art/:artID" element={<ArtPage />}  />

          {/* 我的地點頁面 */}
          <Route 
            path="/myPlace" 
            element={<MyPlace userInfo={{
              // 傳遞的用戶資訊 props，如：setAuthEmail, authEmail 等
            }} />} 
          />

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
