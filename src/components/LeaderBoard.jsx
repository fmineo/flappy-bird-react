import React, { useState, useContext, useEffect } from 'react'
import { BsTrophyFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { GameContext } from './GameEngine';
import { SoundContext } from './SoundProvider';

const LeaderBoard = () => {

    const { hoverSound } = useContext(SoundContext);
    const { leaderboardStatus, setLeaderboardStatus } = useContext(GameContext);

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setLoading] = useState(false)


    const handleClick = () => {
        setLeaderboardStatus(!leaderboardStatus);
    }

    useEffect(() => {
        setLoading(true)
        fetch('/api/getLeaderboardData')
            .then((res) => res.json())
            .then((data) => {
                let sortedLeaderboardData = [...data].sort((a, b) => b.score - a.score);
                setLeaderboardData(sortedLeaderboardData)
                setLoading(false)
            })
    }, [])

    return (
        <>
            {leaderboardStatus && (
                <div
                    className={`absolute border-4 p-4 mt-4 text-center rounded-lg bg-orange-100 border-yellow-950 text-orange-500 w-full sm:w-96 font-bold uppercase text-xl h-5/6`}
                >
                    <button className='p-2 absolute right-0 top-0 text-yellow-950' onMouseEnter={hoverSound} onClick={handleClick}>
                        <FaTimes className='text-2xl' />
                    </button>

                    <BsTrophyFill className='text-yellow-600 inline relative -top-[2px]' /> Classifica

                    <div className='py-4 text-sm overflow-y-auto h-5/6'>
                        <div className='grid grid-cols-2 mt-2 text-orange-500'>
                            <div className='text-left'>
                                Nome
                            </div>
                            <div className='text-right'>
                                Record
                            </div>
                        </div>
                        {isLoading && <p className='mt-2 text-gray-900'>Caricamento...</p> ||
                        leaderboardData.length < 1 && <p className='mt-2 text-gray-900'>Nessun classificato!</p> ||
                        leaderboardData.map((data, index) => (
                            <div key={data.id} className='grid grid-cols-2 mt-2'>
                                <div className='text-left'>
                                    <span className='text-orange-500 w-7 text-center inline-block'>{index + 1}.</span>
                                    <span className='text-gray-900'>{data.name}</span>
                                </div>
                                <div className='text-right'>
                                    <p className='font-bold text-gray-900'>{data.score}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default LeaderBoard