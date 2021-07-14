import React from "react";
import "./Home.css";
import santa from "../../Assets/santa.svg";
function Home() {
  return (
    <div className="homepage-container">
      <div className="homepage-inner">
        <div className="homepage-text">
          <span className="title">
            More than just presents, we spread love!
          </span>
          <span className="subtitle">
            Manage wishlists and decide on wonderful christmas gifts for your
            loved ones
          </span>
        </div>
        <div className="homepage-image">
          <img src={santa} alt="christmas" />
        </div>
      </div>
    </div>
  );
}

export default Home;
