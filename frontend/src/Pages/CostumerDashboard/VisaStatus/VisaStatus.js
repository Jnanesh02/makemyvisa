import React, { useState, useEffect, useRef } from 'react';
import MultiStepProgressBar from './MultiStepProgressBar';
import ApplicationForm from './ApplicationForm';

function VisaStatus() {
  const [index, setIndex] = useState(1);
  const [status, setStatus] = useState("");
  const cardRef = useRef(null); // Create a ref for the card element

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          status: 'submitted',
        };

        setStatus(data.status);

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setIndex(1);
      }
    };

    fetchData();
  }, []);

  const renderFormStep = () => {
    switch (index) {
      case 1:
        return <ApplicationForm />;
      case 4:
        return <p>Application completed!</p>;
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
          {status === "" && (
            <div className="card" ref={cardRef}> 
              <div className="card-body">
                {renderFormStep()}
              </div>
              {/* <div className="card-footer d-flex justify-content-between">
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VisaStatus;
