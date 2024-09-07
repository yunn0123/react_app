import React from 'react';
//import './css/introduction.css';
import { Link } from 'react-router-dom';
// Import images
import TownPassEllipse from '../img/TownPass_Ellipse.png';
import PosterImage from '../img/poster.png';

function Introduction() {
    return (
      <div className="container mt-5" id="basic">
        {/* Main card bar */}
        <div className="card text-center" style={{ border: '1px solid #ccc', boxShadow: '5px 5px 15px rgba(0,0,0,0.1)' }}>
            <img 
                className="image rounded" 
                src={TownPassEllipse} 
                alt="TownPass Logo" 
                style={{ width: '60px', height: '60px', position: 'absolute', top: '0px', left: '0px' }} 
              />
            {/* Card header - Align logo and title */}
            <div className="text-center mt-4">
              <h2 className="mb-0 font-H1-semibold" style={{ color: '#46A5E0', textAlign: 'center' }}>
                藝通台北
              </h2>
              <span className="font-H2-regular" style={{ color: '#5E6D76', textAlign: 'center' }}>公共裝置藝術</span>
            </div>

          {/* Card body */}
          <div className="card-body text-start" style={{ padding: '1rem 1.5rem' }}>
            <p className="card-text font-Body-regular" style={{ color: '#4D4D4D' }}>
              探索城市中的藝術美景，藝術體驗台北的獨特魅力！
              台北市各戶外公共藝術地標，已經超過1000件作品，來為城市帶來活力與創意。
              若您想探索這些藝術地點，請使用手機定位系統。
              <br />
            </p>
            {/* Poster image with adjusted usage */}
            <img 
              className="rounded mx-auto d-block" 
              src={PosterImage} 
              alt="海報" 
              style={{ maxWidth: '100%', height: 'auto', margin: '20px 0' }} 
            />
            {/* Notification / warning */}
            <div className="alert alert-warning text-center font-H3-regular" role="alert" style={{ backgroundColor: '#FFF9E6', color: '#856404', borderColor: '#FFD480' }}>
              本服務將根據您當前的手機定位，找到附近的公共藝術作品。
              請開啟GPS定位服務。
            </div>
          </div>

          {/* Card footer */}
          <div className="foot text-center mb-5 font-Body-regular">
            快來探索台北這座城市中的藝術瑰寶吧！
          </div>
        </div>

        {/* Link to Map Page */}
        <Link to="/map" className="btn btn-info mt-3 w-100 font-H3-semibold" style={{ backgroundColor: '#5AB4C5', border: 'none', color: 'white', padding: '10px' }}>
          進入地圖
        </Link>
        <Link to="/check-in-history" className="btn btn-info mt-3 w-100 mb-5 font-H3-semibold" style={{ backgroundColor: '#5AB4C5', border: 'none', color: 'white', padding: '10px' }}>
          打卡記錄
        </Link>
      </div>
    );
}

export default Introduction;
