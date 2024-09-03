import SiteTitle from './SiteTitle';

function Header({ score, highScore, replayHandler }) {
  return (
    <>
      <header className="mx-auto my-12 flex max-w-[85rem] flex-col gap-5 px-5 text-center md:flex-row md:items-center md:justify-between">
        <div className="order-1 flex flex-col gap-5 text-left text-xl font-medium md:order-1">
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

        <SiteTitle />

        <button
          className="hover:shadow-greenish focus:shadow-greenish order-3 rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-shadow"
          onClick={replayHandler}
        >
          ↻️ Replay
        </button>
      </header>
    </>
  );
}

export default Header;
