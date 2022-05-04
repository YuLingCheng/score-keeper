import { useRef, useState } from "react";

export default function JinglePlayer(props) {
  const { fileName, title } = props;
  const blockRef = useRef(null);
  const [blockPlaying, setBlockPlaying] = useState(false);
  return (
    <div className="jingle-player">
      <button
        onClick={() => {
          const audio = blockRef.current;
          if (!audio) {
            return;
          }
          if (audio.playState === "play") {
            audio.pause();
            audio.playState = "pause";
            audio.currentTime = 0;
            setBlockPlaying(false);
          } else {
            audio.play();
            audio.playState = "play";
            setBlockPlaying(true);
          }
        }}
      >
        {blockPlaying ? "⏹" : "▶️"} {title}
      </button>
      <audio ref={blockRef} src={fileName} preload="auto" />
    </div>
  );
}
