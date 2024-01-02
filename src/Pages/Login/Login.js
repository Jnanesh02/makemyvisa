import React, { useState } from "react";
const Login = () => {
  const initialState = { email: "", password: "" };
  const [ userInputDetails, setuserInputDetails ] = useState(initialState);
  const handleInputDetails = (event) => {
    const { name, value } = event.target;
    setuserInputDetails({ ...userInputDetails, [name]: value });
  };
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  const facebookAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/facebook/callback`,
      "_self"
    );
  };

  const LinkedInAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/linkedin`, "_self");
  };
  return (
    <>
      
      <div>
        <section
          className="certificate-section sing-up"
          style={{ backgroundImage: "url(images/OJO4YQ0.jpg)" }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="sign-up-text"> Login </h2>
              </div>
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="login-forms">
                    <form>
                      <div className="mb-2">
                        <input
                          type="email"
                          placeholder="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          name="email"
                          value={userInputDetails.email}
                          onChange={(event) => {
                            handleInputDetails(event);
                          }}
                          required = "true"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="password"
                          id="exampleInputPassword1"
                          name="password"
                          value={userInputDetails.password}
                          onChange={(event) => {
                            handleInputDetails(event);
                          }}
                          required="true"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary sign-up-sumbit-button"
                      >
                        Submit
                      </button>
                    </form>
                    <div>
                    <h5 class="social-media-or"> Or </h5>
                      <h5 class="social-media"> Continue with  </h5>
                      <ul className="list-group list-group-horizontal ul-hz-list w-100 mt-3">
                        <li className="list-group-item ul-hz-list w-100 fb" onClick={facebookAuth}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="10"
                            viewBox="0 0 320 512"
                          >
                            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                          </svg>
                        </li>
                        <li className="list-group-item ul-hz-list w-100 google" onClick={googleAuth}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="15.25"
                            viewBox="0 0 488 512"
                          >
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                          </svg>
                        </li>
                        <li className="list-group-item ul-hz-list w-100 linkedin" onClick={LinkedInAuth}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="14"
                            viewBox="0 0 448 512"
                          >
                            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default Login;
