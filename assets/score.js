// Enneagram scoring engine. Pure functions, no imports, so it can be
// simulated with plain node (--experimental-strip-types).
//
// Design follows the source review (Hook et al. 2021; Scott 2011; Cao &
// Drasgow 2019; Salgado 2015; Simms 2019):
//   1. normative 6-point Likert screen, person-centred (removes acquiescence)
//   2. desirability-matched forced choices between the top candidates
//      (measures the difference score directly, where scale reliability is weakest)
//   3. unlabeled paragraph choice among the top three
//   (graded choices and a certainty follow-up were tested in simulation: they
//   added 0.2 points of accuracy, not worth the extra friction, so both are simple taps)
//   -> softmax probabilities, a label that says how sure we are, quality flags
export const TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const SCALE = 6; // Likert points, no midpoint
export const CENTER = {
    8: "gut", 9: "gut", 1: "gut",
    2: "heart", 3: "heart", 4: "heart",
    5: "head", 6: "head", 7: "head",
};
export const WINGS = {
    1: [9, 2], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 6],
    6: [5, 7], 7: [6, 8], 8: [7, 9], 9: [8, 1],
};
// direction of disintegration (stress) and integration (growth)
export const STRESS = { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 };
export const GROWTH = { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 };
// Starting values tuned with scripts/ennea-sim.ts. Recalibrate on real pilot data.
export const PARAMS = {
    forced: 1.6, // weight of a fully one-sided forced-choice record for a type
    paragraph: 0.4, // bonus for the paragraph picked as "most like me"
    k: 1.2, // softmax sharpness: score -> probability (best calibrated in simulation)
    minSplitHalf: 0.3, // below this the answers look random
    fourthCandidate: 0.1, // add a 4th candidate when its Likert-only probability is at least this
    strong: { p: 0.7, gap: 0.4 },
    likely: { p: 0.5, gap: 0.2 },
    undetermined: 0.4,
    wingMargin: 0.3,
};
const zero = () => ({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
const byScore = (s) => [...TYPES].sort((a, b) => s[b] - s[a] || a - b);
export function softmax(s, k = PARAMS.k) {
    const max = Math.max(...TYPES.map((t) => s[t]));
    const e = zero();
    let sum = 0;
    for (const t of TYPES)
        sum += e[t] = Math.exp(k * (s[t] - max));
    for (const t of TYPES)
        e[t] /= sum;
    return e;
}
export function likertProfile(answers) {
    const sum = zero();
    const n = zero();
    for (const a of answers) {
        sum[a.type] += a.reverse ? SCALE + 1 - a.value : a.value;
        n[a.type] += 1;
    }
    const mean = zero();
    const pct = zero();
    for (const t of TYPES) {
        mean[t] = n[t] ? sum[t] / n[t] : (SCALE + 1) / 2;
        pct[t] = Math.round(((mean[t] - 1) / (SCALE - 1)) * 100);
    }
    const avg = TYPES.reduce((s, t) => s + mean[t], 0) / 9;
    const sd = Math.sqrt(TYPES.reduce((s, t) => s + (mean[t] - avg) ** 2, 0) / 9);
    const z = zero();
    for (const t of TYPES)
        z[t] = (mean[t] - avg) / Math.max(sd, 0.3);
    return { mean, pct, z };
}
// Top three, plus a fourth when it still carries real probability.
export function candidates(z) {
    const r = byScore(z);
    const p = softmax(z);
    const out = r.slice(0, 3);
    if (p[r[3]] >= PARAMS.fourthCandidate)
        out.push(r[3]);
    return out;
}
// Split-half consistency: correlate each type's mean on half of its statements
// with its mean on the other half, across the nine types. Real people land
// high (the same types stand out in both halves); random clicking lands near 0.
export function splitHalf(answers) {
    const s = [zero(), zero()];
    const c = [zero(), zero()];
    for (const a of answers) {
        s[a.half][a.type] += a.reverse ? SCALE + 1 - a.value : a.value;
        c[a.half][a.type] += 1;
    }
    const x = TYPES.map((t) => s[0][t] / Math.max(c[0][t], 1));
    const y = TYPES.map((t) => s[1][t] / Math.max(c[1][t], 1));
    const mx = x.reduce((p, v) => p + v, 0) / 9;
    const my = y.reduce((p, v) => p + v, 0) / 9;
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < 9; i++) {
        sxy += (x[i] - mx) * (y[i] - my);
        sxx += (x[i] - mx) ** 2;
        syy += (y[i] - my) ** 2;
    }
    return sxx && syy ? sxy / Math.sqrt(sxx * syy) : 0;
}
export function quality(answers, msPerItem, impression) {
    const raw = answers.map((a) => a.value);
    const mean = raw.reduce((s, v) => s + v, 0) / Math.max(raw.length, 1);
    const counts = new Map();
    raw.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
    const topShare = Math.max(0, ...counts.values()) / Math.max(raw.length, 1);
    const sorted = [...msPerItem].sort((a, b) => a - b);
    const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 99999;
    const im = impression.length ? impression.reduce((s, v) => s + v, 0) / impression.length : 0;
    const sh = splitHalf(answers);
    return {
        acquiescence: mean > SCALE - 0.8 || mean < 1.8,
        straightline: topShare > 0.75,
        speeding: median < 1300,
        inconsistent: sh < PARAMS.minSplitHalf,
        idealized: im >= SCALE - 0.5,
        splitHalf: sh,
    };
}
export const flagged = (q) => q.acquiescence || q.straightline || q.speeding || q.inconsistent;
export function combine(profile, pairs, paragraph, q) {
    const won = zero();
    const seen = zero();
    for (const p of pairs) {
        seen[p.a] += 1;
        seen[p.b] += 1;
        won[p.a] += p.share;
        won[p.b] += 1 - p.share;
    }
    const forced = zero();
    const score = zero();
    for (const t of TYPES) {
        forced[t] = seen[t] ? won[t] / seen[t] : 0.5;
        score[t] = profile.z[t] + PARAMS.forced * (forced[t] - 0.5) * 2;
    }
    if (paragraph)
        score[paragraph] += PARAMS.paragraph;
    const prob = softmax(score);
    const ranking = byScore(score);
    const [main, runnerUp] = ranking;
    const p1 = prob[main];
    const p2 = prob[runnerUp];
    const likertTop = byScore(profile.z)[0];
    const asked = TYPES.filter((t) => seen[t] > 0);
    const forcedTop = asked.length ? asked.sort((a, b) => forced[b] - forced[a] || profile.z[b] - profile.z[a])[0] : likertTop;
    const agreement = [likertTop, forcedTop, paragraph ?? likertTop].filter((t) => t === main).length;
    let label;
    if (p1 >= PARAMS.strong.p && p1 - p2 >= PARAMS.strong.gap && agreement >= 2)
        label = "strong";
    else if (p1 >= PARAMS.likely.p && p1 - p2 >= PARAMS.likely.gap)
        label = "likely";
    else if (p1 >= PARAMS.undetermined)
        label = "close";
    else
        label = "undetermined";
    // idealized self-description: trust the result one step less
    if (q?.idealized)
        label = label === "strong" ? "likely" : label === "likely" ? "close" : label;
    // careless responding: don't pretend to know
    if (q && flagged(q))
        label = "undetermined";
    return { score, prob, ranking, main, runnerUp, label, agreement, forced };
}
// Wing = the stronger neighbour on the combined score (Likert + any wing
// tie-breakers); "balanced" when the two are close. Tentative by design.
export function wing(main, score) {
    const [l, r] = WINGS[main];
    if (Math.abs(score[l] - score[r]) < PARAMS.wingMargin)
        return { wing: null, other: l };
    return score[l] > score[r] ? { wing: l, other: r } : { wing: r, other: l };
}
// Tritype: strongest type of each center, main type first, then the
// other two centers ordered by the strength of their leading type.
export function tritype(main, score) {
    const lead = (c) => byScore(score).find((t) => CENTER[t] === c);
    const others = ["gut", "heart", "head"]
        .filter((c) => c !== CENTER[main])
        .map(lead)
        .sort((a, b) => score[b] - score[a]);
    return [main, ...others];
}
// Centers ordered from most to least used, by average person-centred score.
export function centers(z) {
    const avg = (c) => {
        const ts = TYPES.filter((t) => CENTER[t] === c);
        return ts.reduce((s, t) => s + z[t], 0) / ts.length;
    };
    return ["gut", "heart", "head"].sort((a, b) => avg(b) - avg(a));
}
