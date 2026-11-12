import test from 'node:test';
import assert from 'node:assert/strict';
import { LIKERT, IMPRESSION, PAIRS } from '../assets/items.js';
import { CONTENT } from '../assets/content.js';
import { TYPES, WINGS, SCALE, likertProfile, softmax, combine, wing, tritype, CENTER } from '../assets/score.js';
import { fresh, start, answer, back, compute, restore } from '../assets/state.js';

test('Question bank is balanced, uniquely keyed and covers all 36 comparisons',()=>{
  assert.equal(LIKERT.length,72);assert.equal(IMPRESSION.length,2);
  assert.equal(new Set([...LIKERT,...IMPRESSION].map(item=>item.id)).size,74);
  assert.equal(new Set(PAIRS.map(item=>item.id)).size,PAIRS.length);
  for(const type of TYPES){assert.equal(LIKERT.filter(item=>item.type===type).length,8);assert.equal(LIKERT.filter(item=>item.type===type&&item.reverse).length,1);assert.ok(CONTENT[type].wings);}
  for(let a=1;a<=9;a++)for(let b=a+1;b<=9;b++)assert.ok(PAIRS.filter(pair=>pair.a===a&&pair.b===b||pair.a===b&&pair.b===a).length>=2);
});
test('Reverse-keyed statements and observed scale endpoints are scored correctly',()=>{
  const p=likertProfile([{type:1,value:6},{type:1,value:6,reverse:true},{type:2,value:1,reverse:true}]);
  assert.equal(p.mean[1],3.5);assert.equal(p.pct[1],50);assert.equal(p.mean[2],6);assert.equal(p.pct[2],100);
});
test('Flat evidence remains inconclusive; softmax is stable for large inputs',()=>{
  const scores=Object.fromEntries(TYPES.map(type=>[type,10000]));
  const values=softmax(scores);assert.ok(Math.abs(Object.values(values).reduce((a,b)=>a+b,0)-1)<1e-12);
  const p=likertProfile(TYPES.map(type=>({type,value:3})));
  assert.equal(combine(p,[],null).label,'undetermined');
});
test('Wings are neighbors only; three-center profile includes exactly one from each center',()=>{
  const scores=Object.fromEntries(TYPES.map(type=>[type,type]));
  for(const type of TYPES){const w=wing(type,scores);assert.ok(w.wing===null||WINGS[type].includes(w.wing));const tri=tritype(type,scores);assert.equal(tri[0],type);assert.equal(new Set(tri.map(t=>CENTER[t])).size,3);}
});

function finish(type){
  let s=start();let count=0;
  while(s.phase!=='result'&&count++<120){
    if(s.phase==='likert'){
      const id=s.order[s.idx],item=LIKERT.find(item=>item.id===id);
      const value=item?(item.reverse?SCALE+1-(item.type===type?6:2+(Number(item.id.at(-1))%2)):(item.type===type?6:2+(Number(item.id.at(-1))%2))):2;
      s=answer(s,value,3000);
    }else if(s.phase==='pairs'){
      const queued=s.queue[s.idx],pair=PAIRS.find(pair=>pair.id===queued.id);
      const chosen=pair.a===type?pair.a:pair.b===type?pair.b:pair.a;
      const shownA=queued.flip?pair.b:pair.a;
      s=answer(s,chosen===shownA?0:1,3000);
    }else s=answer(s,s.shown.includes(type)?type:s.shown[0],3000);
  }
  assert.equal(s.phase,'result');return s;
}
for(const type of TYPES)test(`Complete adaptive flow recognizes a synthetic type ${type} and restores safely`,()=>{
  const state=finish(type),data=compute(state);assert.equal(data.result.main,type);assert.ok(state.queue.length<=14);assert.equal(new Set(state.queue.map(item=>item.id)).size,state.queue.length);assert.deepEqual(restore(JSON.stringify(state)),state);assert.ok(Object.values(data.profile.pct).every(value=>Number.isFinite(value)&&value>=0&&value<=100));
});
test('Incomplete and corrupted saves cannot produce a result',()=>{
  assert.throws(()=>compute(fresh()));assert.equal(restore('{broken'),null);
  const s=start();s.likert[s.order[0]]=99;assert.equal(restore(JSON.stringify(s)),null);
  s.likert={};s.order[1]=s.order[0];assert.equal(restore(JSON.stringify(s)),null);
});
test('Back navigation can change earlier answers and invalidates downstream evidence',()=>{
  let s=finish(5);s={...s,phase:'portrait'};s=back(s);assert.equal(s.phase,'pairs');
  s={...s,idx:0};s=back(s);assert.equal(s.phase,'likert');s=answer(s,3,2500);assert.equal(s.phase,'pairs');assert.equal(s.paragraph,null);assert.equal(Object.keys(s.pairs).length,0);
});
test('Input ranges are enforced and fast/straightline responders get a cautious label',()=>{
  assert.throws(()=>answer(start(),7),RangeError);
  const s=finish(2);Object.keys(s.ms).forEach(id=>s.ms[id]=100);assert.equal(compute(s).result.label,'undetermined');
});
