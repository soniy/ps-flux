import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {
    return (
        <div className="jumbotron">
            <h1>Pluralsight Administration</h1>
            <p>React, Flux and React router from ultra-responsive web apps.</p>
            {/* <a href="/about">About</a> */}
            <Link to="about" className="btn btn-primary">About</Link>
        </div>
    );
}

export default HomePage;