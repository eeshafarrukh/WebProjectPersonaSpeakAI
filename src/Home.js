import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import BannerBackground from "./home-banner-background.png";
import HomeLottie from "./home-lottie.json";
import Navbar from "./Navbar";
import Lottie from "react-lottie";
import SetUpInterviewPage from './SetUpInterviewForm'
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import SetUpInterviewForm from "./SetUpInterviewForm";
import InterviewPage from './InterviewPage';
const Home = () => {
  const navigate= useNavigate()
  const lottieOptions = {

    loop: true,
    autoplay: true,
    animationData: HomeLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="home-container">

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <Lottie options={lottieOptions} height={400} width={500} />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Personal Career Mentor and Interview Companion
          </h1>
          <p className="primary-text">
            Helping you become the best you.
          </p>


          <button onClick={()=>navigate("/setup-interview")} className="secondary-button">Practice Interview Now</button>



        </div>


      </div>
      <div>
        <Testimonial></Testimonial>
        <Contact></Contact>
      </div>
    </div>
  );
};

export default Home;
