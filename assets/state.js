import { LIKERT, IMPRESSION, PAIRS } from './items.js';
import { TYPES, WINGS, likertProfile, candidates, combine, quality, wing, tritype, centers } from './score.js';

export const VERSION = 1;
export const STORE = 'ennegram-local-v1';
const L = new Map(LIKERT.map(item => [item.id, item]));
const P = new Map(PAIRS.map(item => [item.id, item]));
const ALL_IDS = [...LIKERT, ...IMPRESSION].map(item => item.id);
const validType = value => TYPES.includes(value);
export const fresh = () => ({ version: VERSION, phase: 'intro', order: [], likert: {}, ms: {}, queue: [], pairs: {}, wingAdded: false, shown: [], paragraph: null, idx: 0 });

export function shuffle(values, random = Math.random) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function start(random = Math.random) {
  const groups = TYPES.map(type => shuffle(LIKERT.filter(item => item.type === type), random));
  const order = [];
  let previous;
  for (let round = 0; round < 8; round++) {
    let items = shuffle(groups.map(group => group[round]), random);
    if (items[0].type === previous) items = [...items.slice(1), items[0]];
    items.forEach(item => order.push(item.id));
    previous = items.at(-1).type;
  }
  order.splice(48, 0, IMPRESSION[1].id);
  order.splice(24, 0, IMPRESSION[0].id);
  return { ...fresh(), phase: 'likert', order };
}

export function likertAnswers(state) {
  return Object.entries(state.likert).filter(([id]) => L.has(id)).map(([id, value]) => {
    const item = L.get(id);
    return { type: item.type, value, reverse: item.reverse, half: Number(id.at(-1)) % 2 };
  });
}

export function pairAnswers(state) {
  return state.queue.filter(item => state.pairs[item.id] !== undefined).map(item => {
    const pair = P.get(item.id);
    return { a: pair.a, b: pair.b, share: state.pairs[item.id] };
  });
}

function portrait(state, random) {
  const interim = combine(likertProfile(likertAnswers(state)), pairAnswers(state));
  return { ...state, phase: 'portrait', shown: shuffle(interim.ranking.slice(0, 3), random), paragraph: null, idx: 0 };
}

function addWing(state, random) {
  const interim = combine(likertProfile(likertAnswers(state)), pairAnswers(state));
  const [a, b] = WINGS[interim.main];
  const used = new Set(state.queue.map(item => item.id));
  const extra = shuffle(PAIRS.filter(pair => !used.has(pair.id) && ((pair.a === a && pair.b === b) || (pair.a === b && pair.b === a))), random)
    .slice(0, 2).map(pair => ({ id: pair.id, flip: random() < .5, wing: true }));
  return extra.length ? { ...state, queue: [...state.queue, ...extra], idx: state.queue.length, wingAdded: true }
    : portrait({ ...state, wingAdded: true }, random);
}

function toPairs(state, random) {
  const shortlist = candidates(likertProfile(likertAnswers(state)).z);
  const queue = [];
  for (let i = 0; i < shortlist.length; i++) {
    for (let j = i + 1; j < shortlist.length; j++) {
      const [a, b] = [shortlist[i], shortlist[j]];
      const bank = PAIRS.filter(pair => (pair.a === a && pair.b === b) || (pair.a === b && pair.b === a));
      shuffle(bank, random).slice(0, shortlist.length === 3 ? 3 : 2).forEach(pair => queue.push({ id: pair.id, flip: random() < .5, wing: false }));
    }
  }
  const next = { ...state, phase: 'pairs', queue: shuffle(queue, random), pairs: {}, wingAdded: false, shown: [], paragraph: null, idx: 0 };
  return next.queue.length ? next : addWing(next, random);
}

export function answer(state, value, elapsed = 3000, random = Math.random) {
  if (state.phase === 'likert') {
    if (!Number.isInteger(value) || value < 1 || value > 6) throw new RangeError('Yanıt 1–6 arasında olmalı.');
    const id = state.order[state.idx];
    const next = { ...state, likert: { ...state.likert, [id]: value }, ms: { ...state.ms, [id]: Math.max(0, Math.min(Number(elapsed) || 0, 3600000)) }, queue: [], pairs: {}, wingAdded: false, shown: [], paragraph: null };
    return next.idx + 1 < next.order.length ? { ...next, idx: next.idx + 1 } : toPairs(next, random);
  }
  if (state.phase === 'pairs') {
    if (value !== 0 && value !== 1) throw new RangeError('İki seçenekten birini seçin.');
    const queued = state.queue[state.idx];
    const pair = P.get(queued.id);
    const chosen = ((value === 0) !== queued.flip) ? pair.a : pair.b;
    let next = { ...state, pairs: { ...state.pairs, [pair.id]: chosen === pair.a ? 1 : 0 }, paragraph: null };
    if (!queued.wing && next.wingAdded) {
      next = { ...next, queue: next.queue.filter(item => !item.wing), wingAdded: false };
      const retained = new Set(next.queue.map(item => item.id));
      next.pairs = Object.fromEntries(Object.entries(next.pairs).filter(([id]) => retained.has(id)));
    }
    if (next.idx + 1 < next.queue.length) return { ...next, idx: next.idx + 1 };
    return next.wingAdded ? portrait(next, random) : addWing(next, random);
  }
  if (state.phase === 'portrait') {
    if (!state.shown.includes(value)) throw new RangeError('Gösterilen portrelerden birini seçin.');
    return { ...state, paragraph: value, phase: 'result' };
  }
  return state;
}

export function back(state) {
  if (state.phase === 'likert') return { ...state, idx: Math.max(0, state.idx - 1) };
  if (state.phase === 'pairs') return state.idx > 0 ? { ...state, idx: state.idx - 1 } : { ...state, phase: 'likert', idx: state.order.length - 1 };
  if (state.phase === 'portrait') return { ...state, phase: 'pairs', idx: state.queue.length - 1 };
  return state;
}

export function compute(state) {
  if (state.phase !== 'result' || ALL_IDS.some(id => state.likert[id] === undefined) || state.queue.some(item => state.pairs[item.id] === undefined) || !state.shown.includes(state.paragraph)) throw new Error('Sonuç için testi tamamlayın.');
  const answers = likertAnswers(state);
  const profile = likertProfile(answers);
  const q = quality(answers, Object.entries(state.ms).filter(([id]) => L.has(id)).map(([, time]) => time), IMPRESSION.map(item => state.likert[item.id]));
  const result = combine(profile, pairAnswers(state), state.paragraph, q);
  return { profile, quality: q, result, wing: wing(result.main, result.score), tritype: tritype(result.main, result.score), centers: centers(profile.z) };
}

export function restore(raw) {
  try {
    const s = JSON.parse(raw);
    if (!s || s.version !== VERSION || !['intro', 'likert', 'pairs', 'portrait', 'result'].includes(s.phase)) return null;
    if (!Array.isArray(s.order) || s.order.length !== ALL_IDS.length || new Set(s.order).size !== ALL_IDS.length || s.order.some(id => !ALL_IDS.includes(id))) return null;
    if (![s.likert, s.ms, s.pairs].every(value => value && typeof value === 'object' && !Array.isArray(value))) return null;
    if (Object.entries(s.likert).some(([id, value]) => !ALL_IDS.includes(id) || !Number.isInteger(value) || value < 1 || value > 6)) return null;
    if (Object.entries(s.ms).some(([id, value]) => !ALL_IDS.includes(id) || !Number.isFinite(value) || value < 0 || value > 3600000)) return null;
    if (!Array.isArray(s.queue) || s.queue.length > 20 || new Set(s.queue.map(item => item.id)).size !== s.queue.length || s.queue.some(item => !P.has(item.id) || typeof item.flip !== 'boolean' || typeof item.wing !== 'boolean')) return null;
    if (Object.entries(s.pairs).some(([id, value]) => !s.queue.some(item => item.id === id) || ![0, 1].includes(value))) return null;
    if (typeof s.wingAdded !== 'boolean' || !Array.isArray(s.shown) || s.shown.some(value => !validType(value)) || new Set(s.shown).size !== s.shown.length || s.shown.length > 3 || (s.paragraph !== null && !s.shown.includes(s.paragraph))) return null;
    if (!Number.isInteger(s.idx) || s.idx < 0 || (s.phase === 'likert' && s.idx >= s.order.length) || (s.phase === 'pairs' && s.idx >= s.queue.length)) return null;
    if (s.phase !== 'likert' && s.phase !== 'intro' && ALL_IDS.some(id => s.likert[id] === undefined)) return null;
    if (['portrait', 'result'].includes(s.phase) && (s.shown.length !== 3 || s.queue.some(item => s.pairs[item.id] === undefined))) return null;
    if (s.phase === 'result') compute(s);
    return s;
  } catch { return null; }
}
