import React, { useState } from 'react';
import Game from './Game';

function Menu() {
    const [gameStarted, setGameStarted] = useState(false);

    const handleBackToMenu = () => {
        setGameStarted(false);
    };

    return (
        <div className="menu-container">
            <div className="menu">
                {!gameStarted && <h1>GameFlags - Fermin Lucero</h1>}
                {!gameStarted ? (
                    <div className="start-game">
                        <button onClick={() => setGameStarted(true)}>Start Game</button>
                    </div>
                ) : (
                    <Game onBackToMenu={handleBackToMenu} />
                )}
            </div>
        </div>
    );
}

export default Menu;