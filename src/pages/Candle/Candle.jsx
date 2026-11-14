import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "../../components/Confetti.jsx";
import cfg from "../../config/surpriseConfig.js";
import { playSound, stopSound } from "../../hooks/playSound.js";
import "./Candle.css";

export default function Candle() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("dark"); // dark -> lit -> blown
  const [typed, setTyped] = useState("");
  const [burst, setBurst] = useState(0);
  const fire = useRef(null);
  const music = useRef(null);

  // Stop all audio when leaving the page
  useEffect(() => () => { stopSound(fire.current); stopSound(music.current); }, []);

  // Typewriter effect after the candle is blown
  useEffect(() => {
    if (stage !== "blown") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(cfg.cakeMessage.slice(0, i));
      if (i >= cfg.cakeMessage.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [stage]);

  const turnOnLight = () => {
    fire.current = playSound(cfg.audio.fire, { loop: true, volume: 0.6 });
    setStage("lit");
  };

  const blowCandle = () => {
    stopSound(fire.current);
    playSound(cfg.audio.pop);
    music.current = playSound(cfg.audio.birthday, { loop: true, volume: 0.8 });
    setBurst((b) => b + 1);
    setStage("blown");
  };

  return (
    <main className={`candle-page ${stage}`}>
      {stage === "dark" && (
        <div className="bottom-bar">
          <button className="btn light-btn glow-btn" onClick={turnOnLight}>
            <span>Turn on the light</span>
          </button>
        </div>
      )}

      {stage !== "dark" && (
        <>
          {stage === "blown" && (
            <>
              <div className="ribbon left" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} style={{ "--i": i }} />)}</div>
              <div className="ribbon right" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} style={{ "--i": i }} />)}</div>
            </>
          )}

          {/* Typing Text Positioned Above the Cake */}
          <div className="cake-header-text">
            {stage === "blown" && (
              <p className="cake-text">
                {typed}
                <span className="caret" />
              </p>
            )}
          </div>

          <div className="cake-scene">
            {stage === "lit" && <div className="flame-glow" />}

            <div className="cake">
              {/* Realistic 3D Candle */}
              <div className="candle">
                {stage === "lit" && (
                  <div className="flame">
                    <div className="flame-core" />
                  </div>
                )}
                <div className="wick" />
                <div className="candle-body" />
                {stage === "blown" && (
                  <div className="smoke">
                    <i /><i /><i />
                  </div>
                )}
              </div>

              {/* Top tier */}
              <div className="tier top">
                <div className="icing" />
                <div className="cherry c1" />
                <div className="cherry c2" />
                <div className="cherry c3" />
              </div>
              
              {/* Bottom tier */}
              <div className="tier bottom">
                <div className="icing" />
                <div className="sprinkles" />
              </div>

              <div className="plate" />
            </div>
          </div>

          <div className="bottom-bar">
            {stage === "lit" && (
              <button className="btn glow-btn action-btn" onClick={blowCandle}>
                <span>Blow the candle</span>
              </button>
            )}
            {stage === "blown" && (
              <button className="btn glow-btn action-btn" onClick={() => navigate("/emoji")}>
                <span>Next surprise</span>
              </button>
            )}
          </div>
        </>
      )}
      <Confetti burst={burst} />
    </main>
  );
}