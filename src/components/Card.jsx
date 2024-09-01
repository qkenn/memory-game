import { useState } from 'react';

function Card({ character, handlePlayGame }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  let statusColor;

  // tailwind does not allow dynamic classes
  switch (character.status) {
    case 'unknown':
      statusColor = 'bg-slate-600';
      break;
    case 'Alive':
      statusColor = 'bg-green-600';
      break;
    case 'Dead':
      statusColor = 'bg-red-600';
      break;
    default:
      statusColor = 'bg-slate-600';
  }

  return (
    <li
      className="flex cursor-pointer flex-col self-start overflow-hidden rounded-xl bg-neutral-800 text-white transition-shadow hover:shadow-[0_0_30px_1px_#4ade80]"
      onClick={() => handlePlayGame(character.id)}
    >
      <div>
        <img
          src={character.image}
          className={`h-full w-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-xl font-medium text-green-300">{character.name}</h3>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          <div
            className={`inline-block h-2 w-2 rounded-full ${statusColor}`}
          ></div>
          <div className="text-slate-300">
            {character.status} - {character.species}{' '}
            {character.type && `(${character.type})`}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
