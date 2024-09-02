function GameOver({ replayHandler, gameResult }) {
  let result;
  let resultText;
  if (gameResult === 'win') {
    result = '🎉 You Win!';
    resultText = 'you selected all the cards.';
  }

  if (gameResult === 'lose') {
    result = '👾 Game Over!';
    resultText = 'you already selected that card.';
  }

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md backdrop-filter">
      <div className="self-center rounded-xl bg-white px-20 py-12 text-center">
        <h3 className="text-netral-800 px-10 py-2 text-center font-[cave-story] text-7xl font-bold">
          {result}
        </h3>
        <p className="mt-3 text-lg">{resultText}</p>
        <button
          className="mt-16 rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-colors hover:bg-neutral-800 hover:text-green-400 focus:bg-neutral-800 focus:text-green-400"
          onClick={replayHandler}
        >
          ↻️ Replay
        </button>
      </div>
    </section>
  );
}

export default GameOver;
