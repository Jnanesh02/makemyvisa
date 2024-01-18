import React, { useState } from "react";

const CreateAccountForm = ({ onCreateAccount }) => {
  const initialEmployeeData = {
    firstName: "",
    lastName: "",
    contactDetails: "",
    email: "",
    role: "",
    address: "",
  };
  const [createEmployee, setCreateEmployee] = useState(initialEmployeeData);

  const onChangeInput = (event) => {
    event.preventDefault();
    setCreateEmployee({
      ...createEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      onCreateAccount(createEmployee);
      setCreateEmployee(initialEmployeeData);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-input">
      <input
        type="text"
        name="firstName"
        value={createEmployee.firstName}
        required
        placeholder="First Name:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <input
        type="text"
        name="lastName"
        value={createEmployee.lastName}
        placeholder="Last Name:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <input
        type="email"
        name="email"
        value={createEmployee.email}
        required
        placeholder="email:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <select
        type="text"
        name="role" // Name should match the property in the state
        value={createEmployee.role}
        required
        onChange={(e) => onChangeInput(e)}>
        <option value="admin">Admin</option>
        <option value="operation">Operations</option>
      </select>
      <br />
      <input
        type="text"
        name="contactDetails"
        value={createEmployee.contactDetails}
        placeholder="contactDetails:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <input
        type="text"
        name="address"
        value={createEmployee.address}
        placeholder="Address :"
        onChange={(e) => onChangeInput(e)}
      />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateAccountForm;