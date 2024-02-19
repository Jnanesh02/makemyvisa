import React from 'react';
import "react-step-progress-bar/styles.css";
import '../CostumerDashboardStyles/MultiStepProgressBar.css';
import { ProgressBar, Step } from "react-step-progress-bar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const MultiStepProgressBar = (props) => {
  return (
    <div>
      <ProgressBar percent={((props.step - 1) * 100) / 3} filledBackground="#dd2817c8">
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 0 ? <FontAwesomeIcon icon={faUser} /> : <FontAwesomeIcon icon={faCheckCircle} />}
              </div>
              <div className="step-label">Application Form</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 1 ? <FontAwesomeIcon icon={faCog} /> : <FontAwesomeIcon icon={faCheckCircle} />}
              </div>
              <div className="step-label">Processing</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 2 ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faTimesCircle} />}
              </div>
              <div className="step-label">Decision</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 3 ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faTimesCircle} />}
              </div>
              <div className="step-label">Final Step</div>
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
}

export default MultiStepProgressBar;
