import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="navbar-text">
            <h1>Restaurant billing software that is 10x faster</h1>
            <p>
              A 3-click billing process that is smart, efficient, and user-friendly! It's time for
              you to upgrade to FoodFrenzy restaurant billing software.
            </p>
            <button type="button" className="nav-btn">
              <NavLink className="link2" to="/table">
              Start Billing
              </NavLink>
            </button>
          </div>
          <div className="nav-img">
            <img src="https://d28ewddc5mocr5.cloudfront.net/images/pos/Billing-hero_md.webp" />
          </div>
        </div>

        <div className="billing_text">
          <h1>An all-rounder restaurant billing software</h1>
        </div>
        <div className="explain-all">
          <div className="explain">
            <div className="explain-item">
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/customizable-bill-format.webp"></img>
              <h3>Customizable bill format</h3>
              <p>
                Print your restaurant logo, create bill break-ups, edit customer details or add a
                dynamic QR code for payments right at the billing counter - everything is possible
                with FoodFrenzy restaurant POS software
              </p>
            </div>

            <div className="explain-item">
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/multi-terminal-billing.webp"></img>
              <h3>Multi-terminal billing</h3>
              <p>
                In need of multiple billing terminals for your different areas and menus? Don’t
                worry! FoodFrenzy POS lets you easily create multiple billing counters and sync them
                with one master station so that your captains can generate KOTs and settle bills
                from the right station.
              </p>
            </div>

            <div className="explain-item">
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/KOT-Management.webp"></img>
              <h3>Station-wise kot printing</h3>
              <p>
                Got different cooking stations? No worries! Assign a unique printer to every station
                and send KOTs to the respective stations. Smoothly sync them all with the master POS
                to keep track of all your orders and their running status
              </p>
            </div>

            <div className="explain-item">
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/table-managment.webp"></img>
              <h3>Table and area management</h3>
              <p>
                Big restaurants, big problems. Minimise your problems by making your area and table
                management simple with FoodFrenzy restaurant POS. Configure different dine-in areas
                with their respective menus, service tax rates and customisable seating arrangements
              </p>
            </div>

            <div className="explain-item">
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/Taxes-Discounts.webp"></img>
              <h3>Configure taxes & discounts</h3>
              <p>
                Switch to a restaurant billing software that lets you easily configure and levy
                different taxes, update tax rates and offer discounts depending on your service
                types, regional norms and business needs!
              </p>
            </div>
          </div>
        </div>

        {/* Service part */}

        <div className="service-all">
          <div className="service">
            <div className="service-txt">
              <h2>Quick & simple</h2>
              <p>
                FoodFrenzy restaurant billing software works easily with any existing infrastructure
              </p>
            </div>
            <div className="service-img">
              <img src="https://d28ewddc5mocr5.cloudfront.net/images/pos/Quick-simple_md.webp" />
              <div className="plugging">
                <div className="service-item">
                  <img src="https://d28ewddc5mocr5.cloudfront.net/images/pos/Offline.webp" />
                  <p>Works offline, cloud-based software</p>
                </div>
                <div className="service-item">
                  <img src="https://d28ewddc5mocr5.cloudfront.net/images/pos/Any-hardware.webp" />
                  <p>Works on any hardware</p>
                </div>
                <div className="service-item">
                  <img src="https://d28ewddc5mocr5.cloudfront.net/images/pos/Core-Modules-Common.webp" />
                  <p>Works on major Operating systems</p>
                </div>
                <div className="service-item">
                  <img src="https://d28ewddc5mocr5.cloudfront.net/images/pos/Keyboard_touch.webp" />
                  <p>Keyboard / touchscreen view</p>
                </div>
                <div className="service-item">
                  <img src="https://d28ewddc5mocr5.cloudfront.net/images/pos/E-bill.webp" />
                  <p>E-bill receipts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
