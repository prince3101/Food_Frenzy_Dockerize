import React from "react";
import Logo from "../assets/images/Logo.png"
import { NavLink } from "react-router-dom";

const footer = () => {
  return (
    <>
      <div className="main-footer">
        <div className="footer">
          <div className="footer-POS">
            <h3>POS</h3>
            <ul>
              <li>Billing</li>
              <li>Inventory</li>
              <li>KOT</li>
              <li>Table</li>
              <li>Contact</li>
              <li>About Us</li>
            </ul>
            <NavLink className="link2" to="/table">
            <button type="button" className="f_btn">
              Start Billing
            </button>
            </NavLink>
          </div>
          <div className="footer-POS">
            <h3>Outlet types</h3>
            <ul>
              <li>Fine Dine</li>
              <li>Cafe</li>
              <li>Food Court</li>
              <li>Cloud Kichen</li>
              <li>Ice Cream</li>
              <li>Bakery</li>
              <li>Pizza</li>
            </ul>
          </div>
          <div className="footer-POS">
            <h3>Resources</h3>
            <ul>
              <li>Pricing</li>
              <li>Career</li>
              <li>Support</li>
              <li>About Us</li>
            </ul>
          </div>
          <div className="footer-POS">
            <h3>Prince Food Services Private Limited</h3>
            <p>
              A Wing, Gopal Palace Near Shiromani Complex Nehru Nagar Circle, Circle, beside
              Satellite Road, near Jhansi ki Rani Statue, Ahmedabad, Gujarat 380015
            </p>
          </div>
        </div>
        <div className="follow-all">
          <div className="follow">
            <div className="f-logo">
              <img src={Logo} className="f-img"/>
              <i class="fa-brands fa-linkedin"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-facebook"></i>
            </div>
            <div className="f-phone">
              <i class="fa-solid fa-phone"></i>
              <p>+91 6359094043</p>
            </div>
            <div className="f-email">
              <i class="fa-regular fa-envelope"></i>
              <p>princekansagra1@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default footer;
