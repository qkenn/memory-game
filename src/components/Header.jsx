function Header({ score }) {
  return (
    <>
      <header className="mx-auto my-12 flex max-w-[85rem] items-center justify-between px-5 text-center">
        <h3 className="text-2xl font-medium">
          Score:
          <span className="ml-2 rounded-lg bg-green-400 px-5 py-2 text-neutral-800">
            {score}
          </span>
        </h3>

        <h1 className="inline-block rounded-lg bg-neutral-800 px-10 py-2 text-5xl font-bold text-green-400">
          Memory Game
        </h1>

        <button className="rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-colors hover:bg-neutral-800 hover:text-green-400 focus:bg-neutral-800 focus:text-green-400">
          ↻️ Replay
        </button>
      </header>
    </>
  );
}

export default Header;
