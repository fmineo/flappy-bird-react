import Menu from "@/components/Menu";
import React from "react";
import { GameEngine } from "@/components/GameEngine";
import Bird from "@/components/Bird";
import { SoundProvider } from "@/components/SoundProvider";
import ScoreBoard from "@/components/ScoreBoard";
import Pipes from "@/components/Pipes";
import Head from "next/head";

export const appName = "Fmineo FlappyBird React";
export const appDescription = "FlappyBird game clone made with NextJS/ReactJS";

const Game = () => {
    return (
        <div>
            <Head>
                <title>{appName}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <meta name="description" content={appDescription} />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"></link>
                <meta property="twitter:image" content="/android-chrome-512x512.png"></meta>
                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content={appName}></meta>
                <meta property="twitter:description" content={appDescription}></meta>
                <meta property="og:image" content="/android-chrome-512x512.png"></meta>
                <meta property="og:title" content={appName}></meta>
                <meta property="og:description" content={appDescription} />
                <meta property="og:url" content="https://flappybird-react.vercel.app/"></meta>
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
