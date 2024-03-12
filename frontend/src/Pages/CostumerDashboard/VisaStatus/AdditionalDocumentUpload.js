import React, { useState, useEffect } from "react";
import axios from "axios";

export const AdditionalDocumentUpload = () => {
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
    const handleSubmit = async()=>{
      try {
        console.log(formData);
      } catch (error) {
        console.log(error.message);
      }
    }
    useEffect(() => {
      fetchDetails();
    }, []);
    return (
      <div>
        <div
          className="mx-auto mb-3 shadow px-5 py-3 rounded"
          style={{ width: "1000px" }}
        >
          <div className="visaApplication-form-group-doc">
            <div className="document-add-btns">
              <h5 className="visaApplication-label">Documents Upload</h5>
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
                        <td >
                          {documentName.documentName}
                        </td>
                        <td>
                          <input
                            type="file"
                            accept=".pdf"
                            className="visaApplication-input  form-control"
                            name={`${documentName.documentName}`}
                            onChange={
                              handleFileChange
                            }
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
    );
}

