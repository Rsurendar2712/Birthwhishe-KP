// ============================================================
//  EDIT ONLY THIS FILE to customize the whole surprise.
//  Put your own photos in /public/photos and audio in /public/audio,
//  then reference them like "/photos/me.jpg".
// ============================================================

import photo1 from '../photos/1.jpeg';
import photo2 from '../photos/2.jpeg';
import photo3 from '../photos/3.jpeg';
import photo4 from '../photos/8.jpeg';
import photo5 from '../photos/5.jpeg';
import photo6 from '../photos/6.jpeg';
import photo7 from '../photos/7.jpeg';
import moon from '../photos/moon.webp';
const surpriseConfig = {
  name: "Janani",

  // Login credentials the birthday person must type
  login: { username: "Janani", password: "15111999" },
  loginBackground: moon,
  loginPageBackground: photo2,

  // Typed on top of the cake
  cakeMessage: "Happy Birthday, Janani😍! You make every day brighter.",

  // Page 3 – five hidden emojis
  emojis: ["🎁", "🎉", "💖", "🎂", "🥳"],

  // Page 4 – six photos with captions (zig-zag)
  gallery: [
  { src: photo1, caption: "day filled with beautiful memories, endless happiness, and unforgettable moments!." },
  { src: photo2, caption: "Happy Birthday to someone who holds a very special place in my heart. ❤️." },
  { src: photo3, caption: "Our best adventure so far." },
  { src: photo4, caption: "Always there, no matter what." },
  { src: photo5, caption: "Memories I will never trade." },
  { src: photo6, caption: "Another year, another reason to celebrate someone truly special. Keep shining and stay close to my heart.." },
],

  // Page 5 – final photo + sentence
  final: {
    photo: photo7 ,
    sentence: "How do you feel about this surprise? Did you like it? Tell me!",
    placeholder: "Type your message here...",
  },

  // WhatsApp number with country code, digits only (e.g. 919876543210)
  whatsappNumber: "7397434270",

  // Audio (put files in /public/audio)
  audio: {
    fire: "/audio/fire-crackle.mp3",
    birthday: "/audio/happy-birthday.mp3",
    pop: "/audio/party-pop.mp3",
  },
};

export default surpriseConfig;
