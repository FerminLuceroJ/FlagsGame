import React, { useEffect, useState } from 'react';
import countriesData from '../data/countries.json';
import CountryFlag from './CountryFlag';

const countries = [
    'AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR',
    'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY',
    'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BR', 'BN',
    'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD',
    'CL', 'CN', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU',
    'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ',
    'ER', 'EE', 'SZ', 'ET', 'FJ', 'FI', 'FR', 'GA', 'GM', 'GE',
    'DE', 'GH', 'GR', 'GD', 'GT', 'GN', 'GW', 'GY', 'HT', 'HN',
    'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IL', 'IT', 'JM',
    'JP', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA',
    'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MG', 'MW',
    'MY', 'MV', 'ML', 'MT', 'MR', 'MU', 'MX', 'FM', 'MD', 'MC',
    'MN', 'ME', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NZ',
    'NI', 'NE', 'NG', 'MK', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA',
    'PG', 'PY', 'PE', 'PH', 'PL', 'PT', 'QA', 'RO', 'RU', 'RW',
    'KN', 'LC', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC',
    'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'SS', 'ES', 'LK',
    'SD', 'SR', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL',
    'TG', 'TO', 'TT', 'TN', 'TR', 'TM', 'TV', 'UG', 'UA', 'AE',
    'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'YE', 'ZM', 'ZW'
];

function Game({ onBackToMenu }) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [options, setOptions] = useState([]);
    const [points, setPoints] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [time, setTime] = useState(0);
    const [questionsAsked, setQuestionsAsked] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [askedCountries, setAskedCountries] = useState([]);

    useEffect(() => {
        generateQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        if (gameOver) clearInterval(timer);
        return () => clearInterval(timer);
    }, [gameOver]);

    const generateQuestion = () => {
        if (questionsAsked >= countries.length) {
            setGameOver(true);
            return;
        }

        const remainingCountries = countries.filter(
            (country) => !askedCountries.includes(country)
        );

        if (remainingCountries.length === 0) {
            setGameOver(true);
            return;
        }

        const randomCountry =
            remainingCountries[Math.floor(Math.random() * remainingCountries.length)];

        const incorrectOptions = countries
            .filter((country) => country !== randomCountry)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const allOptions = [...incorrectOptions, randomCountry].sort(() => Math.random() - 0.5);

        const getCountryName = (code) => {
            const country = countriesData.find((c) => c.iso2 === code);
            return country?.nameEN || 'Unknown Country';
        };

        setSelectedCountry(getCountryName(randomCountry));
        setSelectedCountryCode(randomCountry);
        setOptions(allOptions.map(getCountryName));
        setQuestionsAsked((prev) => prev + 1);
        setAskedCountries((prev) => [...prev, randomCountry]);
    };

    const handleOptionClick = (option) => {
        if (option === selectedCountry) {
            setCorrectAnswers((prev) => prev + 1);
        } else {
            setIncorrectAnswers((prev) => prev + 1);
        }
        setPoints((prev) => prev + 1);
        generateQuestion();
    };

    const handleRestart = () => {
        setSelectedCountry('');
        setSelectedCountryCode('');
        setOptions([]);
        setPoints(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setTime(0);
        setQuestionsAsked(0);
        setGameOver(false);
        setAskedCountries([]);
        generateQuestion();
    };

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    if (gameOver) {
        return (
            <div className="game-container">
                <h3>Game Over</h3>
                <div className="game-info">
                    <p>Flags: {points}</p>
                    <p>Correct: {correctAnswers}</p>
                    <p>Incorrect: {incorrectAnswers}</p>
                    <p>{formatTime(time)}</p>
                </div>
                <button className="boton-back" onClick={onBackToMenu}>
                    Back to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="game-container">
            <h3>GameFlags</h3>
            <div className="game-info">
                <p>Flags: {points}/{countries.length}</p>
                <p>Correct: {correctAnswers}</p>
                <p>Incorrect: {incorrectAnswers}</p>
                <p>{formatTime(time)}</p>
            </div>
            <div className="button-container">
                <button onClick={handleRestart}>Restart</button>
                <button onClick={onBackToMenu}>Back to Menu</button>
            </div>
            <div className="flag-container">
                <CountryFlag code={selectedCountryCode} />
            </div>
            <ul className="options-list">
                {options.map((option) => (
                    <li key={option} onClick={() => handleOptionClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Game;