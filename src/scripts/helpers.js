export function shuffle(arr) {
  const arrCopy = [...arr];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

export function generateCards(data, limit = 4) {
  const cards = [];

  for (let i = 1; i <= data.length; i++) {
    if (i > limit) break;

    const clone = {
      id: data[i].id,
      name: data[i].name,
      status: data[i].status,
      type: data[i].type,
      species: data[i].species,
      image: data[i].image,
    };

    cards.push(clone);
  }

  return cards;
}

export function genRandomInt(min = 1, max = 40) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
