import { useEffect, useState } from 'react';

function GameOver({ replayHandler, gameResult }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  let emoji;
  let result;
  let resultText;
  if (gameResult === 'win') {
    emoji = '🎉';
    result = ' You Win!';
    resultText = 'you selected all the cards.';
  }

  if (gameResult === 'lose') {
    emoji = '👾';
    result = ' Game Over!';
    resultText = 'you already selected that card.';
  }

  return (
    <section
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md backdrop-filter transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="self-center rounded-xl bg-white px-20 py-12 text-center">
        <h3 className="text-7xl">
          <span>{emoji}</span>
          <span className="text-stroke font-[WubbaLubbaDubDub] tracking-wide text-[#42b4ca]">
            {result}
          </span>
        </h3>
        <p className="mt-5 text-lg">{resultText}</p>
        <button
          className="order-3 mt-16 rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-shadow hover:shadow-greenish focus:shadow-greenish"
          onClick={replayHandler}
        >
          ↻️ Replay
        </button>
      </div>
    </section>
  );
}

export default GameOver;
