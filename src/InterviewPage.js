import React, { useState, useEffect , useRef } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const InterviewPage = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);
  const location = useLocation();
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [questions, setQuestions] = useState([]);
  const jobTitle = location.state && location.state.jobTitle;

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startVideo();
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  // Function to start the timer
  const startTimer = () => {
    setIsTimerRunning(true);
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  // Effect to handle timer countdown
  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  // Function to format time to mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Function to fetch questions from Flask
  const fetchQuestions = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generateQuestions');
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="interview-page" style={{ border: '2px solid black', padding: '20px 100px 200px 30px' }}>
      <div className="home-text-section">
        <div style={{ display: 'flex' }}>
          <h1 className="underline-heading">
            {jobTitle}
          </h1>
          <div style={{ marginLeft: '50px', marginTop: '10px' }} className="session-button-container">
            <button className="secondary-button" onClick={isTimerRunning ? stopTimer : startTimer}>
              {isTimerRunning ? "End Session" : "Start Session"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="timer-rec-container">
          <div className="timer-container">
            <p className="timer">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  {isTimerRunning && <FontAwesomeIcon icon={faCircle} className="recording-dot" style={{ color: 'red' }} />}
                  {isTimerRunning && <div className="rec-top">&nbsp;REC&nbsp;</div>}
                  {formatTime(timer)}
                  {isTimerRunning && <span className="rec-dot"></span>}
                </div>
              </div>
            </p>
          </div>
        </div>
        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="video"
            style={{
              width: "75%",
              height: "55%",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              objectFit: "cover",
              transform: "scaleX(-1)" // Mirror the video horizontally
            }}
          />
       </div>
        <div className="questions-container" style={{ marginTop: '20px' }}>
          {/* Display fetched questions */}
          <h2>Question:</h2>
            <p> Tell me about a challenge or conflict you’ve faced at work, and how you dealt with it?</p>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          <span style={{ margin: '0 10px' }}></span> {}
          <h2>Your Answer:</h2>
          <p>Last year I was part of a committee that put together a training on conflict intervention in the workplace and the amount of pushback we got for requiring attendance really put our training to the test. </p>
        </div>
      </div>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button className="secondary-button">Generate Report</button>
        <button className="secondary-button">Download PDF Certification</button>
      </div>

    </div>
  );
};

export default InterviewPage;
