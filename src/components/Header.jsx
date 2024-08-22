function Header({ scores, gameOver }) {
  return (
    <>
      <header className="text-center">
        <h1 className="my-12 text-5xl font-bold">Memory Game</h1>
        <p className="text-xl">
          Score: {scores.score} HighScore: {scores.highScore}
        </p>
        {gameOver && <p>Game Over; You already selected that card</p>}
      </header>
    </>
  );
}

export default Header;
