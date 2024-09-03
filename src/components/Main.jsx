import Spinner from './Spinner';
import Card from './Card';
import Err from './Err';

function Main({ isLoading, isFetchErr, cards, playRoundHandler }) {
  return (
    <main className="mx-auto my-20 min-h-[70vh] max-w-[85rem]">
      {isLoading && <Spinner />}
      {isFetchErr && <Err message={isFetchErr} />}
      {!isLoading && cards && (
        <ul className="grid auto-rows-[minmax(10rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-20 px-5">
          {cards.map((character) => {
            return (
              <Card
                character={character}
                key={character.id}
                playRoundHandler={playRoundHandler}
              />
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Main;
