import "./App.css";
import Home from "./Home";
import Work from "./Work";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Footer from "./Footer";
import SetUpInterviewForm from "./SetUpInterviewForm";
import InterviewPage from './InterviewPage';
import React from 'react';
import Navbar from "./Navbar";
import Login from "./login";
import CreateAccount from "./createaccount";
import CustomizeProfile from "./profileset";
import BlogPage from "./blogPage"
import BlogPost from "./blogPost";
import UserDashboard from "./UserDashboard";
import Dashboard from "./Dashboard"
import AboutUs from "./AboutUs"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/testimonial" element={<Navbar />} />
          <Route path="/contact" element={<Navbar />} />
          <Route path="/interview" element={<Navbar />} />
          <Route path="/interviewpage" element={<Navbar />} />
          <Route path="/setup-interview" element={<Navbar />} />
          <Route path="/login" element={<Navbar />} />
          <Route path="/createaccount" element={<Navbar />} />
          <Route path="/profileset" element={<Navbar />} />
          <Route path="/blogPage" element={<Navbar />} />
          <Route path="/blog/:blogId" element={<BlogPost />} />
          <Route path="/userDashboard" element={<Navbar />} />
          <Route path="/dashboard" element={<Navbar/>} />
          <Route path="/aboutus" element={<Navbar/>} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/interview" element={<SetUpInterviewForm />} />
          <Route path="/interviewpage" element={<InterviewPage />} />
          <Route path="/setup-interview" element={<SetUpInterviewForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/profileset" element={<CustomizeProfile />} />
          <Route path="/blogPage" element={<BlogPage />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUs/>} />

        </Routes>
        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/testimonial" element={<Footer />} />
          <Route path="/contact" element={<Footer />} />
          <Route path="/interview" element={<Footer />} />
          <Route path="/interviewpage" element={<Footer />} />
          <Route path="/setup-interview" element={<Footer />} />
          <Route path="/login" element={<Footer />} />
          <Route path="/createaccount" element={<Footer />} />
          <Route path="/profileset" element={<Footer />} />
          <Route path="/blogPage" element={<Footer />} />
          <Route path="/blog/:blogId" element={null} />
          <Route path="/userDashboard" element={<Footer />} />
          <Route path="/dashboard" element={<Footer />} />
          <Route path="/aboutus" element={<Footer/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
