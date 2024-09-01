import { useState, useEffect } from 'react';
import { shuffle, generateCards, genRandomInt } from './scripts/helpers';
import './index.css';

import Err from './components/Err';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Stats from './components/Stats';
import Card from './components/Card';
import Intro from './components/Intro';

function App() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);
  const [gameState, setGameState] = useState('intro');

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
    setData(generateCards(data.results, +value));
    setGameState('play');
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
      {gameState === 'play' && (
        <>
          <Header />

          <main className="mx-auto my-10 max-w-[85rem]">
            <>
              {loading && <Spinner />}
              {fetchErr && <Err message={fetchErr} />}
              {data && (
                <>
                  <ul className="grid auto-rows-[minmax(10rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-20 px-5">
                    {data.map((character) => {
                      return <Card character={character} key={character.id} />;
                    })}
                  </ul>

                  <Stats />
                </>
              )}
            </>
          </main>
        </>
      )}
    </>
  );
}

export default App;
