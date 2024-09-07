// Introduction.js
import React from 'react';
import './css/introduction.css';

function Introduction() {
    return (
      <div  className="container" id="basic">
        {/* Main card bar */}
        <div className="card text-center">
          {/* Card header */}
          <div className="head">
            <img className="image" src= "./img/TownPass_Ellipse.png" alt="" />
            <h2 className="ml-2" id="title">藝通台北</h2>
          </div>
  
          {/* Card body */}
          <div className="card-body">
            <p className="card-text">
              探索城市中的藝術美景，藝術體驗台北的獨特魅力！
              <br />
              台北市各戶外公共藝術地標，已經超過1000件作品，來為城市帶來活力與創意。
              <br />
              若您想探索這些藝術地點，請使用手機定位系統。
              <br />
            </p>
  
            {/* Notification / warning */}
            <div className="alert alert-warning " role="alert">
              本服務將根據您當前的手機定位，找到附近的公共藝術作品。<br />
              請使用智慧定位服務並進行打卡。
            </div>
          </div>
  
          {/* Card footer */}
          <div className="foot mb-2">
            來探索台北這座城市中的藝術瑰寶吧！
          </div>
        </div>
  
        {/* Map button */}
        <button className="btn btn-info mt-4 px-4" id="enter">進入地圖</button>
      </div>
    );
}

export default Introduction;

