import React, { useState } from "react";
import axios from "axios";
import { ConfirmationModel } from "./ConfirmationModel";
const VisaTicket = ({ serviceName, data,setLoading }) => {
  const [selectStatus, setSelectStatus] = useState({ status: "" });
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const handleStatusChange = (e) => {
    if (e.target.value !== "") {
      setConfirmationModalOpen(true);
    }
    setSelectStatus((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const updatestatus = async (status) => {
    try {
     const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/update/visastatus`,
        {
          objectId: "65fc14e076b0fb054b379635",
          status: status,
        }
      );
      console.log(response.status === 200);
      if(response.status === 200) {
        setLoading(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setConfirmationModalOpen(false);
    }
  };
  const handleDownload = async () => {
    try {
      const fetchDocuments = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getPresignalUrlDownload`,
        {
          params: {
            customerId: "65ddc4c6b2b7c3bf692258a5",
          },
        }
      );
      if (
        fetchDocuments.status === 200 &&
        fetchDocuments.data.message.length > 0
      ) {
        const urls = fetchDocuments.data.message;

        const downloadPromises = urls.map((url, index) => {
          return new Promise((resolve,reject) => {
            setTimeout(() => {
              const link = document.createElement("a");
              link.href = url;
              link.click();
              resolve();
            }, index * 2000);
          });
        });

        await Promise.all(downloadPromises);
        await updatestatus("downloaded");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleConfirm = async () => {
    try {
      console.log(selectStatus.status);
      await updatestatus(selectStatus.status);
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleCancel = () => {
    setSelectStatus({ status: "" });
    setConfirmationModalOpen(false);
  };

  return (
    <>
      <table className="employee-table">
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Current Country</th>
            <th>State</th>
            <th>Destination Country</th>
            <th>visaType</th>
            <th>Status Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.data && data.data.data ? (
            <tr>
              <td>{data.data.data.formData.firstName}</td>
              <td>{data.data.data.formData.lastName}</td>
              <td>{data.data.data.formData.email}</td>
              <td>{data.data.data.formData.phoneNumber}</td>
              <td>{data.data.data.formData.country}</td>
              <td>{data.data.data.formData.state}</td>
              <td>{data.data.data.formData.destination}</td>
              <td>{data.data.data.formData.visaType}</td>

              <td>
                {data.data.data.formData.status !== "approved" ? (
                  <select
                    name="status"
                    value={selectStatus.status}
                    onChange={handleStatusChange}
                  >
                    <option value="">Select Status</option>
                    <option value="additional">Additional Document</option>
                    <option value="approved">Approved</option>
                  </select>
                ) : (
                  <>
                    <p>{data.data.data.formData.status}</p>
                  </>
                )}
              </td>
              <td>{<button onClick={handleDownload}>Download</button>}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="8">No ticket available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isConfirmationModalOpen && (
        <ConfirmationModel
          message={`Are you sure you want to apply?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default VisaTicket;
