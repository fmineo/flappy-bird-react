import React, { useContext } from "react";
import Image from "next/image";
import { GameContext, birdColors } from "./GameEngine";
import { SoundContext } from "./SoundProvider";

const ColorSelector = () => {

    const { birdColor, setBirdColor, birdSize, setBirdImage } = useContext(GameContext);
    const { hoverSound } = useContext(SoundContext);

    const colors = Object.keys(birdColors);

    const handleColorChange = (color) => {
        setBirdColor(color);
        setBirdImage(birdColors[color]);
    };

    return (
        <>
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    onMouseEnter={hoverSound}
                    className={`mr-2 p-1 rounded border-yellow-950 hover:bg-orange-400 ${
                        birdColor === color
                            ? "bg-orange-400 border-2"
                            : "bg-orange-200 border"
                    }`}
                >
                    <Image
                        className="aspect-square"
                        src={birdColors[color]}
                        alt={color}
                        width={birdSize}
                        height={birdSize}
                    />
                </button>
            ))}
        </>
    );
};

export default ColorSelector;
