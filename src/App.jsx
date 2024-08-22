import { useState } from 'react';
import './index.css';

function App() {
  const [initialData, setInitialData] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);

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
      <h1 className="bg-red-200 text-lg">Changing grid</h1>

      <section className="mx-auto my-10 max-w-[90rem]">
        <ul className="grid grid-cols-3 gap-3">
          {initialData.map((el) => {
            return (
              <li
                key={el.id}
                className="flex items-center justify-center bg-red-100 p-3"
                onClick={handleClick}
              >
                {el.id}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default App;
