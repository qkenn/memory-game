import { useState, useEffect, useRef } from 'react';
import { shuffle, generateCards, genRandomInt } from './scripts/helpers';
import './index.css';

import Err from './components/Err';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Stats from './components/Stats';
import Card from './components/Card';
import Intro from './components/Intro';
import GameOver from './components/GameOver';
import Win from './components/Win';
import MainStats from './components/MainStats';

function MyComponent() {}

function App() {
  const [data, setData] = useState();
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);
  const [gameState, setGameState] = useState('intro');
  const [gameData, setGameData] = useState({
    selectedCards: [],
    currentLevelValue: 8,
    score: 0,
  });
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchErr(null);
    setData(null);
    setRefetch(false);

    const controller = new AbortController();

    async function fetchFromAPI() {
      try {
        // https://rickandmortyapi.com/api/character
        // paginates 20 items per page by default
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${genRandomInt()}`,
          {
            signal: controller.signal,
          }
        );
        const fetchedData = await res.json();
        console.log(fetchedData);

        if (!res.ok) {
          setFetchErr('Error fetching data');
        }

        console.log('rerun');

        setData(fetchedData);
      } catch (e) {
        // exclude controller.abort() count as an error
        if (e?.name == 'AbortError') return;

        setFetchErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFromAPI();

    return () => {
      controller.abort();
    };
  }, [refetch]);

  function handleDifficulty(value) {
    setCards(data);
    setCards(generateCards(data.results, +value));
    setGameState('play');
    setGameData({ ...gameData, currentLevelValue: +value });
  }

  function playGame(id) {
    setCards(shuffle(cards));
    console.log(data);

    if (gameData.selectedCards.includes(id)) {
      console.log('you already selected that card');
      setGameState('gameover');
      setGameData({ selectedCards: [], currentLevelValue: 8, score: 0 });
      return;
    }

    if (gameData.selectedCards.length === gameData.currentLevelValue - 1) {
      setGameState('win');
      setGameData({ selectedCards: [], currentLevelValue: 8, score: 0 });
      return;
    }

    setGameData((prev) => {
      const updatedSelectedCards = [...prev.selectedCards, id];
      return {
        ...prev,
        selectedCards: updatedSelectedCards,
        score: prev.score * 2 + 1,
      };
    });

    console.log(gameData.selectedCards.length);
    console.log(gameData.currentLevelValue);
  }

  function restart() {
    setRefetch(true);
    setGameState('intro');
  }

  const levels = [
    { name: 'Easy', value: 8 },
    { name: 'Medium', value: 12 },
    { name: 'Hard', value: 16 },
  ];

  return (
    <>
      {gameState === 'intro' && (
        <Intro levels={levels} handleDifficulty={handleDifficulty} />
      )}
      {gameState === 'gameover' && <GameOver handleReplay={restart} />}
      {gameState === 'win' && <Win handleReplay={restart} />}
      {(gameState === 'play' ||
        gameState === 'gameover' ||
        gameState === 'win') && (
        <>
          <Header score={gameData.score} />

          <MainStats
            score={gameData.score}
            toWin={gameData.currentLevelValue - gameData.selectedCards.length}
          />

          <main className="mx-auto my-20 max-w-[85rem]">
            <>
              {loading && <Spinner />}
              {fetchErr && <Err message={fetchErr} />}
              <>
                <ul className="grid auto-rows-[minmax(10rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-20 px-5">
                  {data &&
                    cards.map((character) => {
                      return (
                        <Card
                          character={character}
                          key={character.id}
                          handlePlayGame={playGame}
                        />
                      );
                    })}
                </ul>

                {data && (
                  <Stats
                    score={gameData.score}
                    toWin={
                      gameData.currentLevelValue - gameData.selectedCards.length
                    }
                  />
                )}
              </>
            </>
          </main>
        </>
      )}
    </>
  );
}

export default App;
