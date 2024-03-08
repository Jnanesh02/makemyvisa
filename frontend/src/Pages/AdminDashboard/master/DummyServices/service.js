import React, { useEffect, useState } from "react";
import axios from "axios";
import "./serv.css";
const Service = () => {
  const [serviceName, setServiceName] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState({});
  const [department, setDepartment] = useState([]);

  const [serviceData, setServiceData] = useState(['junior accountants']);

  const [employee,setEmployee]=useState([])


  const [selectedDepartment, setSelectedDepartment] = useState('');
  console.log("selectdep",selectedDepartment);
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getservices/servicescollections`
        );
        setServiceName(response.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getservices/${selectedServiceName}s`
        );
        console.log(response);
        setServiceData(response.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData1();
  }, [selectedServiceName]);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getEmployeeByRole/${selectedDepartment}s`
        );
        console.log(response);
        setEmployee(response.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData1();
  }, [selectedDepartment]);
  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/get/department`
      );

      setDepartment(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  console.log("service Data",employee);
  return (
    <>
      <div>
        <div className="services-name-table">
          <div className="">
            <div className="list-group" id="list-tab" role="tablist">
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
                    {}
                    {Array.isArray(serviceName) &&
                      serviceName.map((service) => (
                        <tr key={service._id}>
                          <td className="first-section-td" scope="row">
                            <a
                              className="list-group-item list-group-item-action"
                              id="list-home-list"
                              data-bs-toggle="list"
                              href="#list-home"
                              role="tab"
                              aria-controls="list-home"
                              onClick={() =>
                                setSelectedServiceName(service.serviceTypeName)
                              }
                            >
                              {service.serviceTypeName}
                            </a>
                          </td>
                        </tr>
                      ))}

                    <td rowSpan="3">
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
                                <tr key={"1"}>
                                  <th> Available </th>
                                  <th> Completed </th>
                                </tr>
                              </thead>
                              {Array.isArray(serviceData) && (
                                <tbody>
                                  <tr>
                                    <td>
                                      {Array.isArray(serviceData) &&
                                        serviceData.map(
                                          (data) =>
                                            data.ticketStatus === "submit" && (
                                              <div className="form-check">
  <input type="checkbox" key={data._id} className="form-check-input" id={`checkbox-${data._id}`} />
  <label className="form-check-label" htmlFor={`checkbox-${data._id}`}>
    {data._id}
  </label>
</div>

                                            )
                                        )}
                                    </td>
                                    <td>
                                      {Array.isArray(serviceData) &&
                                        serviceData.map(
                                          (data) =>
                                            data.ticketStatus ===
                                              "completed" && (
                                                <div className="form-check">
                                                <input type="checkbox" key={data._id} className="form-check-input" id={`checkbox-${data._id}`} />
                                                <label className="form-check-label" htmlFor={`checkbox-${data._id}`}>
                                                  {data._id}
                                                </label>
                                              </div>
                                            )
                                        )}
                                    </td>
                                  </tr>
                                </tbody>
                              )}
                            </table>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td rowSpan="3">
                    <select onChange={handleDepartmentChange} value={selectedDepartment}>
        {department.map(dep => (
          <option key={dep._id} value={dep.department}>
            {dep.department}
          </option>
        ))}
      </select>
                    </td>
                    <td rowspan="3">
                      <table className="nested-table-services">
                        <thead>
                          <tr>
                            <th> Available </th>
                            <th> Occupied </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Cell 1
                              <div>
                                {" "}
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Primary
                                </button>
                              </div>
                            </td>
                            <td>Cell 1</td>
                          </tr>
                          <tr>
                            <td>Cell 2</td>
                            <td>Cell 1</td>
                          </tr>
                          <tr>
                            <td>Cell 3</td>
                            <td>Cell 1</td>
                          </tr>
                          <tr>
                            <td>Cell 4</td>
                            <td>Cell 1</td>
                          </tr>
                          <tr>
                            <td>Cell 2</td>
                            <td>Cell 1</td>
                          </tr>
                          <tr>
                            <td>Cell 3</td>
                            <td>Cell 1</td>
                          </tr>
                          <tr>
                            <td>Cell 4</td>
                            <td>Cell 1</td>
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
    </>
  );
};

export default Service;
