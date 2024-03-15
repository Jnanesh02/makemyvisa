import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/images/OJO4YQ0.jpg";
import "react-phone-input-2/lib/style.css";
import { State } from "country-state-city";
import axios from "axios";
import SocialMediaAccount from "../SocialAccount/SocialMediaAccount";

function SignUp() {
  const navigate = useNavigate();
  const initialData ={
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: { countryCode: "in", name: "India" }, 
    state: "", 
  }
  const [inputs, setInputs] = useState(initialData);

  const [states, setStates] = useState([]);
  const [Country, setCountry] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    if (inputs.country) {
      const statesForSelectedCountry = State.getStatesOfCountry(
        inputs.country.countryCode.toUpperCase()
      );
      const countryname = inputs.country.name;
      setStates(statesForSelectedCountry);
      setCountry(countryname);
    }
  }, [inputs.country]);

  const validateForm = () => {
    const newErrors = {};
    if (inputs.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
    } else {
      if (inputs.firstName.trim().length < 3) {
        newErrors.firstName = "First Name must be at least 3 characters long";
      }
      const nameRegex = /^[a-zA-Z]+$/;
      if (!nameRegex.test(inputs.firstName)) {
        newErrors.firstName = "First Name should only contain letters";
      }
    }
    if (inputs.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
    } else {
      if (inputs.lastName.trim().length < 3) {
        newErrors.lastName = "Last Name must be at least 3 characters long";
      }
      const lastnameRegex = /^[a-zA-Z]+$/;
      if (!lastnameRegex.test(inputs.lastName)) {
        newErrors.lastName = "Last Name should only contain letters";
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Email is required";
    }
    if (!inputs.password?.trim()) {
      newErrors.password = "Password is required";
    } else {
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(inputs.password)) {
        newErrors.password =
          "Password must contain at least one special character, one capital letter, and one number. Minimum length is 8 characters.";
      }
    }
    if (!inputs.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (inputs.confirmPassword !== inputs.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    const mobileNumberRegex = /^\d{10,}$/;
    if (!mobileNumberRegex.test(inputs.phoneNumber)) {
      newErrors.phoneNumber = "Mobile Number should be a 10-digit number";
    }
    if (!inputs.country || !Country) {
      newErrors.country = "Please select a valid country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 



  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    const selectedCountry = State.getCountryByCode(selectedCountryCode);

    setInputs((prev) => ({
      ...prev,
      country: {
        countryCode: selectedCountryCode,
        name: selectedCountry?.name || "",
      },
    }));
  };
const handleInputChange = (name,value) => {
  setInputs((prev) => ({...prev, [name]: value}));
};
  const handlePhoneChange = (value, country) => {
    setInputs((prev) => ({
      ...prev,
      phoneNumber: value,
      country: country,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    console.log(inputs)
    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/customer/register`,
           inputs
        );
        if (response.data) {
          alert(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Form contains errors. Please fix them.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <main>
      <section
        className="certificate-section sing-up"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container-fluid  signupForm">
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
                        <input
                          placeholder="First Name"
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={inputs.firstName}
                          onChange={(e) => handleInputChange(e.target.name,e.target.value)}
                        />
                        {errors.firstName && (
                          <div className="error-message">
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <input
                          placeholder="Last Name"
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={inputs.lastName}
                          onChange={(e) => handleInputChange(e.target.name,e.target.value)}

                        />
                        {errors.lastName && (
                          <div className="error-message">{errors.lastName}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <input
                        placeholder="Email"
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={(e) => handleInputChange(e.target.name,e.target.value)}

                      />
                      {errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            value={inputs.password}
                            onChange={(e) => handleInputChange(e.target.name,e.target.value)}

                          />
                          <span
                            className="input-group-text"
                            onClick={togglePasswordVisibility}>
                            <i
                              className={`fas ${
                                showPassword ? "fa-eye-slash" : "fa-eye"
                              }`}></i>
                          </span>
                        </div>
                        {errors.password && (
                          <div className="error-message">{errors.password}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            placeholder="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={(e) => handleInputChange(e.target.name,e.target.value)}

                          />
                          <span
                            className="input-group-text"
                            onClick={togglePasswordVisibility}>
                            <i
                              className={`fas ${
                                showPassword ? "fa-eye-slash" : "fa-eye"
                              }`}></i>
                          </span>
                        </div>
                        {errors.confirmPassword && (
                          <div className="error-message">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <PhoneInput
                          placeholder="Phone Number"
                          name="phoneNumber"
                          value={inputs.phoneNumber}
                          onChange={(value, country) =>
                            handlePhoneChange(value, country)
                          }
                        />
                        {errors.phoneNumber && (
                          <div className="error-message">
                            {errors.phoneNumber}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <select
                          placeholder="Select Country"
                          className="form-select form-control"
                          name="country"
                          onChange={handleCountryChange}
                          value={inputs.country.countryCode}>
                          <option value="" disabled>
                            Select country
                          </option>
                          <option
                            key={inputs.country.countryCode}
                            value={inputs.country.countryCode}>
                            {inputs.country.name}
                          </option>
                        </select>
                        {errors.country && (
                          <div className="error-message">{errors.country}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <select
                        placeholder="Select State"
                        className="form-select form-control"
                        name="state"
                        onChange={(e)=> handleInputChange(e.target.name,e.target.value)}
                        value={inputs.state}>
                        <option value="" disabled>
                          Select State
                        </option>
                        {states.map((state, index) => (
                          <option key={index} value={state.name}>
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
                      className="btn btn-primary sign-up-sumbit-button">
                      Submit
                    </button>
                  </form>
                  <SocialMediaAccount />
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
