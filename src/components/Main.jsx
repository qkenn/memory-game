import Spinner from './Spinner';
import Card from './Card';

function Main({ loading, fetchErr, data, cards, playGame }) {
  return (
    <main className="mx-auto my-20 max-w-[85rem]">
      {loading && <Spinner />}
      {fetchErr && <Err message={fetchErr} />}
      <ul className="grid auto-rows-[minmax(10rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-20 px-5">
        {data &&
          cards.map((character) => {
            return (
              <Card
                character={character}
                key={character.id}
                handlePlayGame={playGame}
              />
            );
          })}
      </ul>
    </main>
  );
}

export default Main;
