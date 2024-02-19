import React from 'react';
import "react-step-progress-bar/styles.css";
import '../CostumerDashboardStyles/MultiStepProgressBar.css';
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = (props) => {
  return (
    <div>
      <ProgressBar percent={((props.step - 1) * 100) / 2} filledBackground="indigo">
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
            
              <div className="step-indicator">1</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
             
              <div className="step-indicator">2</div>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={`step ${accomplished ? "completed" : null}`}>
              
              <div className="step-indicator">3</div>
            </div>
          )}
        </Step>
     
      </ProgressBar>
    </div>
  );
}

export default MultiStepProgressBar;
