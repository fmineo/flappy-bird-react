import React, { useContext, useEffect } from "react";
import { GameContext } from "@/components/GameEngine";
import { BsPlayFill } from "react-icons/bs";
import { FaStar, FaTimes } from "react-icons/fa";
import ColorSelector from "./ColorSelector";
import { SoundContext } from "./SoundProvider";
import LeaderBoard from "@/components/LeaderBoard";
import { BsTrophyFill } from 'react-icons/bs';
import SoundControl from "./SoundControl";

const Menu = () => {
    const { gameState, setGameState, record, score, setScore, setLeaderboardStatus, playerName, setPlayerName, isRecord, setIsRecord } =
        useContext(GameContext);

    const { hoverSound } = useContext(SoundContext);


    const startGame = () => {
        setScore(0);
        setGameState(true);
        
        
        if (playerName.trim() == "") {
            setPlayerName("Guest");
        }

        setIsRecord(false);

        // stopMenuSound();
        // gameSound();
    };

    const endGame = () => {
        setGameState(false);
        // stopGameSound();
        // menuSound();
    };

    const stopGame = () => {
        setGameState(false);
        // stopGameSound();
        // menuSound();
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!gameState && event.code === "Enter") {
                startGame();
            }
            if (gameState && event.code === "Escape") {
                stopGame();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    const showLeaderboard = () => {
        setLeaderboardStatus(true);
    }

    return (
        <>
            {(!gameState && (
                <div className="absolute flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-full text-gray-700 p-4 overflow-auto">
                    <div className="border-4 p-7 text-center rounded-lg bg-orange-100 border-yellow-950 text-yellow-950 w-full sm:w-96 ">
                        <h1 className="text-5xl uppercase font-bold text-orange-500">
                            Game Over
                        </h1>
                        <input 
                            type="text" 
                            className="my-5 border-2 border-yellow-950 rounded-md px-2 py-1 w-full" 
                            placeholder="Il tuo nome" 
                            value={playerName} 
                            onChange={(event) => setPlayerName(event.target.value)} 
                        />
                        <p className="font-semibold text-xl">
                            <FaStar className="inline relative -top-[2px] text-yellow-600" />{" "}
                            Record: {record}
                        </p>
                        <p className="mb-7 mt-2 text-lg">Punteggio attuale: {score}</p>
                        <div className="flex justify-center items-center gap-6">
                            <button
                                onClick={showLeaderboard}
                                onMouseEnter={hoverSound}
                                className={`border-2 p-2 text-center rounded-lg bg-orange-300  hover:bg-orange-400 border-yellow-950 text-yellow-950 w-20`}
                            >
                                <BsTrophyFill className='inline relative -top-[2px]' />

                            </button>
                            <button
                                onClick={startGame}
                                onMouseEnter={hoverSound}
                                className={`p-2 w-32 text-center rounded bg-orange-300 hover:bg-orange-400 border-2 border-yellow-950`}
                            >
                                <BsPlayFill className="text-5xl mx-auto" />
                            </button>
                            <SoundControl />
                        </div>
                    </div>

                    <div className="border-4 p-7 mt-4 text-center rounded-lg bg-orange-100 border-yellow-950 text-yellow-950 w-full sm:w-96">
                        <h2 className="text-lg font-bold text-orange-500 uppercase">
                            Seleziona un personaggio
                        </h2>
                        <p className="mt-7">
                            <ColorSelector />
                        </p>
                    </div>
                    <LeaderBoard />
                </div>

            )) || (
                    <div className="absolute right-1 top-1">
                        <button className="text-yellow-950 p-1 rounded-md text-3xl"
                            onMouseEnter={hoverSound}
                            onClick={endGame}
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}
        </>
    );
};

export default Menu;
