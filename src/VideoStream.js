import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoStream = () => {
  const [videoStream, setVideoStream] = useState('');

  useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/video');

        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        setVideoStream(url);
      } catch (error) {
        console.error('Error fetching video stream:', error);
      }
    };

    const intervalId = setInterval(fetchVideoStream, 100); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Gaze Tracking Video Stream</h1>
      {videoStream && <img src={videoStream} alt="Video Stream" />}
    </div>
  );
};

export default VideoStream;
