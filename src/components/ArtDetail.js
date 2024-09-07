import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailComponent = () => {
  const { artId } = useParams(); // 獲取路由參數
  const [artPiece, setArtPiece] = useState(null);

  useEffect(() => {
    fetch("/data/artData.json")
      .then(response => response.json())
      .then(data => {
        const piece = data.find(p => p.系統編號 === artId);
        setArtPiece(piece);
      })
      .catch(error => console.error("Error fetching the JSON file:", error));
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
