import React, { useState, useEffect } from 'react';
import MultiStepProgressBar from './MultiStepProgressBar';
import ApplicationForm from './ApplicationForm';


function VisaStatus() {
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Set the initial index based on data.status when the component mounts
    const data = {
      "status": "assign"
    };
    switch (data.status) {
      case "submitted":
        setIndex(2);
        break;
      case "assign":
        setIndex(3);
        break;
      case "completed":
        setIndex(4);
        break;
      default:
        setIndex(1);
        break;
    }
  }, []);

 


  const handleReset = () => {
    setIndex(1);
    setSubmitted(false);
  };

  const renderFormStep = () => {
    switch (index) {
      case 1:
        return <ApplicationForm  />;
      case 2:
        return <Step stepNumber={3} stepName="Document Assigned" />;
      case 3:
        return <Step stepNumber={3} stepName="Document Assigned" />;
      default:
        return null;
    }
  };

  const Step = ({ stepNumber, stepName }) => {
    return (
      <div>
        <p>Step {stepNumber}: {stepName}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row m-5">
          <div className="col align-self-center">
            <MultiStepProgressBar step={index} />
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-body">
              {submitted ? (
                <div>
                  <p>Your answers have been submitted!</p>
                  <button className="btn btn-primary" onClick={handleReset}>Start Over</button>
                </div>
              ) : renderFormStep()}
            </div>
            <div className="card-footer d-flex justify-content-between">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaStatus;
