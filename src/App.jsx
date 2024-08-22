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

    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character', {
          signal: controller.signal,
        });

        // manualy handle errors
        if (res.status != 200) {
          throw new Error('Error Fetching Data');
        }

        // generate cards with fetched data
        const data = await res.json();
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

    data.forEach((entry) => {
      const clone = {};

      // get selected properties and values
      clone.id = entry.id;
      clone.name = entry.name;
      clone.status = entry.status;
      clone.species = entry.species;
      clone.location = entry.location.name;
      clone.image = entry.image;

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
          <ul className="grid grid-cols-3 gap-3">
            {initialData.map((el) => {
              return (
                <li
                  key={el.name}
                  className="flex items-center justify-center bg-slate-100 p-3"
                  onClick={handleClick}
                >
                  {el.name}
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
