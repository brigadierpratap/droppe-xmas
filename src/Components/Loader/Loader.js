import React from "react";
import loading from "../../Assets/giphy.webp";

function Loader() {
  return (
    <div className="loader">
      <img src={loading} alt="loader" />
    </div>
  );
}

export default Loader;
