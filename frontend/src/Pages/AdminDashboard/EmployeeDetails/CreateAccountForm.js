// CreateAccountForm.js
import React, { useState } from "react";

const CreateAccountForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ firstName, lastName });
    setFirstName("");
    setLastName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateAccountForm;
