import Spinner from './Spinner';
import Card from './Card';
import Err from './Err';

function Main({ isLoading, isFetchErr, cards, playRoundHandler }) {
  const characters =
    cards &&
    cards.map((character) => {
      return (
        <Card
          character={character}
          key={character.id}
          playRoundHandler={playRoundHandler}
        />
      );
    });

  return (
    <main className="mx-auto my-20 min-h-[70vh] max-w-[85rem]">
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="grid auto-rows-[minmax(13rem,_auto)] grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-20 px-5">
          {characters}
        </ul>
      )}
      {isFetchErr && <Err message={isFetchErr} />}
    </main>
  );
}

export default Main;
