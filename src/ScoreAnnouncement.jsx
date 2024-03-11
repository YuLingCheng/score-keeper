import { useRef, useState, useEffect } from "react";

const MAX_RETRY = 5;
export const defaultLang = "en-US"; // less buggy on all devices

export default function ScoreAnnouncement(props) {
  const { children, lang = defaultLang } = props;
  const currentScoreRef = useRef(null);
  const tts = window.speechSynthesis;
  const [voices, setVoices] = useState([]);
  const triedReloadVoices = useRef(0);

  useEffect(() => {
    async function fetchVoices() {
      try {
        const voices = await tts?.getVoices();
        setVoices(voices);
      } catch (e) {
        console.warn(e);
      }
    }
    if (voices.length === 0 && triedReloadVoices.current <= MAX_RETRY) {
      fetchVoices();
    }
  }, [voices]);

  const voice =
    voices.find((v) => {
      return v.lang === lang && (v.localService === true || v.default === true);
    }) ??
    voices.find((v) => {
      return v.lang === lang;
    });

  if (tts === undefined) {
    console.warn("No tts support in this browser");
    return <span>{children}</span>;
  }
  return (
    <span
      onClick={() => {
        try {
          const scoreToAnnounce = new SpeechSynthesisUtterance(
            currentScoreRef.current?.textContent,
          );
          scoreToAnnounce.voice = voice;
          scoreToAnnounce.pitch = 1;
          scoreToAnnounce.volume = 1;
          tts.speak(scoreToAnnounce);
        } catch (e) {
          console.warn(e);
        }
      }}
    >
      🗣 Score
      <span className="hidden" ref={currentScoreRef}>
        {children}
      </span>
    </span>
  );
}
