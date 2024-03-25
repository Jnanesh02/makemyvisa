import React from 'react'

export const DocumentApproved = ({Data}) => {
    return (
        <>
          {Data.map((data) => (
            <div key={data._id}>
              {data.data.formData.status === "approved" ? (
                <div>
                       <div
                    className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                    style={{ width: "1000px" }}
                  >
                    <h2 className="visaApplication-title">Documents verification</h2>
                   <span>Waiting for documents to be downloaded for verification.</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                    style={{ width: "1000px" }}
                  >
                    <h2 className="visaApplication-title">Document Verification and Approval</h2>
                    <span> documents Verification and Approved Successfully</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      );
}
