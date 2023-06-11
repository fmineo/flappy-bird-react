import Menu from "@/components/Menu";
import React from "react";
import { GameEngine } from "@/components/GameEngine";
import Bird from "@/components/Bird";
import { SoundProvider } from "@/components/SoundProvider";
import ScoreBoard from "@/components/ScoreBoard";
import Pipes from "@/components/Pipes";
import Head from "next/head";

const Game = () => {
    return (
        <div>
            <Head>
                <title>MyFlappyBird</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <SoundProvider>
                <GameEngine>
                    <Bird />
                    <Pipes />
                    <ScoreBoard />
                    <Menu />
                </GameEngine>
            </SoundProvider>
        </div>
    );
};

export default Game;
