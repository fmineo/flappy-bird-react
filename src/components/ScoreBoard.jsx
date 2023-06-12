import React, { useContext } from "react";
import { GameContext } from "@/components/GameEngine";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

function generateSpriteNumbers(score) {
    var convertedScore = [];
    var s_score = score.toString();
    for (var i = 0; i < s_score.length; i++) {
        var number = s_score[i];
        convertedScore.push(<Image src={`/flappy-bird-assets-master/sprites/${number}.png`} key={i} alt="" style={{ height: '40px', width: 'auto' }} width={10} height={1} id={`myId-${i}`} />);
    }
    return convertedScore
}

function SpriteNumbers({ score, isRecord }) {
    const sequence = generateSpriteNumbers(score);
    return <p className="flex justify-center items-center gap-2">{isRecord && (<FaStar className="text-yellow-600 text-2xl" />)}{sequence}</p>
}

const ScoreBoard = () => {
    const { score, record, isRecord } = useContext(GameContext);


    

    return (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 text-center">
            <SpriteNumbers score={score} isRecord={isRecord} />
        </div>
    );
};

export default ScoreBoard;
