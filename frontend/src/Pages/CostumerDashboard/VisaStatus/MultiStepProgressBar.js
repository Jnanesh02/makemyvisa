import React, { useState,createContext } from 'react';
import "react-step-progress-bar/styles.css";
import '../CostumerDashboardStyles/MultiStepProgressBar.css';
import { ProgressBar, Step } from "react-step-progress-bar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const MultiStepProgressBar = (props) => {
  const [steps] = useState([
    { icon: faUser, label: "Application Form" },
    { icon: faCog, label: "Processing" },
    { icon: faCheckCircle, label: "Decision" },
    { icon: faCheckCircle, label: "Final Step" }
  ]);
  const context = createContext();

  return (
    <div>
      <context.Provider value={steps}>
      <ProgressBar percent={((props.step - 1) * 100) / 3} filledBackground="#dd2817c8">
        {steps.map((step, index) => (
          <Step key={index} transition="scale">
            {({ accomplished }) => (
              <div className={`step ${accomplished ? "completed" : null}`}>
                <div className="step-indicator">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <div className="step-label">{step.label}</div>
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>
      </context.Provider>
    </div>
  );
}

export default MultiStepProgressBar;
