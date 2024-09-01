import { useState, useEffect } from 'react';
import { shuffle, generateCards, genRandomInt } from './scripts/helpers';
import './index.css';

import Err from './components/Err';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Stats from './components/Stats';

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
    console.log(id);
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
              {fetchedData.map((el) => {
                let statusColor;

                // tailwind does not allow dynamic classes
                switch (el.status) {
                  case 'unknown':
                    statusColor = 'bg-slate-600';
                    break;
                  case 'Alive':
                    statusColor = 'bg-green-600';
                    break;
                  case 'Dead':
                    statusColor = 'bg-red-600';
                    break;
                  default:
                    statusColor = 'bg-slate-600';
                }

                return (
                  <li
                    key={el.id}
                    className="flex flex-col overflow-hidden rounded-xl bg-neutral-800 text-white hover:shadow-[0_0_30px_1px_#4ade80]"
                    onClick={() => playRound(el.id)}
                  >
                    <div>
                      <img
                        src={el.image}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-xl font-medium text-green-300">
                        {el.name}
                      </h3>
                      <p className="mt-1 flex items-center justify-center gap-2 text-sm">
                        <div
                          className={`inline-block h-2 w-2 rounded-full ${statusColor}`}
                        ></div>
                        <div className="text-slate-300">
                          {el.status} - {el.species} {el.type && `(${el.type})`}
                        </div>
                      </p>
                    </div>
                  </li>
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
