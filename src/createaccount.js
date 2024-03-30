import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    try {
      const response = await axios.post('http://localhost:5000/add_user', {
        email,
        fullName,
        phone,
        dateOfBirth,
        gender,
        password,
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const onLoginClick = () => {
    navigate('/login');
  };

  // Style adjustments for center alignment
  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <div className="form-container">
      <h1 style={{ marginTop: '20px', marginBottom: '20px' }} className="setupint-text">Create an Account</h1>

      <div className="setupint-form-container">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="setupint-form-container">
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="setupint-form-container">
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>

      <div className="setupint-form-container">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="setupint-form-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="errorLabel">{emailError}</label>
      </div>

      <div className="setupint-form-container">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>

      <div className="setupint-form-container">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label className="errorLabel">{confirmPasswordError}</label>
      </div>

      <div style={{ marginTop: '15px', ...buttonContainerStyle }}>
        <button onClick={onButtonClick} className="setup-button">Create Account</button>
      </div>
      <div style={{ marginBottom: '20px', marginTop: '15px', ...buttonContainerStyle }}>
        <button onClick={onLoginClick} className="setup-button">&nbsp;&nbsp; &nbsp;  Log In&nbsp;&nbsp; &nbsp;</button>
      </div>
    </div>
  );
};

export default CreateAccount;
