import { NavLink } from "react-router-dom";
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
                aria-controls="homeSubmenu1"
              >
                <svg
                  className="dashborad-icons"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                </svg>
                Masters
                <svg
                  className="arrows-dashboard"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
              </button>
            </h2>
            <div
              id="homeSubmenu1"
              className="accordion-collapse collapse  custom-collapse"
              aria-labelledby="headingOne1"
              data-bs-parent="#accordionExample1"
            >
              <div className="accordion-body">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className="custom-link"
                  to="Department"
                >
                  {" "}
                  <i className="fa-solid fa-user m-2"></i>Department
                </NavLink>
              </div>
              <div className="accordion-body">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className="custom-link"
                  to="countryServices"
                >
                  {" "}
                  <i className="fa-solid fa-user m-2"></i>Countries Services
                </NavLink>
              </div>
              <div className="accordion-body">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className="custom-link"
                  to="TravelInsuranceService"
                >
                  {" "}
                  <i className="fa-solid fa-user m-2"></i>Travel Insurance
                </NavLink>
              </div>
              <div className="accordion-body">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className="custom-link"
                  to="VisaApplicationDoc"
                >
                  {" "}
                  <i className="fa-solid fa-user m-2"></i>VisaApplicationDoc
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
