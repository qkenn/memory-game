function Intro({ levels, handleDifficulty }) {
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-neutral-100">
      <div className="self-center rounded-xl bg-white px-20 py-12">
        <div className="text-center">
          <h1 className="inline-block rounded-lg bg-neutral-800 px-10 py-2 text-center text-5xl font-bold text-green-400">
            Memory Game
          </h1>
          <div className="mt-8">
            <p>simple game for test and improve your memory.</p>
            <p className="mt-1">
              select all cards without re-selecting the same card to win.
            </p>
          </div>
        </div>
        <div className="mt-16 flex gap-5">
          {levels.map((level) => {
            return (
              <div>
                <button
                  key={level.name}
                  data-value={level.value}
                  onClick={(e) => handleDifficulty(e.target.dataset.value)}
                  className="rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800"
                >
                  {level.name}
                </button>

                <p className="pt-2 text-center">{level.value} cards</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Intro;
