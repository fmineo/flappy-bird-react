import React, { useContext, useEffect, useState } from "react";
import { GameContext, birdColors } from "@/components/GameEngine";
import { SoundContext } from "@/components/SoundProvider";
import Image from "next/image";

const Bird = () => {
    const {
        gravity,
        gameSpeed,
        gameState,
        setGameState,
        birdColor,
        birdSize,
        windowHeight,
        gameHeight,
        birdPositionY,
        setBirdPositionY,
        birdPositionX,
        jumpHeight,
        setGameSpeed,
        isRecord,
        record,
        playerName,
        birdImage,
        setBirdImage,
    } = useContext(GameContext);

    const { flapSound, jumpSound, breakSound } = useContext(SoundContext);

    const BIRD_IDENTIFIER = "Bird";
    const birdFlapSpeed = 400;
    const birdIdlePosition = gameHeight / 2 - birdSize / 2;

    const [birdJumping, setBirdJumping] = useState(false);


    useEffect(() => {
        const animationLoopInterval = setInterval(flapSound, birdFlapSpeed);
        return () => {
            clearInterval(animationLoopInterval);
        };
    }, [gameState, flapSound]);

    useEffect(() => {

        if (!gameState) {
            document
                .getElementById(BIRD_IDENTIFIER)
                .classList.remove("bird-jumping");
            document
                .getElementById(BIRD_IDENTIFIER)
                .classList.remove("bird-drop");
        } else if (birdJumping) {
            document
                .getElementById(BIRD_IDENTIFIER)
                .classList.add("bird-jumping");
            document
                .getElementById(BIRD_IDENTIFIER)
                .classList.remove("bird-drop");
        } else {
            document
                .getElementById(BIRD_IDENTIFIER)
                .classList.remove("bird-jumping");
            document.getElementById(BIRD_IDENTIFIER).classList.add("bird-drop");
        }

        let interval;

        if (gameState && birdPositionY < gameHeight - birdSize) {
            interval = setInterval(() => {
                setBirdPositionY((birdPositionY) => birdPositionY + gravity);
            }, gameSpeed);
        } else {
            interval = setInterval(() => {
                // setBirdPositionY(0);
                if (gameState) {
                    const saveRecord = async () => {
                        console.log("SAVE drop")
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

                    var prevImage = birdImage;

                    breakSound();
                    setBirdImage(require("@/assets/explode.gif"));
                    if (isRecord) {
                        saveRecord();
                    }

                    setGameSpeed(99999999999999);

                    setTimeout(() => {
                        setGameState(false);
                        setGameSpeed(15);
                        setBirdImage(prevImage);
                    }, 1000);


                } else {
                    setBirdPositionY(birdIdlePosition);
                }
            }, gameSpeed);

        }

        return () => {
            clearInterval(interval);
        };
    }, [gameState, setBirdPositionY, birdJumping, birdPositionY, windowHeight, birdSize, gameSpeed, setGameState, gameHeight, gravity, birdIdlePosition, breakSound, isRecord, setGameSpeed, record, playerName, birdImage, setBirdImage]);



    // jumping animation
    useEffect(() => {
        const saveRecord = async () => {
            console.log("SAVE jump")

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

        const jump = () => {
            let newBirdPosition = birdPositionY - jumpHeight;

            if (newBirdPosition < 0) {
                if (isRecord) {
                    saveRecord();
                }
                setBirdPositionY(0);
                var prevImage = birdImage;
                breakSound();
                setBirdImage(require("@/assets/explode.gif"));
                setGameSpeed(99999999999999);
                setTimeout(() => {
                    setGameState(false);
                    setGameSpeed(15);
                    setBirdImage(prevImage);
                }, 1000);


            } else {
                setBirdJumping(true);
                setBirdPositionY(newBirdPosition);
                jumpSound();
                setTimeout(() => {
                    setBirdJumping(false);
                }, gameSpeed * 20);
            }
        };

        const handleKeyPress = (event) => {
            if (event.code === "Space") {
                jump();
            }
        };

        if (gameState) {
            document.addEventListener("keydown", handleKeyPress);
            document.addEventListener("click", jump);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("click", jump);
        };
    }, [birdImage, birdPositionY, breakSound, gameSpeed, gameState, isRecord, jumpHeight, jumpSound, playerName, record, setBirdImage, setBirdPositionY, setGameSpeed, setGameState]);

    return (
        <>
            <style>
                {`
                .bird-image {
                  top: ${birdPositionY}px;
                  left: ${birdPositionX}px;
                  width: ${birdSize}px;
                  height: ${birdSize}px;
                  transform-origin: center center;
                  transition: transform 1.${gameSpeed / 200}s;
                  transform: rotate(${birdJumping ? "-50deg" : "0deg"});
                }
                .bird-drop {
                  transition: transform 1.5${gameSpeed}s;
                  transform: rotate(70deg);
                }
              `}
            </style>
            <Image
                id={BIRD_IDENTIFIER}
                className="absolute bird-image aspect-square"
                alt="Bird"
                width={birdSize}
                height={birdSize}
                // src={getImageByFrame(birdFrame)}
                src={birdImage}
            />
        </>
    );
};

export default Bird;
