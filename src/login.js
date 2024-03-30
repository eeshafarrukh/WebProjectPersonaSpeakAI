import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetOption, setResetOption] = useState('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    navigate('/dashboard');
  };

  const onRegisterClick = () => {
    navigate('/createaccount');
  };

  const onForgotPasswordClick = () => {
    const option = window.prompt('For password reset, type "email" to receive a link or "phone" to receive a code via SMS:', '');
    setResetOption(option);
    if (option === 'email') {
      // Implement or navigate to your email reset logic here
      console.log('Redirecting to email reset...');
      // navigate('/resetByEmail');
    } else if (option === 'phone') {
      // Implement or navigate to your phone reset logic here
      console.log('Redirecting to phone reset...');
      // navigate('/resetByPhone');
    } else {
      alert('Invalid option. Please enter "email" or "phone".');
    }
  };

  return (
    <div className="form-container" >
      <h1  style={{ marginTop: '20px',marginBottom: '20px' }} className="setupint-text">Log In</h1>

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

      <div style={{ marginTop: '15px' }}>
        <button onClick={onButtonClick} className="setup-button">&nbsp;&nbsp; &nbsp;  Log In&nbsp;&nbsp; &nbsp;  </button>
      </div>

      <div style={{ marginTop: '15px' }}> {/* Add spacing here */}

        <button onClick={onRegisterClick} className="setup-button">Create an Account</button>
      </div>

      <div style={{ marginTop: '15px',marginBottom: '20px' }}> {/* Add spacing here */}

        <button onClick={onForgotPasswordClick} className="setup-button">Reset Password</button>
      </div>
    </div>
  );
};

export default Login;
