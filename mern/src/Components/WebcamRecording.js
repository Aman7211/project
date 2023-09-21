import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import jwtDecode from 'jwt-decode';

const WebcamRecording = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
  const decode = authToken ? jwtDecode(authToken) : null;
  const [isRecording, setIsRecording] = useState(false);

  const startRecordingHandler = () => {
    startRecording();
    setIsRecording(true);
  };

  const stopRecordingHandler = () => {
    stopRecording();
    setIsRecording(false);
     console.log(mediaBlobUrl);
    
  };

  useEffect(() => {
    if (mediaBlobUrl) {

      // form data is used to write the key value pair as we passed on postman for backend interacytion
        const formData = new FormData();
        formData.append('videoFile', mediaBlobUrl);
        formData.append('name', decode.user.name);
  
        fetch('https://webcam-srkc.onrender.com/api/v1/upload/videoUpload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert('Video uploaded successfully.');
            } 
          })
          .catch((error) => {
            console.error('An error occurred while uploading the video:', error);
          });
      
    }
  }, [mediaBlobUrl]);

  return (
    <div>
      {authToken ? (
        <div>
          <h2 className='text-center text-danger py-5'><u>Webcam Recording</u></h2>
          <div className='text-center'>
            {isRecording ? (
              <div>
                <button onClick={stopRecordingHandler} className='bg-primary text-white py-3 px-5 fs-4 my-3'>Stop Recording</button>
              </div>
            ) : (
              <div>
                <button onClick={startRecordingHandler} className='bg-primary text-white py-3 px-5 fs-4 my-3'>Start Recording</button>
              </div>
            )}
            {mediaBlobUrl && (
              <video id="recordedVideo" src={mediaBlobUrl} controls autoPlay loop />
            )}
          </div>
        </div>
      ) : (
        <div className='text-center fs-5 text-danger my-5 bold-text'>
          PLEASE LOGIN TO START RECORDING USING WEBCAM AND SCREEN RECORDING..
          <p className='my-3'> Note: The video that was recorded by Webcam gets stored on Cloudinary and in the MongoDB Database.</p>
          <p className='my-3'> The video that was recorded by Screen Share gets stored only in localStorage.</p>
          <p className='my-5'> Note: Ignore this error - "There is already an encoder stored which handles exactly the same mime types."</p>
        </div>
      )}
    </div>
  );
};

export default WebcamRecording;
