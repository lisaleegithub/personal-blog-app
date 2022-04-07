import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="navbar sticky-top navbar-light bg-light" style={{backgroundColor: ""}}>
            <ul>
                <Link to="/">Home</Link>{" "}

                <Link to="/about">About</Link>{" "}

                <Link to="/create">Create Post</Link>{" "}

                <Link to="/contact">Contact</Link>{" "}
            </ul>
        </nav>
    );
}