import React from 'react'

const service = () => {
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
        <th>XXXXX</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    <tr>
              <td>Dummy Service 1</td>
              <td>John Doe</td>
              <td>
                <button className="action-button edit">Button</button>
              </td>
              <td>
                <button className="action-button edit">Edit</button>
                <button className="action-button delete">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Dummy Service 2</td>
              <td>Jane Smith</td>
              <td>
                <button className="action-button edit">Button</button>
              </td>
              <td>
                <button className="action-button edit">Edit</button>
                <button className="action-button delete">Delete</button>
              </td>
            </tr>
    </tbody>
  </table>
</div>

    </div>
  )
}

export default service;
