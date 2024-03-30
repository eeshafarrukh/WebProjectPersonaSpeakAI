import React, { useState } from "react";
import Logo from "./Logo.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios


const SetUpInterviewForm = () => {
  const [formData, setFormData] = useState({
    job_title: '',
    job_skills: [],
    years_experience: '',
    job_level: '',
    keywords: [],
    industry: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'job_skills' || name === 'keywords') {
      // Split input string by comma and store as array
      setFormData({
        ...formData,
        [name]: value.split(',').map(skill => skill.trim())
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async () => {
    for (const key in formData) {
      if (formData[key] === '' || (Array.isArray(formData[key]) && formData[key].length === 0)) {
        console.error(`Error: ${key} field is empty`);
        // You can display an error message to the user if needed
        return;
      }
    }
    try {
      // Make POST request to Flask route
     // const response = await axios.post('http://localhost:5000/submit_interview', formData);
      //console.log(response.data); // Log response from Flask
      // Redirect to the interview page upon successful form submission
      navigate("/interviewpage", { state: { jobTitle: formData.job_title } });

      // Call the /generateQuestions route after successful form submission
     // await axios.post('http://localhost:5000/generateQuestions', formData);
    } catch (error) {
      console.error('Error submitting interview:', error);
      // Handle errors
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="setupint-logo-container">
          <img src={Logo} alt="" />
        </div>
        <h1 className="setupint-text">Please answer the following questions to set up a mock interview.</h1>

        <div className="setupint-form-container">
          <input type="text" name="job_title" placeholder="Job Title" onChange={handleInputChange} />
        </div>

        <div className="setupint-form-container">
          <input type="text" name="job_skills" placeholder="Job Skills (separate by comma)" onChange={handleInputChange} />
        </div>

        <div className="setupint-form-container">
          <input type="number" name="years_experience" placeholder="Years of Experience" onChange={handleInputChange} />
        </div>

        <div className="setupint-form-container">
          <label htmlFor="jobLevel"> Job Level</label>
          <div>
            <select id="jobLevel" name="job_level" onChange={handleInputChange}>
              <option value="" disabled>Select a Job Level</option>
              <option value="Internship">Internship</option>
              <option value="Junior/Associate">Junior/Associate</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Manager">Manager</option>
              <option value="Head of Department">Head of Department</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
        </div>

        <div className="setupint-form-container">
          <input type="text" name="keywords" placeholder="Keywords Mentioned in Job Description" onChange={handleInputChange} />
        </div>

        <div className="setupint-form-container">
          <input type="text" name="industry" placeholder="Industry/Department" onChange={handleInputChange} />
        </div>

        <div>
          <button onClick={handleSubmit} className="setup-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default SetUpInterviewForm;
