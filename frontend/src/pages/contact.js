import React from "react";
import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="container">
        <div className="c-main">
          <div className="c-text">
            <p className="support">Support</p>
            <h1>
              Hi! We are here to help{" "}
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/support/emoji-support.webp"></img>
            </h1>
            <p>Get relevant and instant solutions for your FoodFrenzy POS-related troubles!</p>

            <button>
              <NavLink className="link2" to="/contact_me">
                Contact with us
              </NavLink>
            </button>
          </div>
          <div className="c-img">
            <img src="https://d28ewddc5mocr5.cloudfront.net/images/support/support-hero_lg.webp" />
          </div>
        </div>

        <div className="calling">
          <div className="calls">
            <div className="issue-text">
              <h1>Got any issue, get in touch</h1>
            </div>
            <div className="training">
              <div className="phone">
                <img src="https://d28ewddc5mocr5.cloudfront.net/images/support/Call-us.webp" />
                <p className="t-text">Call us</p>
                <p>+91 6359094043</p>
              </div>
              <div className="email">
                <img src="https://d28ewddc5mocr5.cloudfront.net/images/support/Email-on.webp" />
                <p className="t-text">Email on</p>
                <p>princekansagra1@gmail.com</p>
              </div>
              <div className="email">
                <img src="https://d28ewddc5mocr5.cloudfront.net/images/support/Schedule-training.webp" />
                <p className="t-text">Schedule training</p>
                <p>yashparikh1502@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
