import React, { useState } from 'react';
import Select from 'react-select';
import airportsData from './mock-airport/airport.json'; // Assuming you have imported the airports data

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted gray',
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#dd2817' : 'white',
    padding: 10,
    fontSize: 14,
    fontWeight: state.data.isCountry ? 'bold' : 'normal',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: state.data.isCountry ? 'bold' : 'normal',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#dd2817',
  }),
};

const formatOptionLabel = ({ label, iata, county }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <i className="fas fa-plane" style={{ fontSize: '16px', marginRight: '5px', color: '#dd2817' }}></i>
    <div>
      <p style={{ margin: 0, fontWeight: 'bold' }}>{county}</p>
      <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{iata}</p>
    </div>
  </div>
);

const customOptions = airportsData.map((airport) => ({
  value: airport.iata,
  label: airport.airport,
  iata: airport.iata,
  county: airport.county,
  isCountry: true,
}));

const App = () => {
  const [data, setData] = useState({ Airport: "" });

  const filterOptions = (candidate, input) => {
    if (!candidate.data || !candidate.data.county || !candidate.data.label) {
      return false;
    }
    if (candidate.data.county.toLowerCase().includes(input.toLowerCase())) {
      return true;
    }
    if (candidate.data.label.toLowerCase().includes(input.toLowerCase())) {
      return true;
    }
    return false;
  };

  const handleAirportChange = (selectedOption) => {
    console.log("SElected option",selectedOption);
    setData({ ...data, Airport: `${selectedOption.value}-${selectedOption.label}-${selectedOption.county}` });
  };
  console.log("Daata",data);
  return (
    <div className='w-50 m-3' >
    <Select
      options={customOptions}
      styles={customStyles}
      formatOptionLabel={formatOptionLabel}
      filterOption={filterOptions}
      onChange={handleAirportChange}
    />
    </div>
  );
};

export default App;
