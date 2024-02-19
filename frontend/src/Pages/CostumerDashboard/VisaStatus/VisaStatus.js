import React, { useState } from 'react';
import MultiStepProgressBar from './MultiStepProgressBar';
import ApplicationForm from './ApplicationForm';


function VisaStatus() {
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalPages = 3;

  const handleNext = () => {
    if (index < totalPages) {
      setIndex(index + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
  };

  const handleReset = () => {
    setIndex(1);
    setSubmitted(false);
  };

  const handlePageUpdate = (formData) => {
    console.log(`Step ${index} data:`, formData);
    // You can update state or perform any action with the form data here
  };

  const renderFormStep = () => {
    switch (index) {
      case 1:
        return <ApplicationForm onPageUpdate={handlePageUpdate} />;
      case 2:
        return 0;
      case 3:
        return 0;
      default:
        return null;
    }
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
              <button className="btn btn-secondary" onClick={handlePrev} disabled={index === 1}>Previous</button>
              <button className="btn btn-primary" onClick={handleNext}>
                {index === totalPages ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaStatus;
