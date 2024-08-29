export function shuffle(arr) {
  const arrCopy = [...arr];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

export function generateCards(fetchedData, limit = 8) {
  let count = 0;
  const cards = [];

  fetchedData.forEach((character) => {
    const clone = {
      id: character.id,
      name: character.name,
      status: character.status,
      type: character.type,
      species: character.species,
      image: character.image,
    };

    if (count >= limit) return;

    cards.push(clone);
    count++;
  });

  return cards;
}

export function genRandomInt(min = 1, max = 40) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
