import DifficultyBtn from './DifficultyBtn';
import SiteTitle from './SiteTitle';

function Intro({ startHandler }) {
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
          <DifficultyBtn
            levelName="Easy"
            levelValue={8}
            startHandler={startHandler}
          />
          <DifficultyBtn
            levelName="Medium"
            levelValue={12}
            startHandler={startHandler}
          />
          <DifficultyBtn
            levelName="Hard"
            levelValue={16}
            startHandler={startHandler}
          />
        </div>
      </div>
    </section>
  );
}

export default Intro;
