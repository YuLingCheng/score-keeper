import JinglePlayer from "./JinglePlayer";

export default function JinglesPlayer(props) {
  return (
    <div className="jingles-player">
      <JinglePlayer title="Block!" fileName="audio/monsterblock.mp3" />
      <JinglePlayer title="Spike!" fileName="audio/herecomestheboom.mp3" />
    </div>
  );
}
