import React from "react";
import "./service.css"
const Service = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sidenavbar-b"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Services
      </button>

      <div className="modal modal-em-m" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
