const { parsePhoneNumberFromString, AsYouType, getCountryCallingCode, getLengths } = require('libphonenumber-js');

function getPhoneNumberLength(countryCode) {
    const lengths = getLengths(countryCode);
    if (lengths) {
        return lengths[0];
    }
    return null;
}

function formatPhoneNumber(phoneNumber, countryName) {
    // Convert country name to country code
    const countryInfo = require('i18n-iso-countries');
    const countryCode = countryInfo.getAlpha2Code(countryName, 'en');

    // Get phone number length
    const phoneNumberLength = getPhoneNumberLength(countryCode);

    // Parse the phone number
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, countryCode);

    if (parsedPhoneNumber) {
        // Use AsYouType formatter to format the phone number
        const formatter = new AsYouType(countryCode);
        formatter.input(parsedPhoneNumber.nationalNumber);
        const formattedNumber = formatter.getNumber();

        // Check if the formatted number has the expected length
        if (formattedNumber && formattedNumber.length === phoneNumberLength) {
            return formattedNumber;
        } else {
            console.error('Invalid formatted phone number length');
            return null;
        }
    } else {
        console.error('Invalid phone number');
        return null;
    }
}

// Example usage
const inputPhoneNumber = '9110846527';
const countryName = 'singapore';
const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber, countryName);
console.log(formattedPhoneNumber);
