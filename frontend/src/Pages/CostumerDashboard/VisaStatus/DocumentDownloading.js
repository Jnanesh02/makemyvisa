import React from 'react'

export const DocumentDownloading = ({Data}) => {
    return (
        <>
          {Data.map((data) => (
            <div key={data._id}>
              {data.data.formData.status === "verification" ? (
                <div>
                       <div
                    className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                    style={{ width: "1000px" }}
                  >
                    <h2 className="visaApplication-title">Documents Downloading InCompleted</h2>
                   <span>Waiting for documents to be downloaded for verification.</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                    style={{ width: "1000px" }}
                  >
                    <h2 className="visaApplication-title">Documents Downloading Completed</h2>
                    <span> documents downloaded Successfully</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      );
}
