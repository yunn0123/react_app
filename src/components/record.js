import React, { useEffect, useState } from 'react';
import artData from './artData.json'; // 將本地 artData.json 檔案匯入
import './css/record.css';


const ArtInfo = () => {
  const [apiData, setApiData] = useState([]); // 儲存從 API 獲取的資料
  const [loading, setLoading] = useState(true);

  // 模擬從 API 獲取資料
  useEffect(() => {
    fetch('https://example.com/api/data') // 替換為真實 API 的 URL
      .then(response => response.json())
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // 根據 art_id 找到對應的作品資訊
  const getArtDetailsById = (artId) => {
    return artData.find(art => art.art_id === artId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>API Data and Art Information</h2>
      {apiData.map((item) => {
        const artDetails = getArtDetailsById(item.art_id);

        return (
          <div key={item.id}>
            <p><strong>時間:</strong> {new Date(item.timestamp).toLocaleString()}</p>
            {artDetails ? (
              <div>
                <p><strong>名稱:</strong> {artDetails.name}</p>
                <p><strong>說明:</strong> {artDetails.description}</p>
                <p><strong>地址:</strong> {artDetails.address}</p>
              </div>
            ) : (
              <p>找不到對應的藝術作品資料。</p>
            )}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default ArtInfo;