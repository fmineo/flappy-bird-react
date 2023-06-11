import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "@/components/GameEngine";
import { SoundContext } from "@/components/SoundProvider";
import Image from "next/image";

export const birdColors = {
    Blue: [
        require("../assets/Bird/Blue/frame-1.png"),
        require("../assets/Bird/Blue/frame-2.png"),
        require("../assets/Bird/Blue/frame-3.png"),
        require("../assets/Bird/Blue/frame-4.png"),
    ],
    Red: [
        require("../assets/Bird/Red/frame-1.png"),
        require("../assets/Bird/Red/frame-2.png"),
        require("../assets/Bird/Red/frame-3.png"),
        require("../assets/Bird/Red/frame-4.png"),
    ],
    Gray: [
        require("../assets/Bird/Gray/frame-1.png"),
        require("../assets/Bird/Gray/frame-2.png"),
        require("../assets/Bird/Gray/frame-3.png"),
        require("../assets/Bird/Gray/frame-4.png"),
    ],
    Yellow: [
        require("../assets/Bird/Yellow/frame-1.png"),
        require("../assets/Bird/Yellow/frame-2.png"),
        require("../assets/Bird/Yellow/frame-3.png"),
        require("../assets/Bird/Yellow/frame-4.png"),
    ],
};

const Bird = () => {
    const {
        gravity,
        gameSpeed,
        gameState,
        setGameState,
        birdColor,
        birdFrame,
        setBirdFrame,
        birdSize,
        windowHeight,
        gameHeight,
        birdPositionY,
        setBirdPositionY,
        birdPositionX,
        jumpHeight,
    } = useContext(GameContext);

    const { flapSound, jumpSound, breakSound } = useContext(SoundContext);

    const BIRD_IDENTIFIER = "Bird";
    const birdFlapSpeed = 100;
    const birdIdlePosition = gameHeight / 2 - birdSize / 2;

    const [birdJumping, setBirdJumping] = useState(false);

    const getImageByFrame = (frame) => {
        const birdColorFrames = birdColors[birdColor];
        return birdColorFrames[frame];
    };

    useEffect(() => {
        const animateBird = () => {
            setBirdFrame((prevFrame) => {
                if (prevFrame < 3) {
                    return prevFrame + 1;
                }
                if (gameState) {
                    flapSound();
                }
                return 0;
            });
        };

        const animationLoop = () => {
            animateBird();
        };

        const animationLoopInterval = setInterval(animationLoop, birdFlapSpeed);
        return () => {
            clearInterval(animationLoopInterval);
        };
    }, [gameState, flapSound, setBirdFrame]);

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
            breakSound();
            setGameState(false);
            setBirdPositionY(birdIdlePosition);
        }

        return () => {
            clearInterval(interval);
        };
    }, [
        gameState,
        setBirdPositionY,
        birdJumping,
        birdPositionY,
        windowHeight,
        birdSize,
        gameSpeed,
        setGameState,
        gameHeight,
        gravity,
        birdIdlePosition,
        breakSound,
    ]);

    // jumping animation
    useEffect(() => {
        const jump = () => {
            let newBirdPosition = birdPositionY - jumpHeight;
            if (newBirdPosition < 0) {
                setBirdPositionY(0);
                setGameState(false);
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
    });

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
                src={getImageByFrame(birdFrame)}
            />
        </>
    );
};

export default Bird;
