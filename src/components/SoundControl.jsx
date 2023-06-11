import React, { useContext } from "react";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { SoundContext } from "@/components/SoundProvider";


const SoundControl = () => {
    const { volume, setVolume, hoverSound } = useContext(SoundContext);

    const handleVolumeToggle = () => {
        setVolume((prevValue) => {
            if  (prevValue == 0) {
                return 0.5;
            } else if (prevValue == 0.5) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    return (
        <button
            className="absolute bottom-2 right-2 text-yellow-950 p-1 rounded-md"
            onClick={handleVolumeToggle}
            onMouseEnter={hoverSound}
        >
            {volume==0 && <FaVolumeMute className="inline text-5xl" />}
            {volume==0.5 && <FaVolumeDown className="inline text-5xl" />}
            {volume==1 && <FaVolumeUp className="inline text-5xl" />}
        </button>
    );
};

export default SoundControl;
