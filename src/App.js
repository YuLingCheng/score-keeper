import { useEffect, useState } from "react";
import { readScoreFromStorage, saveScoreToStorage } from "./helpers/storage";
import JinglesPlayer from "./JinglesPlayer";
import ScoreAnnouncement from "./ScoreAnnouncement";
import "./styles.css";

const gameScoreKey = "volleyball";
const beginingGameScore = {
  a: 0,
  b: 0,
  sets: [],
  lastPoint: undefined,
  lang: "fr-FR",
};

export default function App() {
  const [nameA, setNameA] = useState("Team A");
  const [nameB, setNameB] = useState("Team B");
  const [displayValidateGame, setDisplayValidateGame] = useState(false);
  const initialGameScore = readScoreFromStorage(gameScoreKey);
  const [gameScore, setGameScore] = useState(
    initialGameScore ?? beginingGameScore
  );

  useEffect(() => {
    saveScoreToStorage(gameScoreKey, gameScore);
  }, [gameScore]);

  useEffect(() => {
    if (gameScore.a > 24 || gameScore.b > 24) {
      setDisplayValidateGame(true);
      return;
    }
    setDisplayValidateGame(false);
  }, [gameScore.a, gameScore.b]);

  return (
    <div className="App">
      <JinglesPlayer />
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
          <button
            className="a"
            onClick={() =>
              setGameScore((p) => ({ ...p, a: ++p.a, lastPoint: "a" }))
            }
          >
            {gameScore.a}
          </button>
        </div>
        <div className="score">
          <button
            className="b"
            onClick={() =>
              setGameScore((p) => ({ ...p, b: ++p.b, lastPoint: "b" }))
            }
          >
            {gameScore.b}
          </button>
        </div>
        <div className="adjustment a">
          <button onClick={() => setGameScore((p) => ({ ...p, a: --p.a }))}>
            -
          </button>
        </div>
        <div className="read-score">
          <ScoreAnnouncement lang={gameScore.lang}>
            {gameScore[gameScore.lastPoint ?? "a"]}-
            {gameScore[gameScore.lastPoint === "a" ? "b" : "a"]}
          </ScoreAnnouncement>
        </div>
        <div className="adjustment b">
          <button onClick={() => setGameScore((p) => ({ ...p, b: --p.b }))}>
            -
          </button>
        </div>
        <div />
        <div className="game-score">
          {gameScore.sets.map((score, index) => (
            <p key={index} className="a">
              {score[0]}
            </p>
          ))}
        </div>
        <div className="game-score">
          {gameScore.sets.map((score, index) => (
            <p key={index} className="b">
              {score[1]}
            </p>
          ))}
        </div>
        <div />
      </main>
      <footer>
        <div className="actions">
          {displayValidateGame && (
            <button
              className="action"
              onClick={() => {
                setGameScore((p) => ({
                  ...p,
                  a: 0,
                  b: 0,
                  sets: [...p.sets, [p.a, p.b]],
                  lastPoint: undefined,
                }));
                setDisplayValidateGame(false);
              }}
            >
              End set
            </button>
          )}
        </div>
        <div>
          <button
            className="action secondary"
            aria-current={gameScore.lang === "fr-FR"}
            onClick={() => {
              setGameScore((p) => ({
                ...p,
                lang: "fr-FR",
              }));
            }}
          >
            FR
          </button>
          <button
            className="action secondary"
            aria-current={gameScore.lang === "en-US"}
            onClick={() => {
              setGameScore((p) => ({
                ...p,
                lang: "en-US",
              }));
            }}
          >
            EN
          </button>
          <button
            className="action secondary"
            onClick={() => {
              const confirmed = window.confirm("Reset score?");
              if (confirmed) {
                setNameA("Team A");
                setNameB("Team B");
                setGameScore((p) => ({
                  ...beginingGameScore,
                  lang: p.lang ?? beginingGameScore.lang,
                }));
              }
              document.activeElement.blur();
            }}
          >
            Reset game
          </button>
        </div>
      </footer>
    </div>
  );
}
