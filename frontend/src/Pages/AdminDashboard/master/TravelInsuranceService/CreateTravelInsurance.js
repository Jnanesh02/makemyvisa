// import React, { useState, useEffect } from "react";
// import ConfirmationModal from "../../EmployeeDetails/ConfirmationAccountModel";
// import axios from "axios";
// import Select from 'react-select';

// export const CreateTravelInsurance = ({
//   handleCloseModal,
//   setIsEdit,
//   travelInsuranceDetailsToEdit,
//   setActionrender
// }) => {
//   const initialFormData = {
//     insuranceName:'',
//     fileUpload:null,
//     countries:[],
//     duration:'',
//     cost:''
//   };

//   const [travelInsuranceFormData, setTravelInsuranceFormData] = useState(initialFormData);
//   const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [countriesData, setCountriesData] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/getcountries`
//         );
//         if (Array.isArray(response.data.message)) {
//           setCountriesData(response.data.message);
//         } else {
//           setCountriesData([]);
//         }
//       } catch (error) {
//         alert(error.message);
//       }
//     };

//     fetchCountries();
//   }, []);



//   useEffect(() => {
//     if (travelInsuranceDetailsToEdit) {
//       setTravelInsuranceFormData(travelInsuranceDetailsToEdit);
//       setIsEditing(true);
//     } else {
//       setTravelInsuranceFormData(initialFormData);
//       setIsEditing(false);
//     }
//   }, [travelInsuranceDetailsToEdit]); // Removed initialFormData from dependency array

//   const handleInputChanges = (name, value) => {
//     setTravelInsuranceFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     e.preventDefault();
//     setTravelInsuranceFormData((previous) => ({
//       ...previous,
//       [e.target.name]: e.target.files[0],
//     }));
//   };

//   const handleCreateInsurance = () => {
//     setConfirmationModalOpen(true);
//   };

//   const handleConfirm = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("insuranceName", travelInsuranceFormData.insuranceName);
//       formData.append("fileUpload", travelInsuranceFormData.fileUpload);
//       formData.append("countries", travelInsuranceFormData.countries.join(',')); // Join selected countries into a comma-separated string
//       formData.append("duration", travelInsuranceFormData.duration);
//       formData.append("cost", travelInsuranceFormData.cost);
//         console.log("FormData:",formData);
//         for (const [key, value] of formData) {
//             console.log("key:",key,value);
//           }
//       const url = isEditing
//         ? `${process.env.REACT_APP_BACKEND_URL}/updateTravelInsurance/${travelInsuranceDetailsToEdit._id}`
//         : `${process.env.REACT_APP_BACKEND_URL}/createTravelInsurance`;
  
//       const response = await axios({
//         method: isEditing ? "put" : "post",
//         url: url,
//         data: formData,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       if (response.status === 200) {
//         setConfirmationModalOpen(false);
//         handleCloseModal();
//         setIsEdit(true);
//         setActionrender(false);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleCancel = () => {
//     setConfirmationModalOpen(false);
//   };

//   const reSetForm = () => {
//     setTravelInsuranceFormData(initialFormData);
//   };

//   // Options for the multi-select dropdown
//   const countryOptions = [
//     { value: 'india', label: 'India' },
//     { value: 'usa', label: 'USA' },
//     // Add more countries as needed
//   ];

//   return (
//     <>
//       <div className="create-account-dashboard create-country">
//         <div className="create-dep-form scrl-frm">
//           <button className="close-buttonss" onClick={handleCloseModal}>X</button>
//           <div className="create-country-form">
//             <div className="country-form-input mb-3">
//               <input
//                 className="form-control"
//                 placeholder="Insurance Name"
//                 type="text"
//                 name="insuranceName"
//                 value={travelInsuranceFormData.insuranceName}
//                 onChange={(e) =>
//                   handleInputChanges("insuranceName", e.target.value)
//                 }
//               />
//             </div>
//             <div className="country-form-input mb-3">
//               <input
//                 className="form-control"
//                 type="file"
//                 name="fileUpload"
//                 onChange={handleFileChange}
//               />
//             </div>
//             <div className="country-form-input mb-3">
//               <Select
//                 isMulti
//                 options={countryOptions}
//                 value={travelInsuranceFormData.countries.map(country => ({ value: country, label: country }))}
//                 onChange={(selectedOptions) => {
//                   const selectedCountries = selectedOptions ? selectedOptions.map(option => option.value) : [];
//                   handleInputChanges("countries", selectedCountries);
//                 }}
//               />
//             </div>
//             <div className="country-form-input mb-3">
//               <input
//                 className="form-control"
//                 placeholder="Duration (in months)"
//                 type="text"
//                 name="duration"
//                 value={travelInsuranceFormData.duration}
//                 onChange={(e) =>
//                   handleInputChanges("duration", e.target.value)
//                 }
//               />
//             </div>
//             <div className="country-form-input mb-3">
//               <input
//                 className="form-control"
//                 placeholder="Cost"
//                 type="text"
//                 name="cost"
//                 value={travelInsuranceFormData.cost}
//                 onChange={(e) =>
//                   handleInputChanges("cost", e.target.value)
//                 }
//               />
//             </div>
//           </div>
        
//           <div className="form-button-dashboard">
//             <button
//               className="btn btn-primary create"
//               onClick={handleCreateInsurance}
//             >
//               {isEditing ? "Update" : "Create"}
//             </button>
//             <button className="btn btn-primary cancel" onClick={reSetForm}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       {isConfirmationModalOpen && (
//         <ConfirmationModal
//           message={`Are you sure you want to ${
//             isEditing ? "Update" : "Create"
//           } this travel insurance?`}
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//         />
//       )}
//     </>
//   );
// };


// export default CreateTravelInsurance;

import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../EmployeeDetails/ConfirmationAccountModel";
import axios from "axios";
import Select from 'react-select';

export const CreateTravelInsurance = ({
  handleCloseModal,
  setIsEdit,
  travelInsuranceDetailsToEdit,
  setActionrender
}) => {
  const initialFormData = {
    insuranceName:'',
    fileUpload:null,
    countries:[],
    duration:'',
    cost:''
  };

  const [travelInsuranceFormData, setTravelInsuranceFormData] = useState(initialFormData);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    if (travelInsuranceDetailsToEdit) {
      setTravelInsuranceFormData(travelInsuranceDetailsToEdit);
      setIsEditing(true);
    } else {
      setTravelInsuranceFormData(initialFormData);
      setIsEditing(false);
    }
  }, [travelInsuranceDetailsToEdit]); // Removed initialFormData from dependency array

  useEffect(() => {
    // Fetch country data from API
    axios.get( `${process.env.REACT_APP_BACKEND_URL}/getcountries`)
      .then(response => {
        // Transform the response data into the format required by react-select
        
        const transformedOptions = response.data.message.map(country => ({
          value: country.countryName,
          label: country.countryName
        }));
        setCountryOptions(transformedOptions);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, []); // Empty dependency array to ensure it only runs once when the component mounts

  const handleInputChanges = (name, value) => {
    setTravelInsuranceFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setTravelInsuranceFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleCreateInsurance = () => {
    setConfirmationModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append("insuranceName", travelInsuranceFormData.insuranceName);
      formData.append("fileUpload", travelInsuranceFormData.fileUpload);
      formData.append("countries", travelInsuranceFormData.countries.join(',')); // Join selected countries into a comma-separated string
      formData.append("duration", travelInsuranceFormData.duration);
      formData.append("cost", travelInsuranceFormData.cost);
        console.log("FormData:",formData);
        for (const [key, value] of formData) {
            console.log("key:",key,value);
          }
      const url = isEditing
        ? `${process.env.REACT_APP_BACKEND_URL}/updateTravelInsurance/${travelInsuranceDetailsToEdit._id}`
        : `${process.env.REACT_APP_BACKEND_URL}/createTravelInsurance`;
  
      const response = await axios({
        method: isEditing ? "put" : "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        setConfirmationModalOpen(false);
        handleCloseModal();
        setIsEdit(true);
        setActionrender(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };

  const reSetForm = () => {
    setTravelInsuranceFormData(initialFormData);
  };

  return (
    <>
      <div className="create-account-dashboard create-country">
        <div className="create-dep-form scrl-frm">
          <button className="close-buttonss" onClick={handleCloseModal}>X</button>
          <div className="create-country-form">
            <div className="country-form-input mb-3">
              <input
                className="form-control"
                placeholder="Insurance Name"
                type="text"
                name="insuranceName"
                value={travelInsuranceFormData.insuranceName}
                onChange={(e) =>
                  handleInputChanges("insuranceName", e.target.value)
                }
              />
            </div>
            <div className="country-form-input mb-3">
              <input
                className="form-control"
                type="file"
                name="fileUpload"
                onChange={handleFileChange}
              />
            </div>
            <div className="country-form-input mb-3">
              <Select
                isMulti
                options={countryOptions}
                value={travelInsuranceFormData.countries.map(country => ({ value: country, label: country }))}
                onChange={(selectedOptions) => {
                  const selectedCountries = selectedOptions ? selectedOptions.map(option => option.value) : [];
                  handleInputChanges("countries", selectedCountries);
                }}
              />
            </div>
            <div className="country-form-input mb-3">
              <input
                className="form-control"
                placeholder="Duration (in months)"
                type="text"
                name="duration"
                value={travelInsuranceFormData.duration}
                onChange={(e) =>
                  handleInputChanges("duration", e.target.value)
                }
              />
            </div>
            <div className="country-form-input mb-3">
              <input
                className="form-control"
                placeholder="Cost"
                type="text"
                name="cost"
                value={travelInsuranceFormData.cost}
                onChange={(e) =>
                  handleInputChanges("cost", e.target.value)
                }
              />
            </div>
          </div>
        
          <div className="form-button-dashboard">
            <button
              className="btn btn-primary create"
              onClick={handleCreateInsurance}
            >
              {isEditing ? "Update" : "Create"}
            </button>
            <button className="btn btn-primary cancel" onClick={reSetForm}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to ${
            isEditing ? "Update" : "Create"
          } this travel insurance?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};


export default CreateTravelInsurance;
