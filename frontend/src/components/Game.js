import React, { useEffect, useState, useCallback} from 'react';
import countriesData from '../data/countries.json';
import CountryFlag from './CountryFlag';

function Game({ difficulty, language, onBackToMenu }) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [options, setOptions] = useState([]);
    const [points, setPoints] = useState(1); // Start from 1
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [time, setTime] = useState(0);
    const [questionsAsked, setQuestionsAsked] = useState(0); // Start from 0
    const [gameOver, setGameOver] = useState(false);
    const [askedCountries, setAskedCountries] = useState([]);

    const generateQuestion = useCallback(() => {
        if (questionsAsked >= questionLimits[difficulty] + 1) {
            setGameOver(true);
            return;
        }

        const countryList = countries[difficulty].filter(country => !askedCountries.includes(country));
        if (countryList.length === 0) {
            setGameOver(true);
            return;
        }

        const randomCountry = countryList[Math.floor(Math.random() * countryList.length)];
        const incorrectOptions = countries[difficulty]
            .filter(country => country !== randomCountry)
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
        setQuestionsAsked(prevQuestions => prevQuestions + 1);
        setAskedCountries(prevAsked => [...prevAsked, randomCountry]);
    }, [questionsAsked, difficulty, askedCountries, language]);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
        if (gameOver) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [gameOver]);

    const handleOptionClick = (option) => {
        if (option === selectedCountry) {
            setCorrectAnswers(prevCorrect => prevCorrect + 1);
        } else {
            setIncorrectAnswers(prevIncorrect => prevIncorrect + 1);
        }
        setPoints(prevPoints => prevPoints + 1);
        generateQuestion();
    };

    const handleRestart = () => {
        setSelectedCountry('');
        setSelectedCountryCode('');
        setOptions([]);
        setPoints(1); // Reset to 1
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setTime(0);
        setQuestionsAsked(0); // Reset to 0
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
                <h3>Game Over - {difficulty} Mode</h3>
                <div className="game-info">
                    <p>Flags: {points}</p>
                    <p>Correct: {correctAnswers}</p>
                    <p>Incorrect: {incorrectAnswers}</p>
                    <p>{formatTime(time)}</p>
                </div>
                <button className="boton-back" onClick={onBackToMenu}>Back to Menu</button>
            </div>
        );
    }

    return (
        <div className="game-container">
            <h3>Game - {difficulty} Mode</h3>
            <div className="game-info">
                <p>Flags: {points}/{questionLimits[difficulty]}</p>
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
                {options.map(option => (
                    <li key={option} onClick={() => handleOptionClick(option)}>{option}</li>
                ))}
            </ul>
        </div>
    );
}

export default Game;
