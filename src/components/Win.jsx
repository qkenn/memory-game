function Win({ handleReplay }) {
  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md backdrop-filter">
      <div className="self-center rounded-xl bg-white px-20 py-12 text-center">
        <h3 className="text-netral-800 px-10 py-2 text-center text-6xl font-bold">
          👾 you win!
        </h3>
        <p className="mt-2 text-lg">you selected all the cards.</p>
        <button
          className="mt-16 rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-colors hover:bg-neutral-800 hover:text-green-400 focus:bg-neutral-800 focus:text-green-400"
          onClick={handleReplay}
        >
          replay
        </button>
      </div>
    </section>
  );
}

export default Win;
