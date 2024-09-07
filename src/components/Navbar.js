// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/monster01.png'; //////////// logo

const Navbar = ({ name }) => {  // 接收 name 作為 props
    const navigate = useNavigate(); // 使用 useNavigate 鉤子

    const goBack = () => {
        navigate(-1); // 回到上一頁
    };

    return (
        <nav className="navbar">
            <div className="container">
                
                {/* 返回上一頁按鈕 */}
                <button onClick={goBack} className="btn btn-link">icon(jpg)</button>
                
                <Link to={'/home'} className="navbar-brand">
                    <img src={Logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
                    {' '}{name} {/* 顯示傳遞過來的 name */}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;