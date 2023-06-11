import React, { useContext, useEffect } from "react";
import { SoundContext } from "./SoundProvider";
import { GameContext } from "./GameEngine";

const Pipes = () => {
    const {
        gameState,
        setGameState,
        gameSpeed,
        birdPositionY,
        birdPositionX,
        birdSize,
        pipes,
        setPipes,
        windowHeight,
        windowWidth,
        gameHeight,
        pipeSpeed,
        pipeWidth,
        jumpHeight,
        setScore,
        record,
        setRecord,
    } = useContext(GameContext);
    const { breakSound, pointSound } = useContext(SoundContext);

    const pipeGap = jumpHeight + birdSize * 2;
    const coinSize = pipeGap / 4;

    useEffect(() => {
        const generatePipes = () => {
            const minPipeHeight = birdSize + 10;
            const maxPipeHeight = gameHeight - minPipeHeight - pipeGap;
            const pipeX = windowWidth;

            const randomHeight =
                Math.floor(
                    Math.random() * (maxPipeHeight - minPipeHeight + 1)
                ) + minPipeHeight;

            const upperPipe = {
                id: Math.random().toString(),
                top: 0,
                height: randomHeight,
                x: pipeX,
                passed: false,
            };

            const lowerPipe = {
                id: Math.random().toString(),
                top: randomHeight + pipeGap,
                height: gameHeight - randomHeight - pipeGap,
                x: pipeX,
                passed: false,
            };

            setPipes((prevPipes) => [...prevPipes, upperPipe, lowerPipe]);
        };

        const gameLoop = () => {
            if (gameState) {
                setPipes((prevPipes) => {
                    const updatedPipes = prevPipes.map((pipe) => ({
                        ...pipe,
                        x: pipe.x - pipeSpeed,
                    }));

                    const filteredPipes = updatedPipes.filter(
                        (pipe) => pipe.x + pipeWidth > 0
                    );

                    // Controlla la collisione con i tubi
                    filteredPipes.forEach((pipe) => {
                        const birdRight = birdPositionX + birdSize;
                        const birdBottom = birdPositionY + birdSize;

                        // se è il tubo superiore
                        if (pipe.top == 0) {
                            if (
                                birdPositionY <= pipe.top + pipe.height &&
                                pipe.x <= birdRight &&
                                pipe.x + pipeWidth >= birdPositionX
                            ) {
                                setGameState(false);
                                setPipes([]);
                                breakSound();
                                clearInterval(gameLoopInterval);
                            }
                        } else {
                            // questo è il tubo inferiore
                            if (
                                birdBottom >= pipe.top &&
                                pipe.x <= birdRight &&
                                pipe.x + pipeWidth >= birdPositionX
                            ) {
                                setGameState(false);
                                setPipes([]);
                                breakSound();
                                clearInterval(gameLoopInterval);
                            }
                            if (
                                pipe.x + pipeWidth <= birdPositionX &&
                                !pipe.passed
                            ) {
                                setScore((prevScore) => {
                                    let newScore = prevScore + 1;
                                    if (record < newScore) {
                                        setRecord(newScore);
                                    }
                                    return newScore;
                                });
                                pointSound();
                                pipe.passed = true;
                            }
                        }
                    });

                    if (filteredPipes.length < 2) {
                        generatePipes();
                    }

                    return filteredPipes;
                });
            } else {
                setPipes([]);
            }
        };

        const gameLoopInterval = setInterval(gameLoop, gameSpeed);
        return () => {
            clearInterval(gameLoopInterval);
        };
    }, [
        gameSpeed,
        birdPositionY,
        birdSize,
        setPipes,
        gameState,
        setGameState,
        windowHeight,
        breakSound,
        windowWidth,
        pipeWidth,
        pipeSpeed,
        jumpHeight,
        gameHeight,
        birdPositionX,
        setScore,
        record,
        setRecord,
        pointSound,
        pipeGap,
    ]);

    return (
        <>
            <style>
                {`
                    .coin {
                        width: ${coinSize}px;
                        height: ${coinSize}px;
                        position: relative;
                        top: -${pipeGap / 2 + coinSize / 2}px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1;
                        background-image: url(/coin.gif);
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                `}
            </style>
            {pipes.map((pipe) => (
                <div
                    key={pipe.id}
                    className={`pipe ${
                        pipe.top + pipe.height === gameHeight ? "bottom" : ""
                    }`}
                    style={{
                        left: `${pipe.x}px`,
                        top: `${pipe.top}px`,
                        width: `${pipeWidth}px`,
                        height: `${pipe.height}px`,
                    }}
                >
                    {pipe.top + pipe.height === gameHeight && (
                        <div
                            className={`coin ${pipe.passed ? "hidden" : ""}`}
                        />
                    )}
                </div>
            ))}
        </>
    );
};

export default Pipes;