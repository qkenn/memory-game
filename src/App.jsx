import { useState, useEffect } from 'react';
import { shuffle, generateCards, genRandomInt } from './scripts/helpers';
import './index.css';

import Err from './components/Err';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Stats from './components/Stats';
import Card from './components/Card';

function App() {
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [gameData, setGameData] = useState({
    score: 0,
    selectedCards: [],
  });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // set loading and error to initial values
    setLoading(true);
    setErr(null);
    setFetchedData(null);

    const controller = new AbortController();

    async function fetchData() {
      try {
        // rickandmorty api paginates 20 items per page by default
        // https://rickandmortyapi.com/api/character
        const res = await fetch(`https://rickandmortyapi.com/api/character`, {
          signal: controller.signal,
        });

        // manualy handle errors
        if (res.status != 200) {
          throw new Error('Error Fetching Data');
        }

        const data = await res.json();
        console.log(data);

        // generate cards with fetched fetchedData
        const cards = generateCards(data.results);
        setFetchedData(cards);
      } catch (e) {
        // exclude manual abort
        if (e?.name == 'AbortError') return;

        setErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  function playRound(id) {
    if (gameOver) return;

    shuffleCards();

    updateGame(id);
  }

  function updateGame(id) {
    if (!gameData.selectedCards.includes(id)) {
      updateGameData(id);
    } else {
      lose();
    }
  }

  function updateGameData(id) {
    setGameData((prev) => {
      const selectedCards = [...prev.selectedCards, id];
      return { ...prev, score: prev.score + 1, selectedCards };
    });
  }

  function lose() {
    // setGameData((prev) => {
    //   return { ...prev, wins: prev.wins + 1 };
    // });

    setGameOver(true);
  }

  function replay() {
    setGameOver(false);

    setGameData((prev) => {
      return { ...prev, score: 0, selectedCards: [] };
    });
  }

  function shuffleCards() {
    const shuffledArr = shuffle([...fetchedData]);
    setFetchedData(shuffledArr);
  }

  return (
    <>
      <Header gameOver={gameOver} replayHandler={replay} />

      <main className="mx-auto my-10 max-w-[85rem]">
        {loading && <Spinner />}

        {err && <Err message={err} />}

        {fetchedData && (
          <>
            <ul className="grid auto-rows-[minmax(10rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-20 px-5">
              {fetchedData.map((character) => {
                return (
                  <Card
                    character={character}
                    key={character.id}
                    playRound={playRound}
                  />
                );
              })}
            </ul>

            <Stats gameData={gameData} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
