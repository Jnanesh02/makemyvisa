
import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../EmployeeDetails/ConfirmationAccountModel";
import axios from "axios";
import Select from 'react-select';
import { FadeLoader } from 'react-spinners';

export const CreateTravelInsurance = ({
  handleCloseModal,
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
  const [countryOptions, setCountryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 

  useEffect(() => {
    // Fetch country data from API
    setIsLoading(true);
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
      })
      .finally(()=>{
        setIsLoading(false);
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
      setIsLoading(true);
      const formData = new FormData();
      formData.append("insuranceName", travelInsuranceFormData.insuranceName);
      formData.append("fileUpload", travelInsuranceFormData.fileUpload);
      formData.append("countries", travelInsuranceFormData.countries.join(',')); // Join selected countries into a comma-separated string
      formData.append("duration", travelInsuranceFormData.duration);
      formData.append("cost", travelInsuranceFormData.cost);

      const url = `${process.env.REACT_APP_BACKEND_URL}/api/upload`;
  
      const response = await axios({
        method: "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setConfirmationModalOpen(false);
        handleCloseModal();
        setActionrender(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setConfirmationModalOpen(false);
      handleCloseModal();
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
      {isLoading?<FadeLoader />:(
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
              {"Create"}
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
            "Create"
          } this travel insurance?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
        </>
      )}

     
    </>
  );
};


export default CreateTravelInsurance;
