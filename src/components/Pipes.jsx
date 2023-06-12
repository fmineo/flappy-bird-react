import React, { useContext, useEffect } from "react";
import { SoundContext } from "./SoundProvider";
import { GameContext } from "./GameEngine";

const Pipes = () => {
    const {
        gameState,
        setGameState,
        gameSpeed,
        setGameSpeed,
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
        isRecord,
        setIsRecord,
        playerName,
        birdImage,
        setBirdImage,
        birdExploded, 
        setBirdExploded,
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

            const pipe = {
                x: pipeX,
                passed: false,
                coin: true,
            }

            const upperPipe = {
                ...pipe,
                id: Math.random().toString(),
                top: 0,
                height: randomHeight,
            }

            const lowerPipe = {
                ...pipe,
                id: Math.random().toString(),
                top: randomHeight + pipeGap,
                height: gameHeight - randomHeight - pipeGap,
            }

            // const upperPipe = {
            //     id: Math.random().toString(),
            //     top: 0,
            //     height: randomHeight,
            //     x: pipeX,
            //     passed: false,
            // };

            // const lowerPipe = {
            //     id: Math.random().toString(),
            //     top: randomHeight + pipeGap,
            //     height: gameHeight - randomHeight - pipeGap,
            //     x: pipeX,
            //     passed: false,
            // };

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
                                splash();
                            }
                        } else {
                            // questo è il tubo inferiore
                            if (
                                birdBottom >= pipe.top &&
                                pipe.x <= birdRight &&
                                pipe.x + pipeWidth >= birdPositionX
                            ) {
                                splash();
                            }
                            if (
                                pipe.x + (pipeWidth/2) <= birdPositionX &&
                                pipe.coin
                            ) {
                                pointSound();
                                setScore((prevScore) => {
                                    let newScore = prevScore + 1;
                                    if (record < newScore) {
                                        setIsRecord(true);
                                        setRecord(newScore);
                                    }
                                    return newScore;
                                });
                                pipe.passed = true;
                                pipe.coin = false;
                            }
                            // if (
                            //     pipe.x + pipeWidth <= birdPositionX &&
                            //     !pipe.passed
                            // ) {

                            //     setScore((prevScore) => {
                            //         let newScore = prevScore + 1;
                            //         if (record < newScore) {
                            //             setIsRecord(true);
                            //             setRecord(newScore);
                            //         }
                            //         return newScore;
                            //     });
                            //     pipe.passed = true;
                            // }
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

        const saveRecord = async () => {
            try {
                const response = await fetch('/api/addLeaderboardData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        score: record,
                        name: playerName
                    }),
                });

                // if (!response.ok) {
                //     throw new Error('Errore durante la chiamata API');
                // }

                const data = await response.json();
            } catch (error) {
                console.error('Errore durante la chiamata API:', error);
            }
        };

        const splash = () => {
            if (isRecord) {
                saveRecord();
            }
            var prevImage = birdImage;
            breakSound();
            setBirdExploded(true);
            setBirdImage(require("@/assets/explode.gif"));
            setGameSpeed(99999999999999);
            setTimeout(() => {
                setGameState(false);
                setGameSpeed(15);
                setBirdImage(prevImage);
                setBirdExploded(false);
                // setPipes([]);
                // clearInterval(gameLoopInterval);
            }, 1000);

        }

        const gameLoopInterval = setInterval(gameLoop, gameSpeed);
        return () => {
            clearInterval(gameLoopInterval);
        };
    }, [gameSpeed, birdPositionY, birdSize, setPipes, gameState, setGameState, windowHeight, breakSound, windowWidth, pipeWidth, pipeSpeed, jumpHeight, gameHeight, birdPositionX, setScore, record, setRecord, pointSound, pipeGap, isRecord, setIsRecord, playerName, setGameSpeed, birdImage, setBirdImage, setBirdExploded]);

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
                    className={`pipe ${pipe.top + pipe.height === gameHeight ? "bottom" : ""
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
                            className={`coin ${pipe.coin ? "" : "hidden"}`}
                        />
                    )}
                </div>
            ))}
        </>
    );
};

export default Pipes;
