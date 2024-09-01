function Stats({ gameData }) {
  return (
    <>
      <section>
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-lg bg-green-400 px-7 py-2 text-2xl font-bold ring ring-neutral-800">
          Score: {gameData.score}
        </div>
      </section>
    </>
  );
}

export default Stats;
