import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CountryServices = () => {
    const [countriesServiceType, setCountriesServiceType] = useState([]);
    useEffect(() => {

        const getcountriesServiceDetails = async () => {
            try {
                const response = await axios.get("http://localhost:3000/getcountries");
                if (response.status === 200) {
                    setCountriesServiceType(response.data.message);
                }
            }
            catch (error) {
                alert(error.message);
            }
        };
        getcountriesServiceDetails();
    }, [])
    return (
        <>
        <table className="employee-table">
            <thead>
                <tr>
                    <th>countryName</th>
                    <th>Description</th>
                    <th>serviceNames</th>
                    <th>country</th>

                </tr>
            </thead>
            <tbody>
                {countriesServiceType.map((country, index) => (
                    <tr key={index}>
                        <td>{country.countryName}</td>
                        <td>{country.description}</td>
                        <td>{country.image}</td>

                        <td>
                            <ul>
                                {country.serviceTypes && country.serviceTypes.map((serviceType, innerIndex) => (
                                    <li key={innerIndex}>{`${serviceType.serviceName}`}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
};
export default CountryServices;
