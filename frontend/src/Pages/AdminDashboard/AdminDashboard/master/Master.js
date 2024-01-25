import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
export const Master = () => {
return (
  <div className="container">
    <div className="row">
      <div className="accordion" id="accordionExample1">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne1">
                  <button
                    className="accordion-button custom-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#homeSubmenu1"
                    aria-expanded="false"
                    aria-controls="homeSubmenu1">
                    <i className="fas fa-gear"></i> Masters
                  </button>
                </h2>
                <div
                  id="homeSubmenu1"
                  className="accordion-collapse collapse  custom-collapse"
                  aria-labelledby="headingOne1"
                  data-bs-parent="#accordionExample1">
                  <div className="accordion-body">
                    <NavLink style={{ textDecoration: "none" }} className="custom-link" to="Department">
                      {" "}
                      <i className="fa-solid fa-user m-2"></i>Department
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
    </div>
  </div>
);
  
};
