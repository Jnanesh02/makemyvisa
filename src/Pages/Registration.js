import React from 'react';
import backgroundImage from '../assets/images/OJO4YQ0.jpg'
const Registration = () => {
    return (
        <>
       
        <div>
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
                    <form>
                      <div className="mb-2">
                        <input
                          type="email"
                          placeholder="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          name="email"
                         
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="password"
                          id="exampleInputPassword1"
                          name="password"
                          
                        />
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
      </div>
        </>
    );
}

export default Registration;
