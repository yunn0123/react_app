import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import artDataJson from '../data/artData.json'; 

const DetailComponent = () => {
  const { artId } = useParams(); // 獲取路由參數
  console.log(artId);
  const [artPiece, setArtPiece] = useState(null);

  useEffect(() => {
    // 在本地的 JSON 數據中找到對應的藝術品
    const piece = artDataJson.find(p => p.系統編號 === artId);
    setArtPiece(piece);
  }, [artId]);

  if (!artPiece) return <p>加載中...</p>;

  return (
    <div>
      <h2>{artPiece.作品名稱}</h2>
      <p>作者: {artPiece.作者}</p>
      <p>設置地點: {artPiece.設置地點}</p>
      <p>場域: {artPiece.場域}</p>
      <p>{artPiece.作品說明}</p>
      <img src={artPiece.主圖} alt={artPiece.作品名稱} style={{ width: "300px" }} />
    </div>
  );
};

export default DetailComponent;
