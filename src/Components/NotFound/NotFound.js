import React from "react";
import "./NotFound.css";
import notFound from "../../Assets/not-found.svg";
function NotFound() {
  return (
    <div className="not-found-container">
      <div className="nf-inner">
        <img src={notFound} alt="not-found" />
        <span>Unexpected Error!</span>
      </div>
    </div>
  );
}

export default NotFound;
