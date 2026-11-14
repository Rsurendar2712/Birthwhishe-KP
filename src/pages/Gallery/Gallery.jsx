import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import cfg from "../../config/surpriseConfig.js";
import "./Gallery.css";

export default function Gallery() {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  // Parallax: expose scroll position as a CSS variable
  useEffect(() => {
    const onScroll = () => pageRef.current?.style.setProperty("--scroll", window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hover tilt for the 3D floating effect
  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)`;
  };
  const untilt = (e) => { e.currentTarget.style.transform = ""; };

  return (
    <main className="gallery-page" ref={pageRef}>
      <h1 className="gallery-title">Moments worth keeping</h1>

      <div className="gallery-list">
        {cfg.gallery.map((item, i) => (
          <section key={i} className={`g-row ${i % 2 ? "right" : "left"}`} style={{ "--depth": 0.03 + (i % 3) * 0.02, "--tilt": `${i % 2 ? 4 : -4}deg` }}>
            <div className="float">
              <figure className="vintage" onMouseMove={tilt} onMouseLeave={untilt}>
                <img src={item.src} alt={item.caption} loading="lazy" />
                <span className="grain" />
              </figure>
            </div>
            <p className="g-caption">{item.caption}</p>
          </section>
        ))}
      </div>

      <div className="gallery-bottom"><button className="btn" onClick={() => navigate("/final")}>Next</button></div>
    </main>
  );
}
