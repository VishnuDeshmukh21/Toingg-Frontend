import React, { useState } from 'react';
import axios from '../../api';

const CallsPage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [callData, setCallData] = useState({
    name: '',
    phoneNumber: '',
    campID: '',
  });
  const [callId, setCallId] = useState('');
  const [response, setResponse] = useState('');

  const handleButtonClick = (formName) => {
    setActiveForm(formName);
    setResponse('');
  };

  const handleInputChange = (e) => {
    setCallData({ ...callData, [e.target.name]: e.target.value });
  };

  const handleCallIdChange = (e) => {
    setCallId(e.target.value);
  };

  const handleMakeCall = async () => {
    try {
      const res = await axios.post('/calls/make', callData);
      setResponse(`Call made successfully: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setResponse(`Error making call: ${error.response.data.error}`);
    }
  };

  const handleGetCallStatus = async () => {
    try {
      const res = await axios.get(`/calls/status?callId=${callId}`);
      setResponse(`Call status: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setResponse(`Error getting call status: ${error.response.data.error}`);
    }
  };

  const handleGetCallTranscription = async () => {
    try {
      const res = await axios.get('/calls/transcription', { params: { callId } });
      setResponse(`Call transcription: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setResponse(`Error getting call transcription: ${error.response.data.error}`);
    }
  };

  const handleGetPostAnalysis = async () => {
    try {
      const res = await axios.get('/calls/post_analysis', { params: { callId } });
      setResponse(`Post-call analysis: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setResponse(`Error getting post-call analysis: ${error.response.data.error}`);
    }
  };

  return (
    <div className="container">
      <div className="button-group">
        <button
          className={`nav-button ${activeForm === 'makeCall' ? 'active' : ''}`}
          onClick={() => handleButtonClick('makeCall')}
        >
          Make Call
        </button>
        <button
          className={`nav-button ${activeForm === 'callStatus' ? 'active' : ''}`}
          onClick={() => handleButtonClick('callStatus')}
        >
          Call Status
        </button>
        <button
          className={`nav-button ${activeForm === 'callTranscription' ? 'active' : ''}`}
          onClick={() => handleButtonClick('callTranscription')}
        >
          Get Call Transcription
        </button>
        <button
          className={`nav-button ${activeForm === 'postAnalysis' ? 'active' : ''}`}
          onClick={() => handleButtonClick('postAnalysis')}
        >
          Post-call Analysis
        </button>
      </div>

      <div className="form-container">
        {activeForm === 'makeCall' && (
          <div>
            <h2>Make a Call</h2>
            <input
              type="text"
              name="name"
              value={callData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="phoneNumber"
              value={callData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <input
              type="text"
              name="campID"
              value={callData.campID}
              onChange={handleInputChange}
              placeholder="Campaign ID"
            />
            <button className="action-button" onClick={handleMakeCall}>
              Make Call
            </button>
          </div>
        )}

        {activeForm === 'callStatus' && (
          <div>
            <h2>Get Call Status</h2>
            <input
              type="text"
              value={callId}
              onChange={handleCallIdChange}
              placeholder="Call ID"
            />
            <button className="action-button" onClick={handleGetCallStatus}>
              Get Call Status
            </button>
          </div>
        )}

        {activeForm === 'callTranscription' && (
          <div>
            <h2>Get Call Transcription</h2>
            <input
              type="text"
              value={callId}
              onChange={handleCallIdChange}
              placeholder="Call ID"
            />
            <button className="action-button" onClick={handleGetCallTranscription}>
              Get Call Transcription
            </button>
          </div>
        )}

        {activeForm === 'postAnalysis' && (
          <div>
            <h2>Post-call Analysis</h2>
            <input
              type="text"
              value={callId}
              onChange={handleCallIdChange}
              placeholder="Call ID"
            />
            <button className="action-button" onClick={handleGetPostAnalysis}>
              Get Post-call Analysis
            </button>
          </div>
        )}

        {response && (
          <div className="response-container">
            <h3>Response</h3>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallsPage;
