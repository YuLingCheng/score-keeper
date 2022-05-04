import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [nameA, setNameA] = useState("Team A");
  const [nameB, setNameB] = useState("Team B");
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [displayValidateGame, setDisplayValidateGame] = useState(false);
  const [gameScore, setGameScore] = useState([]);

  useEffect(() => {
    if (scoreA > 24 || scoreB > 24) {
      setDisplayValidateGame(true);
      return;
    }
    setDisplayValidateGame(false);
  }, [scoreA, scoreB]);

  return (
    <div className="App">
      <main className="score-table">
        <div
          className="team-name a"
          contentEditable="true"
          onInput={(e) => setNameA(e.target.value)}
        >
          {nameA}
        </div>
        <div
          className="team-name b"
          contentEditable="true"
          onInput={(e) => setNameB(e.target.value)}
        >
          {nameB}
        </div>
        <div className="score">
          <button className="a" onClick={() => setScoreA((p) => ++p)}>
            {scoreA}
          </button>
        </div>
        <div className="score">
          <button className="b" onClick={() => setScoreB((p) => ++p)}>
            {scoreB}
          </button>
        </div>
        <div className="adjustment a">
          <button onClick={() => setScoreA((p) => --p)}>-</button>
        </div>
        <div className="actions">
          {displayValidateGame && (
            <button
              className="action"
              onClick={() => {
                setGameScore((p) => [...p, [scoreA, scoreB]]);
                setScoreA(0);
                setScoreB(0);
                setDisplayValidateGame(false);
              }}
            >
              Validate score
            </button>
          )}
        </div>
        <div className="adjustment b">
          <button onClick={() => setScoreB((p) => --p)}>-</button>
        </div>
        <div />
        <div className="game-score">
          {gameScore.map((score, index) => (
            <p key={index} className="a">
              {score[0]}
            </p>
          ))}
        </div>
        <div className="game-score">
          {gameScore.map((score, index) => (
            <p key={index} className="b">
              {score[1]}
            </p>
          ))}
        </div>
        <div />
      </main>
      <footer>
        <div></div>
        <button
          className="action secondary"
          onClick={() => {
            const confirmed = window.confirm("Reset score?");
            if (confirmed) {
              setNameA("Team A");
              setNameB("Team B");
              setScoreA(0);
              setScoreB(0);
            }
          }}
        >
          Reset game
        </button>
      </footer>
    </div>
  );
}
