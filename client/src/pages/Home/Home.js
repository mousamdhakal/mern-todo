import React from 'react';

import './Home.css';
import NavBar from '../../Containers/Navbar/Navbar';

export default function Home() {
  return (
    <>
      <NavBar />
      <section className="welcome">
        <div className="container">
          <div className="welcome__text">
            <h2 className="welcome__heading">
              Welcome to simple MERN todo app.
            </h2>
            <p className="welcome__paragraph">Login or Sign Up to continue.</p>
          </div>
        </div>
        <p className="footer-text">Created with MERN stack by Mousam Dhakal</p>
      </section>
    </>
  );
}
