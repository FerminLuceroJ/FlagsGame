import React, { useState } from 'react';
import Game from './Game';

function Menu() {
    const [difficulty, setDifficulty] = useState(null);

    return (
        <div className="menu-container">
            <div className="menu">
                <h1>FlagsGame</h1>
                {!difficulty ? (
                    <div className="difficulty">
                        <h2>Select Difficulty</h2>
                        <button onClick={() => setDifficulty('Easy')}>Easy</button>
                        <button onClick={() => setDifficulty('Medium')}>Medium</button>
                        <button onClick={() => setDifficulty('Hard')}>Hard</button>
                    </div>
                ) : (
                    <Game difficulty={difficulty} language="EN"/>
                )}
            </div>
        </div>
    );
}

export default Menu;