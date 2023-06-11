import React, { useState, createContext } from "react";
import { useSound } from "use-sound";

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [volume, setVolume] = useState(0);

    let settings = { volume: volume, interrupt: true };

    const [flapSound, { stop: stopFlapSound }] = useSound(
        "/flappy-bird-assets-master/audio/wing.wav",
        settings
    );
    const [breakSound, { stop: stopBreakSound }] = useSound(
        "/flappy-bird-assets-master/audio/hit.wav",
        settings
    );
    const [hoverSound, { stop: stopHoverSound }] = useSound(
        "/flappy-bird-assets-master/audio/swoosh.wav",
        settings
    );
    const [menuSound,  { stop: stopMenuSound } ] = useSound(
        "/sounds/menu.wav",
        { ...settings, loop: true}
    );
    const [gameSound, { stop: stopGameSound }] = useSound(
        "/sounds/game.wav",
        { ...settings, loop: true}
    );
    const [jumpSound, { stop: stopJumpSound }] = useSound(
        "/flappy-bird-assets-master/audio/swoosh.wav",
        settings
    );
    const [pointSound, { stop: stopPointSound }] = useSound(
        "/flappy-bird-assets-master/audio/point.wav",
        settings
    );

    return (
        <SoundContext.Provider
            value={{
                flapSound,
                stopFlapSound,
                breakSound,
                stopBreakSound,
                hoverSound,
                stopHoverSound,
                menuSound,
                stopMenuSound,
                gameSound,
                stopGameSound,
                jumpSound,
                stopJumpSound,
                pointSound,
                stopPointSound,
                volume,
                setVolume,
            }}
        >
            {children}
        </SoundContext.Provider>
    );
};
