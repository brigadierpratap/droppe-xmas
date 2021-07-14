import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-inner">
        <span className="brand">Droppe Xmas</span>
      </div>
      <div className="footer-inner">
        <span className="title">Products</span>
        <Link to="/wishlists">Wishlists</Link>
        <Link to="/wishlists">Presents</Link>
        <Link to="/wishlists">Expense Manager</Link>
        <Link to="/wishlists">Customised Gifts</Link>
      </div>
      <div className="footer-inner">
        <span className="title">Company</span>
        <Link to="/wishlists">About</Link>
        <Link to="/wishlists">Out Team</Link>
        <Link to="/wishlists">Careers</Link>
        <Link to="/wishlists">Contact</Link>
      </div>
      <div className="footer-inner">
        <div className="social-icons">
          <a href="https://demo.com">
            <i class="fab fa-facebook-square fa-2x"></i>
          </a>
          <a href="https://demo.com">
            <i class="fas fa-envelope-square fa-2x"></i>
          </a>
          <a href="https://demo.com">
            <i class="fab fa-instagram-square fa-2x"></i>
          </a>
          <a href="https://demo.com">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
