import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
    return (
        <div className="ui primary pointing menu" style={{ borderRadius: "0" }}>
            <Link to="/" className="header item">
                Stream
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All Streams
                </Link>
                <div className="item">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    );
};

export default Header;
