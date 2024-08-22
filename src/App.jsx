import { useState, useEffect } from 'react';
import './index.css';

import Err from './components/Err';
import Spinner from './components/Spinner';
import Header from './components/Header';

function App() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    // set loadning and error to initial values
    setLoading(true);
    setErr(null);
    setInitialData(null);

    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch(
          'https://rickandmortyapi.com/api/character/?page=2',
          {
            signal: controller.signal,
          }
        );

        // manualy handle errors
        if (res.status != 200) {
          throw new Error('Error Fetching Data');
        }

        // generate cards with fetched data
        const data = await res.json();
        console.log(data);

        const cards = generateCards(data.results);
        setInitialData(cards);
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

  function generateCards(data) {
    const cards = [];

    data.forEach((character) => {
      const clone = {};

      // get selected properties and values
      clone.id = character.id;
      clone.name = character.name;
      clone.status = character.status;
      clone.type = character.type;
      clone.species = character.species;
      clone.location = character.location.name;
      clone.image = character.image;

      cards.push(clone);
    });

    return cards;
  }

  function shuffle(arr) {
    const arrCopy = [...arr];
    for (let i = arrCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }
    return arrCopy;
  }

  // function geneRandomInt(min = 1, max = 40) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  function handleClick() {
    const shuffledArr = shuffle([...initialData]);

    setInitialData(shuffledArr);
  }

  return (
    <>
      <Header />

      <section className="mx-auto my-10 max-w-[90rem]">
        {loading && <Spinner />}

        {err && <Err message={err} />}

        {initialData && (
          <ul className="grid auto-rows-[minmax(10rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-12 px-5">
            {initialData.map((el) => {
              let statusColor;

              // reason
              // tailwind does not allow dynamic classes
              switch (el.status) {
                case 'unknown':
                  statusColor = 'bg-slate-600';
                  break;
                case 'Alive':
                  statusColor = 'bg-blue-600';
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
                  className="flex flex-col overflow-hidden rounded-xl bg-neutral-800 text-white"
                  onClick={handleClick}
                >
                  <div>
                    <img
                      src={el.image}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-xl font-medium">{el.name}</h3>
                    <p className="mt-1 flex items-center justify-center gap-2 text-sm">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${statusColor}`}
                      ></span>
                      <span className="text-slate-300">
                        {el.status} - {el.species} {el.type && `(${el.type})`}
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}

export default App;
