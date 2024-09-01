import { useState, useEffect } from 'react';
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

function App() {
  const [data, setData] = useState();
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);
  const [gameState, setGameState] = useState('intro');
  const [gameData, setGameData] = useState({
    selectedCards: [],
    currentLevelValue: 4,
  });

  useEffect(() => {
    setLoading(true);
    setFetchErr(null);
    setData(null);

    const controller = new AbortController();

    async function fetchFromAPI() {
      try {
        // https://rickandmortyapi.com/api/character
        // paginates 20 items per page by default
        const res = await fetch(`https://rickandmortyapi.com/api/character`, {
          signal: controller.signal,
        });
        const fetchedData = await res.json();
        console.log(fetchedData);

        if (!res.ok) {
          setFetchErr('Error fetching data');
        }

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
  }, []);

  function handleDifficulty(value) {
    setCards(data);
    setCards(generateCards(data.results));
    setGameState('play');
    setGameData({ ...gameData, currentLevelValue: 4 });
  }

  function playGame(id) {
    setCards(shuffle(cards));
    console.log(data);

    if (gameData.selectedCards.includes(id)) {
      console.log('you already selected that card');
      setGameState('gameover');
      setGameData({ selectedCards: [], currentLevelValue: 8 });
      return;
    }

    if (gameData.selectedCards.length === gameData.currentLevelValue - 1) {
      setGameState('win');
      setGameData({ selectedCards: [], currentLevelValue: 8 });
      return;
    }

    setGameData((prev) => {
      const updatedSelectedCards = [...prev.selectedCards, id];
      return { ...prev, selectedCards: updatedSelectedCards };
    });

    console.log(gameData.selectedCards.length);
    console.log(gameData.currentLevelValue);
  }

  function restart() {
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
          <Header />

          <main className="mx-auto my-10 max-w-[85rem]">
            <>
              {loading && <Spinner />}
              {fetchErr && <Err message={fetchErr} />}
              <>
                <ul className="grid auto-rows-[minmax(10rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-20 px-5">
                  {cards.map((character) => {
                    return (
                      <Card
                        character={character}
                        key={character.id}
                        handlePlayGame={playGame}
                      />
                    );
                  })}
                </ul>

                <Stats />
              </>
            </>
          </main>
        </>
      )}
    </>
  );
}

export default App;
