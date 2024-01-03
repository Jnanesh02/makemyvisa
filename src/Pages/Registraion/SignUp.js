import React from "react";
import PhoneInput from "react-phone-input-2";
import backgroundImage from "../../assets/images/OJO4YQ0.jpg";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { State } from "country-state-city";

function SignUp() {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "91",
    serviceType: "",
    country: { countryCode: "IN",name:"India" }, // Default country code
    state: "", // New field for service type
  });

  useEffect(() => {
    // Fetch the list of states when the selected country changes
    if (inputs.country) {
      const statesForSelectedCountry = State.getStatesOfCountry(
        inputs.country.countryCode.toUpperCase()
      );
      const countryname = inputs.country.name;
      setStates(statesForSelectedCountry);
      setCountry(countryname);
    }
  }, [inputs.country]);

  const [states, setStates] = useState([]);
  const [Country, setCountry] = useState("");

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    country: "",
    state: "",
  });

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (inputs.firstname.trim() === "") {
      newErrors.firstname = "First Name is required";
    } else {
      // First Name length validation
      if (inputs.firstname.trim().length < 3) {
        newErrors.firstname = "First Name must be at least 3 characters long";
      }
      // First Name letters only validation
      const nameRegex = /^[a-zA-Z]+$/;
      if (!nameRegex.test(inputs.firstname)) {
        newErrors.firstname = "First Name should only contain letters";
      }
    }

    // Last Name validation
    if (inputs.lastname.trim() === "") {
      newErrors.lastname = "Last Name is required";
    } else {
      // Last Name length validation
      if (inputs.lastname.trim().length < 3) {
        newErrors.lastname = "Last Name must be at least 3 characters long";
      }
      // Last Name letters only validation
      const lastnameRegex = /^[a-zA-Z]+$/;
      if (!lastnameRegex.test(inputs.lastname)) {
        newErrors.lastname = "Last Name should only contain letters";
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Email is required";
    }

    // Password validation
    if (!inputs.password?.trim()) {
      newErrors.password = "Password is required";
    } else {
      // Password special characters validation
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(inputs.password)) {
        newErrors.password =
          "Password must contain at least one special character, one capital letter, and one number. Minimum length is 8 characters.";
      }
    }

    // Confirm Password validation
    if (!inputs.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (inputs.confirmPassword !== inputs.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone Number validation
    const mobileNumberRegex = /^[0-9]{10}$/;
    if (!mobileNumberRegex.test(inputs.phonenumber)) {
      newErrors.phonenumber = "Mobile Number should be a 10-digit number";
    }

    // Country validation
    if (!inputs.country || !Country) {
      newErrors.country = "Please select a valid country";
    }

    // State validation
    if (!inputs.state) {
      newErrors.state = "Please select a state";
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    const isValid = validateForm();
    if (isValid) {
      // Submit the form data or perform further actions
      console.log("Form submitted:", inputs);
    } else {
      console.log("Form contains errors. Please fix them.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      state: event.target.value,
    }));
  };

  const handleCountryChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      country: event.target.value,
    }));
  };

  const handlePhoneChange = (value, country) => {
    console.log(country);
    setInputs((prev) => ({
      ...prev,
      phonenumber: value,
      country: country,
    }));
  };

  return (
    <main>
      <section
        className="certificate-section sing-up"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="sign-up-text"> Sign Up </h2>
            </div>
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="login-forms">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstname"
                          value={inputs.firstname}
                          onChange={handleChange}
                        />
                        {errors.firstname && (
                          <div className="error-message">{errors.firstname}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastname"
                          value={inputs.lastname}
                          onChange={handleChange}
                        />
                        {errors.lastname && (
                          <div className="error-message">{errors.lastname}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={inputs.password}
                          onChange={handleChange}
                        />
                        {errors.password && (
                          <div className="error-message">{errors.password}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={inputs.confirmPassword}
                          onChange={handleChange}
                        />
                        {errors.confirmPassword && (
                          <div className="error-message">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="phonenumber" className="form-label">
                          Phone Number
                        </label>
                        <PhoneInput
                          name="phonenumber"
                          value={inputs.phonenumber}
                          onChange={(value, country) =>
                            handlePhoneChange(value, country)
                          }
                        />
                        {errors.phonenumber && (
                          <div className="error-message">{errors.phonenumber}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="state" className="form-label">
                          Select Country
                        </label>
                        <select
                          className="form-select form-control"
                          name="country"
                          onChange={handleCountryChange}
                          value={inputs.country}
                        >
                          <option value="" disabled>
                            Select country
                          </option>
                          <option value={Country}>{Country}</option>
                        </select>
                        {errors.country && (
                          <div className="error-message">{errors.country}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="state" className="form-label">
                        Select State
                      </label>
                      <select
                        className="form-select form-control"
                        name="state"
                        onChange={handleStateChange}
                        value={inputs.state}
                      >
                        <option value="" disabled>
                          Select State
                        </option>
                        {states.map((state) => (
                          <option key={state.id} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <div className="error-message">{errors.state}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary sign-up-sumbit-button"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
