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
            className=" border-2 p-2 text-center rounded-lg bg-orange-300  hover:bg-orange-400 border-yellow-950 text-yellow-950 w-20 text-xl"
            onClick={handleVolumeToggle}
            onMouseEnter={hoverSound}
        >
            {volume==0 && <FaVolumeMute className="inline relative -top-[2px]" />}
            {volume==0.5 && <FaVolumeDown className="inline relative -top-[2px]" />}
            {volume==1 && <FaVolumeUp className="inline relative -top-[2px]" />}
        </button>
    );
};

export default SoundControl;
