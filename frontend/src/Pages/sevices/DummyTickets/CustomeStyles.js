const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted gray",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#dd2817" : "white",
      padding: 10,
      fontSize: 14,
      fontWeight: state.data.isCountry ? "bold" : "normal",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontWeight: state.data.isCountry ? "bold" : "normal",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#dd2817",
    }),
  };
  
  const formatOptionLabel = ({ label, iata, city }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <i
        className="fas fa-plane"
        style={{ fontSize: "16px", marginRight: "5px", color: "#dd2817" }}
      ></i>
      <div>
        <p style={{ margin: 0, fontWeight: "bold" }}>{city}</p>
        <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>{label}</p>
        <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>{iata}</p>
      </div>
    </div>
  );

  const styles = {
    customStyles,
    formatOptionLabel
  }
  export default styles