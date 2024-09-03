import SiteTitle from './SiteTitle';

function Intro({ startHandler }) {
  const levels = [
    { name: 'easy', value: 8 },
    { name: 'medium', value: 12 },
    { name: 'hard', value: 16 },
  ];

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md backdrop-filter">
      <div className="self-center rounded-xl bg-white px-20 py-12">
        <div className="text-center">
          <SiteTitle />
          <div className="mt-8">
            <p>simple game for test and improve your memory.</p>
            <p className="mt-1">
              select all cards without re-selecting the same card to win.
            </p>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center gap-5">
          {levels.map((level) => {
            return (
              <div key={level.name}>
                <button
                  data-value={level.value}
                  onClick={(e) => startHandler(e.target.dataset.value)}
                  className="hover:shadow-greenish focus:shadow-small rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-shadow"
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
