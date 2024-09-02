import { useState, useEffect } from 'react';
import { shuffle, generateCards, genRandomInt } from './scripts/helpers';
import './index.css';

import Intro from './components/Intro';
import GameOver from './components/GameOver';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import MainStats from './components/MainStats';

function App() {
  const [data, setData] = useState();
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);
  const [gameState, setGameState] = useState('intro');
  const [refetch, setRefetch] = useState(false);
  const [gameData, setGameData] = useState({
    selectedCards: [],
    currentLevelValue: 8,
    score: 0,
  });

  useEffect(() => {
    setLoading(true);
    setFetchErr(null);
    setData(null);
    setRefetch(false);

    const controller = new AbortController();

    async function fetchFromAPI() {
      try {
        // https://rickandmortyapi.com/api/character
        // paginates 20 items per page by default
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${genRandomInt()}`,
          {
            signal: controller.signal,
          }
        );
        const fetchedData = await res.json();
        console.log(fetchedData);

        if (!res.ok) {
          setFetchErr('Error fetching data');
        }

        setData(fetchedData);
      } catch (e) {
        // prevent controller.abort() count as an error
        if (e?.name == 'AbortError') return;

        setFetchErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFromAPI();

    return () => {
      controller.abort();
    };
  }, [refetch]);

  function handleDifficulty(value) {
    if (!data) return;

    setCards(data);
    setCards(generateCards(data.results, +value));
    setGameState('play');
    setGameData({ ...gameData, currentLevelValue: +value });
  }

  function playGame(id) {
    setCards(shuffle(cards));

    if (gameData.selectedCards.includes(id)) {
      console.log('you already selected that card');
      setGameState('lose');
      return;
    }

    if (gameData.selectedCards.length === gameData.currentLevelValue - 1) {
      setGameState('win');
      return;
    }

    setGameData((prev) => {
      const updatedSelectedCards = [...prev.selectedCards, id];
      return {
        ...prev,
        selectedCards: updatedSelectedCards,
        score: prev.score * 2 + 1,
      };
    });
  }

  function handleReplay() {
    setGameData({ selectedCards: [], currentLevelValue: 8, score: 0 });
    setRefetch(true);
    setGameState('intro');
  }

  const props = {
    intro: {
      handleDifficulty: handleDifficulty,
    },
    gameOver: {
      win: {
        handleReplay: handleReplay,
        gameResult: 'win',
      },
      lose: {
        handleReplay: handleReplay,
        gameResult: 'lose',
      },
    },
    header: {
      score: gameData.score,
      handleReplay: handleReplay,
    },
    mainStats: {
      toWin: gameData.currentLevelValue - gameData.selectedCards.length,
    },
    main: {
      loading: loading,
      fetchErr: fetchErr,
      data: data,
      cards: cards,
      playGame: playGame,
    },
  };

  return (
    <>
      {gameState === 'intro' && <Intro {...props.intro} />}
      {gameState === 'lose' && <GameOver {...props.gameOver.lose} />}
      {gameState === 'win' && <GameOver {...props.gameOver.win} />}
      {gameState !== 'intro' && <Header {...props.header} />}
      {gameState !== 'intro' && <MainStats {...props.mainStats} />}
      {gameState !== 'intro' && <Main {...props.main} />}
      {gameState !== 'intro' && <Footer />}
    </>
  );
}

export default App;
