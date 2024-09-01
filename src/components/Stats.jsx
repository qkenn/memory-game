function Stats({ score, toWin }) {
  return (
    <>
      <section className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-lg bg-green-400 px-7 py-2 text-center ring ring-neutral-800">
        <div className="text-2xl font-bold">Score: {String(score)}</div>
        <p>{toWin} more to go</p>
      </section>
    </>
  );
}

export default Stats;
