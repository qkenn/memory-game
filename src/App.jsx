import { useState, useEffect } from 'react';
import {
  shuffleValues,
  generateCards,
  generateRandomInt,
} from './scripts/helpers';
import './index.css';

import Intro from './components/Intro';
import GameOver from './components/GameOver';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import GameStats from './components/GameStats';

function App() {
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);
  const [gameState, setGameState] = useState('intro');
  const [gameData, setGameData] = useState({
    selectedCards: [],
    currentLevelValue: 0,
    score: 0,
    highScore: 0,
  });

  useEffect(() => {
    setLoading(true);
    setFetchErr(null);
    setCards(null);

    const controller = new AbortController();

    async function fetchFromAPI() {
      try {
        // https://rickandmortyapi.com/api/character
        // api responds with 20 characters per page
        // get random page with every refetch
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${generateRandomInt()}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          throw new Error('Error fetching data');
        }

        setCards([...generateCards(data.results, gameData.currentLevelValue)]);
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
  }, [gameState]);

  function startGame(levelValue) {
    setGameData({ ...gameData, currentLevelValue: +levelValue });

    setGameState('play');
  }

  function playRound(id) {
    setCards(shuffleValues(cards));

    // game losing branch
    if (gameData.selectedCards.includes(id)) {
      setGameState('lose');
      return;
    }

    // game winning branch
    if (gameData.selectedCards.length === gameData.currentLevelValue - 1) {
      setGameState('win');
      return;
    }

    // niether win nor lose
    // safely update game data
    setGameData((prev) => {
      const updatedSelectedCards = [...prev.selectedCards, id];
      return {
        ...prev,
        selectedCards: updatedSelectedCards,
        score: prev.score * 2 + 1,
      };
    });
  }

  function replayGame() {
    // set highscore
    // set other game data to default values
    setGameData((prev) => {
      return {
        selectedCards: [],
        currentLevelValue: 0,
        score: 0,
        highScore:
          prev.highScore > gameData.score ? prev.highScore : gameData.score,
      };
    });

    // bring back intro page and refetch cards
    setGameState('intro');
  }

  const props = {
    intro: {
      startHandler: startGame,
    },
    gameOver: {
      win: {
        replayHandler: replayGame,
        gameResult: 'win',
      },
      lose: {
        replayHandler: replayGame,
        gameResult: 'lose',
      },
    },
    header: {
      score: gameData.score,
      highScore: gameData.highScore,
      replayHandler: replayGame,
    },
    gameStats: {
      cardsLeftToWin:
        gameData.currentLevelValue - gameData.selectedCards.length,
    },
    main: {
      isLoading: loading,
      isFetchErr: fetchErr,
      cards: cards,
      playRoundHandler: playRound,
    },
  };

  return (
    <>
      {gameState === 'intro' && <Intro {...props.intro} />}
      {gameState === 'lose' && <GameOver {...props.gameOver.lose} />}
      {gameState === 'win' && <GameOver {...props.gameOver.win} />}
      {gameState !== 'intro' && <Header {...props.header} />}
      {gameState !== 'intro' && <GameStats {...props.gameStats} />}
      {gameState !== 'intro' && <Main {...props.main} />}
      {gameState !== 'intro' && <Footer />}
    </>
  );
}

export default App;
