import React from 'react';
import "react-step-progress-bar/styles.css";
import '../CostumerDashboardStyles/MultiStepProgressBar.css';
import { ProgressBar, Step } from "react-step-progress-bar";


const MultiStepProgressBar = (props) => {
  return (
    <div>
      <ProgressBar percent={((props.step - 1) * 100) / 3} filledBackground="#dd2817c8">
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 0 ?<i class="fa-solid fa-user"></i> : <i class="fa-solid fa-check"></i>}
              </div>
              <div className="step-label">Application Form</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 1 ? <i class="fa-solid fa-gear"></i> : <i class="fa-solid fa-check"></i>}
              </div>
              <div className="step-label">Processing</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 2 ? <i class="fa-solid fa-users"></i>: <i class="fa-solid fa-check"></i>}
              </div>
              <div className="step-label">Decision</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              <div className="step-indicator">
                {index === 3 ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-users"></i>}
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
