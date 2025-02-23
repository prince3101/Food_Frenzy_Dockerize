import React from "react";
import prince from "../assets/images/Prince.jpeg";
import yash from "../assets/images/Yash.jpeg";
import team from "../assets/images/Team.jpeg";

const About = () => {
  return (
    <div className="container">
      <div className="about-main">
        <div className="about-text">
          <h3>About us</h3>
          <h1>Hey! We're FoodFrenzy and we help restaurant</h1>
          <img src="https://media.istockphoto.com/id/1081790292/vector/restaurant-staff-characters-design-include-chef-assistants-manager-waitress-professionals.jpg?s=612x612&w=0&k=20&c=WwuLspU3iOpCZx12KtjVZ89H_sXZBN0BDqBVuIJov7M=" />
        </div>

        {/* <div className="pepole">
          <h2>People Behind FoodFrenzy </h2>
          <p>Meet the masterminds that pulled all-nighters to make the dream happen</p>
        </div> */}

        {/* <div className="about-img">
          <div className="ceo">
            <img src={prince} />
            <h4>Prince Kansagra</h4>
            <p>Co-founder & CEO</p>
          </div>
          <div className="pune">
            <img src={yash} />
            <h4>Yash Parikh</h4>
            <p>Co-founder</p>
          </div>
        </div> */}


        <div className="foodfrenzy">
          <div className="frenzy-img">
            <img src="https://d28ewddc5mocr5.cloudfront.net/images/about/B2B-food-delivery.webp"/>
          </div>
          <div className="frenzy-text">
            <p>When Food Frenzy first avatar came into being in 2024, it was a simple B2B food delivery model that took bulk food orders from the corporates & passed them forward to the restaurants. But soon, our founders realised that the restaurants they worked with were not living up to their potential and were shutting down forever. Primarily it was due to a lack of coherent technology that could support their daily operations. Their billing machines were as bulky, tedious and old as time. Due to this, the restaurants never had an actual estimate of their profit margins & expenses. Back then, restaurants were suffering more than growing.</p>

            <p>This was when our founders decided to build a robust, user-friendly & cost-effective billing software for SMB restaurants that will automate everyday operations and push businesses towards sustainability.</p>

<p>
And now, a decade into the industry, we have realized our dream of becoming the ideal restaurant billing solution provider to all & every kind of food service business in India.</p>
          </div>
        </div>


        <div className="about-spli">
          <div className="text-frenzy">
            <h3>Simplicity</h3>
            <p>We believe in creating solutions that come without any confusing instruction manuals</p>
          </div>
          <div className="simp-img">
            <img src="https://d28ewddc5mocr5.cloudfront.net/images/about/Simplicity.webp"/>
          </div>
        </div>

        <div className="img-main">
          <div className="man-img">
            <img src="https://d28ewddc5mocr5.cloudfront.net/images/about/Simplicity-1.webp"/>
          </div>
          <div className="man-img">
            <img src="https://d28ewddc5mocr5.cloudfront.net/images/about/Simplicity-2.webp"/>
          </div>
        </div>

        <div className="price-main">
          <div className="price-text">
            <h3>Pricing</h3>
            <p>We are a strong believer in transparent & cost-effective pricing of technology</p>
          </div>
          <div className="price-mg">
            <img src="https://d28ewddc5mocr5.cloudfront.net/images/about/pricing.webp"/>
          </div>
        </div>

        <div className="cost-img">
          <img src="https://media.istockphoto.com/id/1367679452/photo/reduce-cost.jpg?s=612x612&w=0&k=20&c=M2TLcerMiT8S8jWhgaQcJuk5fOO1xwF8VK4izLy9yzc="/>
        </div>


        
      </div>
    </div>
  );
};

export default About;
