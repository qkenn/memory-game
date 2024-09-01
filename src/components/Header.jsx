function Header({ score, handleReplay }) {
  return (
    <>
      <header className="mx-auto my-12 flex max-w-[85rem] flex-col gap-5 px-5 text-center md:flex-row md:items-center md:justify-between">
        <h3 className="order-2 text-2xl font-medium md:order-1">
          🏆 Score:
          <span className="ml-2 rounded-lg bg-green-400 px-5 py-2 text-neutral-800">
            {score}
          </span>
        </h3>

        <h1 className="order-1 inline-block rounded-lg bg-neutral-800 px-10 py-2 text-5xl font-bold text-green-400 md:order-2">
          Memory Game
        </h1>

        <button
          className="order-3 rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-colors hover:bg-neutral-800 hover:text-green-400 focus:bg-neutral-800 focus:text-green-400"
          onClick={handleReplay}
        >
          ↻️ Replay
        </button>
      </header>
    </>
  );
}

export default Header;
