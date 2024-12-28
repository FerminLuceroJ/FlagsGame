import React, { useEffect, useState } from 'react';
import countriesData from '../data/countries.json';
import CountryFlag from './CountryFlag';

const countries = {
    Easy: ['AF', 'AL', 'DE', 'AD', 'AO', 'AI', 'AQ', 'AG', 'SA', 'DZ', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BE', 'BS', 'BH', 'BD', 'BB', 'BZ', 'BJ', 'BT', 'BY', 'MM', 'BO', 'BA', 'BW', 'BR'],
    Medium: ['BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'TD', 'CL', 'CN', 'CY', 'VA', 'CO', 'KM', 'CG', 'CD', 'KP', 'KR', 'CI', 'CR', 'HR', 'CU', 'CW', 'DK', 'DM', 'EC', 'EG', 'SV', 'AE'],
    Hard: ['ER', 'ES', 'EE', 'ET', 'FI', 'FJ', 'FR', 'GA', 'GM', 'GE', 'GH', 'GI', 'GD', 'GR', 'GL', 'GP', 'GU', 'GT', 'GF', 'GG', 'GN', 'GQ', 'GW', 'GY', 'HT', 'HN', 'HK', 'HU', 'IN', 'ID']
};

function Game({ difficulty, language }) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [options, setOptions] = useState([]);
    const [points, setPoints] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(() => {
        generateQuestion();
    }, [difficulty]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const generateQuestion = () => {
        const countryList = countries[difficulty];
        const randomCountry = countryList[Math.floor(Math.random() * countryList.length)];
        const incorrectOptions = countryList.filter(country => country !== randomCountry)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        const allOptions = [...incorrectOptions, randomCountry].sort(() => 0.5 - Math.random());

        const getCountryName = (code) => {
            const country = countriesData.find(c => c.iso2 === code);
            return language === 'EN' ? country.nameEN : country.nameES;
        };

        setSelectedCountry(getCountryName(randomCountry));
        setSelectedCountryCode(randomCountry);
        setOptions(allOptions.map(getCountryName));
    };

    const handleOptionClick = (option) => {
        if (option === selectedCountry) {
            setCorrectAnswers(prevCorrect => prevCorrect + 1);
        } else {
            setIncorrectAnswers(prevIncorrect => prevIncorrect + 1);
        }
        setPoints(prevPoints => prevPoints + 1);
        generateQuestion();
    };

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="game-container">
            <h3>Game - {difficulty} Mode</h3>
            <div className="game-info">
                <p>Points: {points}/{countries[difficulty].length}</p>
                <p>Correct: {correctAnswers}</p>
                <p>Incorrect: {incorrectAnswers}</p>
                <p>{formatTime(time)}</p>
            </div>
            <div className="flag-container">
                <CountryFlag code={selectedCountryCode} />
            </div>
            <ul className="options-list">
                {options.map(option => (
                    <li key={option} onClick={() => handleOptionClick(option)}>{option}</li>
                ))}
            </ul>
        </div>
    );
}

export default Game;