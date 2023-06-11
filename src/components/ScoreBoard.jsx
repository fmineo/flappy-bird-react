import React, { useContext } from "react";
import { GameContext } from "@/components/GameEngine";
import Image from "next/image";

function generateSpriteNumbers(score) {
    var convertedScore = [];
    var s_score = score.toString();
    for (var i = 0; i < s_score.length; i++) {
        var number = s_score[i];
        convertedScore.push(<Image src={`/flappy-bird-assets-master/sprites/${number}.png`} key={i} alt="" style={{ height: '40px', width: 'auto', float: 'left', marginLeft: '5px' }} width={10} height={1} id={`myId-${i}`} />);
    }
    return convertedScore
}

function SpriteNumbers({ score }) {
    const sequence = generateSpriteNumbers(score);
    return <p>{sequence}</p>
}

const ScoreBoard = () => {
    const { score, record } = useContext(GameContext);


    

    return (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 text-center">
            <SpriteNumbers score={score} />
        </div>
    );
};

export default ScoreBoard;
