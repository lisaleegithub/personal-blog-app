import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="navbar sticky-top navbar-light" style={{ backgroundColor: "" }}>
            <p className="nav-logo">
                <img src="logo.png" alt="logo" className="logo"/>{" "}Lisa's Hiking Blog{" "}<img src="logo.png" alt="logo" className="logo"/>
            </p>
            <ul>
                <li><Link to="/">Home</Link>{" "}</li>

                <li><Link to="/about">About</Link>{" "}</li>

                <li><Link to="/create">Create</Link>{" "}</li>

                <li><Link to="/contact">Contact</Link>{" "}</li>
            </ul>
        </nav>
    );
}