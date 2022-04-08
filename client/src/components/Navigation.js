import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="navbar sticky-top navbar-light" style={{backgroundColor: ""}}>
            <ul>
            <li><Link to="/">Home</Link>{" "}</li>

            <li><Link to="/about">About</Link>{" "}</li>

            <li><Link to="/create">Create Post</Link>{" "}</li>

            <li><Link to="/contact">Contact</Link>{" "}</li>
            </ul>
        </nav>
    );
}