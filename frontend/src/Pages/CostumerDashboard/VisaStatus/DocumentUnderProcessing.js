import React from 'react'

export const DocumentUnderProcessing = ({Data}) => {
    console.log('DocumentUnderProcessing', Data);
  return (
    <>
     {Data.map((data) => (
        <div key={data._id}>
            {console.log("1111",data.data.formData.status === "underprocess")}
          {data.data.formData.status === "underprocess" ? (
            <div>
                   <div
                className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                style={{ width: "1000px" }}
              >
                <h2 className="visaApplication-title">Documents Verification</h2>
               <span>Documents Verification UnderProcessing</span>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                style={{ width: "1000px" }}
              >
                <h2 className="visaApplication-title">Documents Verification</h2>
                <span> Documents Verification Process Completed</span>
              </div>
            </div>
          )}
        </div>
      ))}</>
   
  )
}
