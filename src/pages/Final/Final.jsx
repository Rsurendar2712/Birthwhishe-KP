import { useState } from "react";
import cfg from "../../config/surpriseConfig.js";
import "./Final.css";

export default function Final() {
  const [text, setText] = useState("");

  // Opens WhatsApp chat with the configured number and the typed message
  const send = () => {
    const msg = text.trim() || "Thank you for the surprise!";
    window.open(`https://wa.me/${7397434270}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <main className="final-page">
      <div className="final-card">
        <img className="final-photo" src={cfg.final.photo} alt="A special memory" />
        <h1 className="final-sentence">{cfg.final.sentence}</h1>

        <textarea className="final-input" rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder={cfg.final.placeholder} aria-label="Your message" />
        <button className="btn final-send" onClick={send}>Send</button>
      </div>
    </main>
  );
}
