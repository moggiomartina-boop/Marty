/**
 * Musica di sottofondo.
 *
 * 1) Se è impostata VITE_MUSIC_URL (es. "/music/christmas.mp3", file messo in
 *    public/music/), viene riprodotto quel file in loop.
 * 2) Altrimenti suona "Valzer della Prima Neve", una composizione ORIGINALE
 *    scritta per questa app e sintetizzata in tempo reale con la Web Audio API:
 *    pianoforte, celesta/campanellini e sonagli. Nessun copyright, zero file.
 *
 * Il suono parte solo dopo un gesto dell'utente (regola dei browser, iOS
 * compreso) e può essere fermato in qualsiasi momento.
 */

const FILE_URL = import.meta.env.VITE_MUSIC_URL || '';
const VOLUME = 0.32; // volume iniziale moderato

/* ----------------------------- partitura ----------------------------------
   Valzer in Fa maggiore, 3/4, 16 battute. Note MIDI con durata in movimenti.
   Accordi: [basso, [note dell'accompagnamento "um-pa-pa"]]                    */
const MELODY = [
  [[69, 2], [72, 1]],              // 1  Fa
  [[74, 1.5], [72, 0.5], [69, 1]], // 2  Rem
  [[70, 1], [74, 1], [77, 1]],     // 3  Sib
  [[76, 2], [72, 1]],              // 4  Do
  [[77, 1.5], [76, 0.5], [74, 1]], // 5  Fa
  [[72, 2], [69, 1]],              // 6  Lam
  [[70, 1], [69, 1], [67, 1]],     // 7  Solm
  [[67, 3]],                       // 8  Do
  [[69, 1], [72, 1], [77, 1]],     // 9  Fa
  [[75, 2], [72, 1]],              // 10 Fa7
  [[74, 1.5], [72, 0.5], [70, 1]], // 11 Sib
  [[73, 2], [77, 1]],              // 12 Sibm (tocco malinconico)
  [[72, 2], [69, 1]],              // 13 Fa
  [[74, 1], [77, 1], [76, 1]],     // 14 Rem
  [[70, 1], [67, 1], [64, 1]],     // 15 Do7
  [[65, 3]],                       // 16 Fa
];
const CHORDS = [
  [41, [53, 57, 60]], [38, [53, 57, 62]], [46, [53, 58, 62]], [48, [52, 55, 60]],
  [41, [53, 57, 60]], [45, [52, 57, 60]], [43, [55, 58, 62]], [48, [52, 55, 58]],
  [41, [53, 57, 60]], [41, [51, 57, 60]], [46, [53, 58, 62]], [46, [53, 58, 61]],
  [41, [53, 57, 60]], [38, [53, 57, 62]], [48, [52, 58, 60]], [41, [53, 57, 60]],
];
const BPM = 104;
const BEAT = 60 / BPM;
const BAR = BEAT * 3;

const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);

/* --------------------------- motore sintetizzato -------------------------- */
class SynthMusic {
  constructor() {
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);

    // riverbero leggero generato (impulso di rumore con decadimento)
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this.makeImpulse(2.4);
    const wet = this.ctx.createGain();
    wet.gain.value = 0.28;
    this.reverb.connect(wet).connect(this.master);

    this.dry = this.ctx.createGain();
    this.dry.connect(this.master);
    this.dry.connect(this.reverb);

    this.noise = this.makeNoise();
    this.bar = 0;
    this.pass = 0;
    this.nextBarTime = 0;
    this.timer = null;
  }

  makeImpulse(seconds) {
    const rate = this.ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = this.ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    return buf;
  }

  makeNoise() {
    const len = this.ctx.sampleRate * 0.5;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** Pianoforte: triangolare + armoniche, attacco rapido e decadimento lungo. */
  piano(midi, t, dur, vel = 0.2) {
    const f = midiToFreq(midi);
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(vel, t + 0.008);
    env.gain.exponentialRampToValueAtTime(vel * 0.35, t + 0.35);
    env.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.4) + 1.1);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(Math.min(f * 7, 9000), t);
    lp.frequency.exponentialRampToValueAtTime(Math.min(f * 2.5, 5000), t + 0.6);
    env.connect(lp).connect(this.dry);
    [[1, 'triangle', 1], [2, 'sine', 0.35], [3, 'sine', 0.12]].forEach(([mult, type, g]) => {
      const o = this.ctx.createOscillator();
      const og = this.ctx.createGain();
      o.type = type;
      o.frequency.value = f * mult;
      o.detune.value = (Math.random() - 0.5) * 4;
      og.gain.value = g;
      o.connect(og).connect(env);
      o.start(t);
      o.stop(t + Math.max(dur, 0.4) + 1.2);
    });
  }

  /** Celesta / campanellino: parziali inarmonici, decadimento cristallino. */
  bell(midi, t, vel = 0.06) {
    const f = midiToFreq(midi);
    [[1, 1], [2.76, 0.4], [5.4, 0.18], [8.93, 0.08]].forEach(([mult, g], i) => {
      const o = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f * mult;
      const decay = 1.6 / (i + 1);
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(vel * g, t + 0.004);
      env.gain.exponentialRampToValueAtTime(0.0001, t + decay);
      o.connect(env).connect(this.dry);
      o.start(t);
      o.stop(t + decay + 0.05);
    });
  }

  /** Sonagli della slitta: brevi raffiche di rumore filtrato acuto. */
  sleigh(t, vel = 0.025) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'bandpass';
    hp.frequency.value = 7500;
    hp.Q.value = 1.2;
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(vel, t + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    src.connect(hp).connect(env).connect(this.dry);
    src.start(t, Math.random() * 0.3);
    src.stop(t + 0.2);
  }

  scheduleBar(i, t) {
    const [bass, chord] = CHORDS[i];
    // accompagnamento "um-pa-pa"
    this.piano(bass, t, BEAT, 0.16);
    chord.forEach((n) => {
      this.piano(n, t + BEAT, BEAT * 0.8, 0.05);
      this.piano(n, t + BEAT * 2, BEAT * 0.8, 0.045);
    });
    // melodia (al secondo giro raddoppiata dalla celesta un'ottava sopra)
    let beat = 0;
    MELODY[i].forEach(([note, len]) => {
      const nt = t + beat * BEAT;
      this.piano(note, nt, len * BEAT, 0.17);
      if (this.pass % 2 === 1) this.bell(note + 12, nt, 0.05);
      beat += len;
    });
    // campanellini decorativi a inizio frase e sonagli leggeri
    if (i % 4 === 0) this.bell(chord[2] + 24, t + BEAT * 2.5, 0.035);
    if (this.pass > 0) [1, 2].forEach((b) => this.sleigh(t + b * BEAT));
  }

  tick = () => {
    // pianifica in anticipo (lookahead) per un tempo stabile
    while (this.nextBarTime < this.ctx.currentTime + 0.6) {
      this.scheduleBar(this.bar, this.nextBarTime);
      this.nextBarTime += BAR;
      this.bar = (this.bar + 1) % MELODY.length;
      if (this.bar === 0) this.pass += 1;
    }
  };

  async play() {
    await this.ctx.resume();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(VOLUME, now + 1.5);
    if (!this.timer) {
      this.nextBarTime = now + 0.1;
      this.timer = setInterval(this.tick, 120);
      this.tick();
    }
  }

  pause() {
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.4);
    clearInterval(this.timer);
    this.timer = null;
    setTimeout(() => { if (!this.timer) this.ctx.suspend(); }, 2000);
  }
}

/* ------------------------------- file audio ------------------------------- */
class FileMusic {
  constructor(url) {
    this.audio = new Audio(url);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = VOLUME;
  }
  play() { return this.audio.play(); }
  pause() { this.audio.pause(); }
}

/* ------------------------------ API pubblica ------------------------------ */
let engine = null;

function getEngine() {
  if (!engine) engine = FILE_URL ? new FileMusic(FILE_URL) : new SynthMusic();
  return engine;
}

/** Da chiamare SEMPRE dentro un gesto dell'utente (tap/click). */
export async function startMusic() {
  try {
    await getEngine().play();
    return true;
  } catch {
    return false;
  }
}

export function stopMusic() {
  engine?.pause();
}
