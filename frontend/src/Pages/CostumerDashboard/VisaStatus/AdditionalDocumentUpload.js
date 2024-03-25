import React, { useState, useEffect } from "react";
import axios from "axios";

export const AdditionalDocumentUpload = ({ Data, visaId, setLoading }) => {
  const [formData, setFormData] = useState([]);
  const [documentNames, setDocumentNames] = useState([]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const newDocument = files[0];
    setFormData({ ...formData, [name]: newDocument });
  };
  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/get/visaDocumentName`
      );

      if (response.data.message.length > 0) {
        setDocumentNames(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchsignalurl = async (len) => {
    try {
      const documentName = documentNames.map((res) => res.documentName);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getPresignalUrl`,
        {
          params: {
            numDocuments: len,
            customerId: "65ddc4c6b2b7c3bf692258a5",
            document: documentName,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      const urls = await fetchsignalurl(documentNames.length);
      const fileKeys = Object.keys(formData);
      const uploadPromises = fileKeys.map(async (key, index) => {
        const file = formData[key];
        const url = urls[index];
        await uploadFileToS3(url, file);
      });
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading:", error.message);
    }
  };
  const updatevisastatusBar = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/update/visastatus`,
        {
          objectId: visaId,
          status: "verification",
        }
      );
      if (response.status === 200) {
        setLoading(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadFileToS3 = async (url, file) => {
    try {
      const response = await axios.put(url, file);
      if (response.status === 200) {
        updatevisastatusBar();
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      {Data.map((data) => (
        <div key={data._id}>
          {data.data.formData.status === "additional" ? (
            <div>
              <div
                className="mx-auto mb-3 shadow px-5 py-3 rounded"
                style={{ width: "1000px" }}
              >
                <div className="visaApplication-form-group-doc">
                  <div className="document-add-btns">
                    <h5 className="visaApplication-label">Additional Documents Upload</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="table my-2 table-bordered border-Dark text-center">
                      <thead className="table-light">
                        <tr>
                          <th>Document Name</th>
                          <th>Upload</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(documentNames) ? (
                          documentNames.map((documentName) => (
                            <tr key={documentName._id}>
                              <td>{documentName.documentName}</td>
                              <td>
                                <input
                                  type="file"
                                  accept=".pdf"
                                  className="visaApplication-input  form-control"
                                  name={`${documentName.documentName}`}
                                  onChange={handleFileChange}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2">No document names retrieved.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <button
                      type="submit"
                      className="btn btn-danger-submit"
                      style={{ background: "#e12912", color: "white" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                style={{ width: "1000px" }}
              >
                <h2 className="visaApplication-title">Additional Documents Upload</h2>
                {Array.isArray(Data) ? (
                  <>
                    {Data.map((res) => (
                      <div key={res._id}>
                        <span>{res.data.documentUpload}</span>{" "}
                      </div>
                    ))}
                  </>
                ) : (
                  <>"Visa Application"</>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

