import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

const ScreenShareRecording = () => {

    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    console.log(authToken);
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true });
  
    const [isRecording, setIsRecording] = useState(false);
  
    const StartRecordinghandler = () => {
      startRecording();
      setIsRecording(true);
    };
  
    const StopRecordinghandler = () => {
      stopRecording();
      setIsRecording(false);
    };
  
    return (
      <div>
         { authToken ? (
            <div>
        <h2 className="text-center text-danger py-5">
          <u>Screen Share Recording</u>
        </h2>
        <div className="text-center">
          {isRecording ? ( <div>
              <button onClick={StopRecordinghandler} className="bg-primary text-white py-3 px-5 fs-4 my-3" >
                Stop Recording
              </button>
            </div>
          ) : (
            <div>
              <button onClick={StartRecordinghandler} className="bg-primary text-white py-3 px-5 fs-4 my-3">
               Start Screen Share
              </button>
            </div>
          )}
          {mediaBlobUrl && (
            <video src={mediaBlobUrl} controls autoPlay loop />
          )}
        </div>
        </div>
         ) : <div className='text-center fs-5 text-danger my-5 bold-text'>Lets Get Started !!!1</div>}
      </div>
    );
  };
  
  export default ScreenShareRecording;
  