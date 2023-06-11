import React, { createContext, useState, useEffect, useContext } from "react";
import { SoundContext } from "./SoundProvider";

export const GameContext = createContext();

export const birdColors = {
    Blue: require("../assets/Bird/Blue.gif"),
    Red: require("../assets/Bird/Red.gif"),
    Gray: require("../assets/Bird/Gray.gif"),
    Yellow: require("../assets/Bird/Yellow.gif"),
};

export const GameEngine = ({ children }) => {
    const { menuSound, stopMenuSound, gameSound, stopGameSound, breakSound } =
        useContext(SoundContext);

    const gravity = 3;
    const birdSize = 40;
    const pipeWidth = 100;

    const [gameSpeed, setGameSpeed] = useState(15);
    const [pipeSpeed, setPipeSpeed] = useState(5);

    const [gameState, setGameState] = useState(false);

    const [score, setScore] = useState(0);
    const [record, setRecord] = useState(0);

    const [birdColor, setBirdColor] = useState("Blue");
    const [birdPositionY, setBirdPositionY] = useState(null);
    const [birdPositionX, setBirdPositionX] = useState(null);
    const [birdImage, setBirdImage] = useState(birdColors[birdColor]);

    const [pipes, setPipes] = useState([]);

    const [windowWidth, setWindowWidth] = useState(null);
    const [windowHeight, setWindowHeight] = useState(null);

    const gameHeight = windowHeight - (windowHeight * 0.18);
    const jumpHeight = windowHeight - gameHeight;

    const [leaderboardStatus, setLeaderboardStatus] = useState(false);

    const [playerName, setPlayerName] = useState("");

    const [isRecord, setIsRecord] = useState(false);

    // Sound effects
    useEffect(() => {
        if (gameState) {
            stopMenuSound();
            gameSound();
        }
        if (!gameState) {
            stopGameSound();
            menuSound();
        }
    }, [gameState, gameSound, menuSound, stopGameSound, stopMenuSound]);

    // window resize effect
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            if (window.innerWidth <= 767 ) {
                setBirdPositionX(50);
            } else {
                setBirdPositionX(100);
            }
        };

        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            if (window.innerWidth <= 767 ) {
                setBirdPositionX(50);
            } else {
                setBirdPositionX(100);
            }
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    
    return (
        <GameContext.Provider
            value={{
                gravity,
                gameSpeed,
                setGameSpeed,
                birdSize,
                gameState,
                setGameState,
                score,
                setScore,
                record,
                setRecord,
                birdColor,
                setBirdColor,
                birdPositionY,
                setBirdPositionY,
                birdPositionX, 
                setBirdPositionX,
                windowWidth,
                setWindowWidth,
                windowHeight,
                setWindowHeight,
                gameHeight,
                pipes,
                setPipes,
                pipeWidth,
                pipeSpeed, 
                setPipeSpeed,
                jumpHeight,
                leaderboardStatus, 
                setLeaderboardStatus,
                playerName, 
                setPlayerName,
                isRecord, 
                setIsRecord,
                birdImage, 
                setBirdImage,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
