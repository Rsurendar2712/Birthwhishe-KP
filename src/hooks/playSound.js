// Starts audio ONLY when called from a click handler (avoids autoplay blocking).
export function playSound(src, { loop = false, volume = 1 } = {}) {
  if (!src) return null;
  const audio = new Audio(src);
  audio.loop = loop;
  audio.volume = volume;
  audio.play().catch(() => {}); // silently ignore missing files / blocked playback
  return audio;
}

export function stopSound(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}
