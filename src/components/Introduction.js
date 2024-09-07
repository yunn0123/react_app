// Introduction.js
import React from 'react';
import { Link } from 'react-router-dom';

function Introduction() {
    return (
        <div id="introduction-container">
            {/* Main card */}
            <div id="main-card">
                {/* Card header */}
                <div id="card-header">
                    <h2 id="title">藝通台北</h2>
                </div>

                {/* Card body */}
                <div id="card-body">
                    <p id="description">
                        探索城市中的藝術美景，藝術體驗台北的獨特魅力！
                        <br />
                        台北市各戶外公共藝術地標，已經超過1000件作品，來為城市帶來活力與創意。
                        <br />
                        若您想探索這些藝術地點，請使用手機定位系統。
                        <br />
                    </p>

                    {/* Notification / warning */}
                    <div id="notification">
                        本服務將根據您當前的手機定位，找到附近的公共藝術作品。
                        請使用智慧定位服務並進行打卡。
                    </div>
                </div>

                {/* Card footer */}
                <div id="card-footer">
                    來探索台北這座城市中的藝術瑰寶吧！
                </div>
            </div>
            {/* Link to Map Page */}
            <Link to="/map" id="map-link">進入地圖</Link>
        </div>
    );
}

export default Introduction;
