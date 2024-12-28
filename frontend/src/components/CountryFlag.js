import React, { useState, useEffect } from 'react';

const CountryFlag = ({ code }) => {
    const [countryCode, setCountryCode] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (code) {
            setCountryCode(code.toLowerCase());
            setError(null);
        } else {
            setError('Country code not found');
        }
    }, [code]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <img
            src={`https://flagcdn.com/w320/${countryCode}.png`}
            alt={`Flag of a country`}
            className="country-flag"
        />
    );
};

export default CountryFlag;