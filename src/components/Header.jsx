function Header({ score, highScore, replayHandler }) {
  return (
    <>
      <header className="mx-auto my-12 flex max-w-[85rem] flex-col gap-5 px-5 text-center md:flex-row md:items-center md:justify-between">
        <div className="order-2 flex flex-col gap-5 text-left text-xl font-medium md:order-1">
          <div>
            ✨ Score:
            <span className="ml-2 rounded-lg bg-green-400 px-5 py-2 text-neutral-800">
              {score}
            </span>
          </div>

          <div>
            🏆 High Score:
            <span className="ml-2 rounded-lg bg-green-400 px-5 py-2 text-neutral-800">
              {highScore}
            </span>
          </div>
        </div>

        <h1 className="order-1 bg-gradient-to-r from-neutral-800 via-green-400 to-neutral-800 bg-clip-text font-[cave-story] text-8xl font-extrabold tracking-wide text-transparent">
          Memory Game
        </h1>

        <button
          className="order-3 rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-colors hover:bg-neutral-800 hover:text-green-400 focus:bg-neutral-800 focus:text-green-400"
          onClick={replayHandler}
        >
          ↻️ Replay
        </button>
      </header>
    </>
  );
}

export default Header;
