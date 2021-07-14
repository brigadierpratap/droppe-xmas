import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(true);
  const [mobile, setMobile] = React.useState(
    window.innerWidth < 768 ? true : false
  );
  const key = props.location.key;
  const handleResize = e => {
    if (window.innerWidth <= 768) setMobile(true);
    else if (window.innerWidth > 768) setMobile(false);
  };
  React.useEffect(() => {
    setNavbarOpen(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [key]);
  return (
    <div className="navbar-outer">
      <Link to="/" className="navbar-brand">
        Droppe Xmas
      </Link>
      {mobile && (
        <span
          onClick={e => {
            setNavbarOpen(prev => !prev);
          }}
          className="hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      )}
      <span
        className="navlinks-cont"
        style={{
          maxHeight: navbarOpen ? "20em" : 0,
          paddingBlock: navbarOpen ? "1em" : 0,
          zIndex: 1,
        }}
      >
        <span className="navlinks-left">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/wishlists">Wishlists</NavLink>
          <NavLink to="/about">About</NavLink>
        </span>
        <span
          style={{
            display: mobile ? "flex" : "none",
            width: "100%",
            height: "2px",
            backgroundColor: "rgb(158, 154, 167)",
            transform: "translateY(1em)",
          }}
        ></span>
        <span className="navlinks-right">
          <NavLink className="login" to="/login">
            Login
          </NavLink>
          <NavLink className="signup" to="/signup">
            Sign Up
          </NavLink>
        </span>
      </span>
    </div>
  );
}

export default withRouter(Navbar);
