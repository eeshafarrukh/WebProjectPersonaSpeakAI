// UserDashboard.js

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "./UserDashboard.css";

const UserDashboard = () => {
  // Sample user data
  const userDetails = {
    name: "John Doe",
    age: 30,
    field: "Software Engineering",
    degree: "Bachelor's",
  };

  // Sample past interviews data
  const pastInterviews = [
    {
      date: "2024-03-01",
      interviewer: "Jane Smith",
      jobTitle: "Software Developer",
      successRate: "75%",
    },
    {
      date: "2024-02-15",
      interviewer: "Michael Johnson",
      jobTitle: "Data Scientist",
      successRate: "90%",
    },
    {
      date: "2024-01-20",
      interviewer: "Emily Brown",
      jobTitle: "Machine Learning Engineer",
      successRate: "80%",
    },
  ];

  return (
    <div className="dashboard-container">


      <div className="dashboard-content">
        <div className="user-profile">
          <h2>Welcome, {userDetails.name}!</h2>
          <div className="user-details">
            <div className="user-detail">
              <p><strong>Age:</strong> {userDetails.age}</p>
            </div>
            <div className="user-detail">
              <p><strong>Field:</strong> {userDetails.field}</p>
            </div>
            <div className="user-detail">
              <p><strong>Degree:</strong> {userDetails.degree}</p>
            </div>
          </div>
        </div>
        <div className="past-interviews">
          <h3>Past Interviews</h3>
          <ul>
            {pastInterviews.map((interview, index) => (
              <li key={index} className="interview-item">
                <p><strong>Date:</strong> {interview.date}</p>
                <p><strong>Interviewer:</strong> {interview.interviewer}</p>
                <p><strong>Job Title:</strong> {interview.jobTitle}</p>
                <p><strong>Success Rate:</strong> {interview.successRate}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;
