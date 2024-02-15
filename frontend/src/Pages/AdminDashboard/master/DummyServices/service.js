import React from "react";

const service = () => {
  const services = ["flight Ticket","Travel Insurance"]
  return (
    <div>
      <div className="main-department-section">
        <div className="dep-tbl">
          <h2>Services Page</h2>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Assign Person</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
            <tr>
              {services.map((service) =>(
                <td>{service}</td>
              ))}
    
              <td>
                <button className="action-button edit">Edit</button>
                <button className="action-button delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default service;
