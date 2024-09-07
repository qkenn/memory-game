export default function DifficultyBtn({ levelName, levelValue, startHandler }) {
  return (
    <div>
      <button
        onClick={() => startHandler(levelValue)}
        className="focus:shadow-small rounded-md bg-green-400 px-10 py-2 text-xl font-medium text-neutral-800 transition-shadow hover:shadow-greenish"
      >
        {levelName}
      </button>

      <p className="pt-2 text-center">{levelValue} cards</p>
    </div>
  );
}
