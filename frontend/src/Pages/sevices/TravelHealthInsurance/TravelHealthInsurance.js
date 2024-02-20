import React, { useState } from 'react';
import './TravelHealthInsurance.css';

const visaPlans = [
  {
    title: 'Tourist Visa',
    document: '/Documents/visa.pdf',
    country: ['India', 'USA'],
    months: 12,
    fee: '2000/-'
  },
  {
    title: 'Student Visa',
    document: '/path/to/document2.pdf',
    country: ['India', 'USA', 'Australia'],
    months: 24,
    fee: '4000/-'
  },
  {
    title: 'Normal Visa',
    document: '/path/to/document1.pdf',
    country: ['India', 'USA'],
    months: 12,
    fee: '2000/-'
  },
  {
    title: 'EWW Visa',
    document: '/path/to/document2.pdf',
    country: ['India', 'USA', 'Australia'],
    months: 24,
    fee: '4000/-'
  }
];

const TravelHealthInsurance = () => {
  const [destinationCountry, setDestinationCountry] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [visaTypes, setVisaTypes] = useState([]);
  const [showVisaTypes, setShowVisaTypes] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const handleSearch = () => {
    // Filter visa plans based on destination country (case-insensitive)
    const filteredVisaTypes = visaPlans.filter(plan =>
      plan.country.some(country => country.toLowerCase() === destinationCountry.toLowerCase())
    );
    setVisaTypes(filteredVisaTypes);
    setShowVisaTypes(true);
  };


/* eslint-disable no-undef */
  const handleOpenModal = (documentUrl) => {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = documentUrl;
    const pdfModal = new bootstrap.Modal(document.getElementById('pdfModal'), {
      keyboard: false
    });
    pdfModal.show();
  };
/* eslint-enable no-undef */

const handleCheckboxChange = () => {
  setShowPaymentButton(!showPaymentButton);
};
  return (
    <div className="travel-Insurance-container">
      <div className="travel-Insurance-header text-white p-4">
        <h1 className="text-center travel-Insurance-h1">Travel Insurance</h1>
      </div>
      <div className="travel-Insurance-body container">
        <div className="travel-Insurance-container-form shadow p-5 mb-5 bg-body rounded">
          <div className='travel-Insurance-container-sub'>
            <div>
              <label htmlFor="destinationCountry" className="travel-Insurance-label">Destination Country:</label>
              <input
                type="text"
                id="destinationCountry"
                className="travel-Insurance-input form-control mb-3"
                value={destinationCountry}
                placeholder='Enter Country Name'
                onChange={e => setDestinationCountry(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="departureDate" className="travel-Insurance-label">Departure Date:</label>
              <input
                type="date"
                id="departureDate"
                className="travel-Insurance-input form-control mb-3"
                value={departureDate}
                onChange={e => setDepartureDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="returnDate" className="travel-Insurance-label">Return Date:</label>
              <input
                type="date"
                id="returnDate"
                className="travel-Insurance-input form-control mb-3"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
              />
            </div>
          </div>
          <button className="travel-Insurance-button btn btn-danger" onClick={handleSearch}>Search</button>
        </div>
        {showVisaTypes && (
          <div className="travel-Insurance-visa-types">
            <h2 className='travel-Insurance-plans text-center'>Plans</h2>
            <p className='text-center'>Choose the most appropriate plan for you and your family.</p>
            <div className="row">
              {visaTypes.map((visa, index) => (
                <div key={index} className="col-md-6 mb-3">
                <div className="travel-Insurance-card shadow-sm card bg-light text-white">
                  <div className="card-body">
                      <div className='d-flex align-items-center'>
                      <input type="checkbox" className='travel-Insurance-checkbox me-3' onChange={handleCheckboxChange} />
                      
                    
                    <h4 className="travel-Insurance-card-title card-title">{visa.title}</h4>
                    </div>
                    <p className="travel-Insurance-card-text card-text">Months: {visa.months}</p>
                    <p className="travel-Insurance-card-text card-text">Fee: {visa.fee}</p>
                    
                    
                    <button className="travel-Insurance-link btn btn-danger" onClick={() => handleOpenModal(visa.document)}>View Document</button>
                  </div>
                </div>
              </div>
              ))}
            </div >
            <div className="text-center"> {/* Center the button */}
  {showPaymentButton && <button className="travel-Insurance-link btn btn-danger">Pay Payment</button>}
</div>
          </div>
        )}
      </div>
      <div className="modal fade " id="pdfModal" tabIndex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered travel-Insurance__modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="pdfModalLabel">PDF Document</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <iframe id="pdfViewer" title="PDF Document" width="100%" height="500"></iframe>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default TravelHealthInsurance;
