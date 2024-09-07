// fisher-yates shuffle algorithm
export function shuffleValues(arr) {
  const arrCopy = [...arr];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

export function generateCards(data, limit = 8) {
  // shuffle fetched data before use
  const shuffledData = shuffleValues(data);
  const cards = [];

  for (let i = 1; i <= data.length; i++) {
    if (i > limit) break;

    const clone = {
      id: shuffledData[i].id,
      name: shuffledData[i].name,
      status: shuffledData[i].status,
      type: shuffledData[i].type,
      species: shuffledData[i].species,
      image: shuffledData[i].image,
    };

    cards.push(clone);
  }

  return cards;
}

export function generateRandomInt(min = 1, max = 40) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
