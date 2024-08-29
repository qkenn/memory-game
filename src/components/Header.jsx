function Header({ gameOver, replayHandler }) {
  return (
    <>
      <header className="text-center">
        <h1 className="my-12 text-5xl font-bold">Memory Game</h1>
        {gameOver && <p>Game Over; You already selected that card</p>}
        {gameOver && (
          <button
            className="mt-5 rounded-xl bg-neutral-800 px-5 py-2 text-white"
            r
            onClick={replayHandler}
          >
            Replay
          </button>
        )}
      </header>
    </>
  );
}

export default Header;
