import React, { useState } from "react";
import "./PopupForm.css"; // Import the external CSS file

const questionsData = [
  {
    id: 1,
    question: "What is your favorite color?",
    options: ["Option 1", "Option 2", "Option 3"],
  },
  {
    id: 2,
    question: "How did you hear about us?",
    options: ["Option 1", "Option 2", "Option 3"],
  },
];

const PopupForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isFormOpen, setFormOpen] = useState(false);

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleOptionChange = (questionId, optionValue) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionValue,
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    console.log("Selected Options:", selectedOptions);
    closeForm();
  };

  const renderQuestion = () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    if (!currentQuestion) {
      return null;
    }

    return (
      <div className="question">
        <label
          htmlFor={`q${currentQuestion.id}`}
        >{`Question ${currentQuestion.id}: ${currentQuestion.question}`}</label>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <input
                type={currentQuestion.options.length === 1 ? "text" : "radio"}
                id={`q${currentQuestion.id}_option${index + 1}`}
                name={`q${currentQuestion.id}`}
                value={option}
                checked={selectedOptions[currentQuestion.id] === option}
                onChange={() => handleOptionChange(currentQuestion.id, option)}
              />
              <label htmlFor={`q${currentQuestion.id}_option${index + 1}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <button className="openButton" onClick={openForm}>
          <strong>Open Form</strong>
        </button>
      </div>
      {isFormOpen && (
        <div>
          <div className="backdrop" onClick={closeForm}></div>
          <div className="formPopup">
            <form action="/submit_form" className="formContainer">
              {renderQuestion()}
              {currentQuestionIndex < questionsData.length - 1 ? (
                <button
                  type="button"
                  className="btnFormSubmit"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="btnFormSubmit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
              <button
                type="button"
                className="btnFormSubmit cancel"
                onClick={closeForm}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
