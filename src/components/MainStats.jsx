function MainStats({ score, toWin }) {
  return (
    <section className="text-center text-lg">
      <p className="text-xl">
        <span className="mr-2 rounded-lg bg-green-400 px-5 py-2 font-medium text-neutral-800">
          {toWin}
        </span>{' '}
        more to go.
      </p>
    </section>
  );
}

export default MainStats;
