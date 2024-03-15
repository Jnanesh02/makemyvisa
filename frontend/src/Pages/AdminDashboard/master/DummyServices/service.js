import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../EmployeeDetails/ConfirmationAccountModel";
import axios from "axios";
import "./serv.css";
const Service = () => {
  const initialData = {
    ticketId: "",
    ticketName: "",
    departmentName: "",
    employeeId: "",
  };
  const [assignTo, setAssignTo] = useState(initialData);
  const [serviceName, setServiceName] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState({});
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [submitTicket, setSubmitTicket] = useState([]);
  const [assignTicket, setassignTicket] = useState([]);
  const [completedTicket, setCompletedTicket] = useState([]);
  const [employeAvailable, setEmployeAvailable] = useState([]);
  const [employeOccupied, setEmployeOccupied] = useState([]);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [loading,setLoading] = useState(true);
  const fetchServiceName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getservices/servicescollections`
      );
      setServiceName(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchSelectedServiceTicket = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getservices/${selectedServiceName}s`
        );
      
        setCompletedTicket(
          response.data.filter((data) => data.ticketStatus === "completed")
        );
        setassignTicket(
          response.data.filter((data) => data.ticketStatus === "assign to")
        );
        setSubmitTicket(
          response.data.filter((data) => data.ticketStatus === "submit")
        );
      } catch (error) {
        alert(error.message);
      }
    };
    fetchSelectedServiceTicket();    
  }, [selectedServiceName,loading]);
  const fetchDepartmentName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/get/department`
      );

      setDepartment(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };
  const fetchEmployeeDetails = async (department) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getDepartmentDetails/${department}s`
      );
      return response.data;
    } catch (error) {
      alert(error.message);
      return null;
    }
  };
  useEffect(() => {
    fetchDepartmentName();
    fetchServiceName();
  }, []);

  const handleApply = async () => {
    try {
      const combinedDepartments =
        selectedDepartment.length === 1
          ? selectedDepartment
          : [].concat(...selectedDepartment);
      const response = await Promise.all(
        combinedDepartments.map(async (department) => {
          try {
            const response = await fetchEmployeeDetails(department);
            return response;
          } catch (error) {
            return null;
          }
        })
      );
      const flattenresponse = response.flat();
      setEmployeAvailable(
        flattenresponse.filter(
          (employeAvailable) => employeAvailable.status === "Available"
        )
      );
      setEmployeOccupied(
        flattenresponse.filter(
          (employeOccupied) => employeOccupied.status === "occupied"
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCheckboxChange = (isChecked, departmentName) => {
    if (isChecked) {
      setSelectedDepartment([...selectedDepartment, departmentName]);
    } else {
      setSelectedDepartment(
        selectedDepartment.filter((dep) => dep !== departmentName)
      );
    }
  };
  const selectInputChange = (name, value) => {
    setAssignTo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const inputChange = (departmentName, employeeId) => {
    const updatedAssignTo = { ...assignTo };
    updatedAssignTo.departmentName = departmentName;
    updatedAssignTo.employeeId = employeeId;
    updatedAssignTo.ticketName = selectedServiceName;
    setAssignTo(updatedAssignTo);
  };
  const isObjectEmpty = (obj) => {
    return !obj.ticketId || !obj.employeeId;
  };
  const isButtonDisabled = isObjectEmpty(assignTo);
  let enableButton = false;
  const assign = () => {
    setConfirmationModalOpen(true);
  };
  const handleConfirm = async () => {
    try {
      setLoading(false)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/assignTo`,assignTo);
      console.log(response.status === 200);
       if(response.status === 200){
        setLoading(true);
       }
     
    } catch (error) {
      alert(error.message);
    } finally{
      setConfirmationModalOpen(false);
    }
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };
  return (
    <>
      <div>
        <div className="services-name-table">
          <div className="">
            <div className="list-group" id="list-tab" role="tablist">
            <div className="table-responsive">
              <table className="table services-tables">
                <thead>
                  <tr>
                    <th scope="col">Service Name</th>
                    <th scope="col">Ticket</th>
                    <th scope="col">Department</th>
                    <th scope="col">Employee Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                  <td className="first-section-td">

                      {Array.isArray(serviceName) &&
                        serviceName.map((service) => (
                      
                              <a
                              key={service._id}
                                className="list-group-item list-group-item-action"
                                id="list-home-list"
                                data-bs-toggle="list"
                                href="#list-home"
                                role="tab"
                                aria-controls="list-home"
                                onClick={() =>
                                  setSelectedServiceName(
                                    service.serviceTypeName
                                  )
                                }
                              >
                                {service.serviceTypeName}
                              </a>
                     
                        ))}
                        </td>

                    <td rowSpan="3
                    ">
                      {" "}
                      <div className="col-12">
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="list-home"
                            role="tabpanel"
                            aria-labelledby="list-home-list"
                          >
                            <table className="nested-table-services">
                              <thead>
                                <tr>
                                  <th> Available </th>
                                  <th> Assign </th>
                                  <th> Completed </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic radio toggle button group"
                                  >
                                     <div className="tanle-servies-flexdirection">
                                    {Array.isArray(submitTicket) &&
                                    submitTicket.length > 0 ? (
                                      submitTicket.map((ticket) => (

                                        <div className="tanle-servies-flexdirection" key={ticket._id}>
                                          <input
                                            className="btn-check"
                                            name="ticketId"
                                            autoComplete="off"
                                            type="radio"

                                            id={ticket._id}
                                            value={ticket._id}
                                            onChange={(e) =>
                                              selectInputChange(
                                                e.target.name,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <label
                                            className="btn btn-primary"
                                            htmlFor={ticket._id}
                                          >
                                            {ticket._id}
                                          </label>
                                        </div>
                                        
                                      ))
                                    ) : (
                                      <div>No Ticket available</div>
                                    )}
                                    </div>
                                  </td>
                                  <td>
                                    {Array.isArray(assignTicket) &&
                                    assignTicket.length > 0 ? (
                                      assignTicket.map((data) => (
                                        <div key={data._id}>
                                          {data._id || "no data available"}
                                        </div>
                                      ))
                                    ) : (
                                      <div>No Ticket assign</div>
                                    )}
                                  </td>
                                  <td>
                                    {Array.isArray(completedTicket) &&
                                    completedTicket.length > 0 ? (
                                      completedTicket.map((data) => (
                                        <div key={data._id}>{data._id}</div>
                                      ))
                                    ) : (
                                      <div>No Ticket completed</div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td rowSpan="3">
                      {department.map((dep) => (
                        <div key={dep._id}>
                          <input className="checkbox-responsvie"
                            type="checkbox"
                            id={dep._id}
                            value={dep.department}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                dep.department
                              )
                            }
                          />
                          <label htmlFor={dep._id}>{dep.department}</label>
                        </div>
                      ))}
                      <button className="btn btn-primary apply" onClick={handleApply}>Apply</button>
                    </td>
                    <td rowSpan="3">
                      <table className="nested-table-services">
                        <thead>
                          <tr>
                            <th> Available </th>
                            <th> Occupied </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={""}>
                            <td
                              className="btn-group"
                              role="group"
                              aria-label="Basic radio toggle button group"
                            >
                              {Array.isArray(employeAvailable) &&
                              employeAvailable.length > 0 ? (
                                employeAvailable.map(
                                  (res) =>
                                    res.status === "Available" && (
                                      <div key={res._id}>
                                        <input
                                          className="btn-check"
                                          name="employeeId"
                                          autoComplete="off"
                                          type="radio"
                                          id={res._id}
                                          value={res._id}
                                          onChange={() =>
                                            inputChange(res.department, res._id)
                                          }
                                        />
                                        <label
                                          className="btn btn-primary"
                                          htmlFor={res._id}
                                        >
                                          {res._id}
                                        </label>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={assign}
                                          disabled={isButtonDisabled}
                                        >
                                          {enableButton ? "Assigned" : "Assign"}
                                        </button>
                                      </div>
                                    )
                                )
                              ) : (
                                <div>No employee available</div>
                              )}
                            </td>
                            <td>
                              {Array.isArray(employeOccupied) &&
                              employeOccupied.length > 0 ? (
                                employeOccupied.map(
                                  (res) =>
                                    res.status === "occupied" && (
                                      <div key={res._id}>{res._id}</div>
                                    )
                                )
                              ) : (
                                <div>No employee occupied</div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isConfirmationModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to assign Ticket?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Service;
