import { LIKERT, IMPRESSION, PARAGRAPHS, PAIRS } from './items.js';
import { TYPES, WINGS, STRESS, GROWTH } from './score.js';
import { CONTENT } from './content.js';
import { STORE, fresh, start, answer, back, compute, restore } from './state.js';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const items = new Map([...LIKERT, ...IMPRESSION].map(item => [item.id, item]));
const pairs = new Map(PAIRS.map(item => [item.id, item]));
const names = { 1:'Reformcu', 2:'Yardımsever', 3:'Başarı Odaklı', 4:'Bireyci', 5:'Araştırmacı', 6:'Sadık', 7:'Hevesli', 8:'Meydan Okuyan', 9:'Uzlaştırıcı' };
const motives = {1:'İyi, doğru ve tutarlı olmak.',2:'Sevmek, sevilmek ve bağ kurmak.',3:'Değerli hissetmek ve bir iz bırakmak.',4:'Kendine özgü bir anlam bulmak.',5:'Anlamak, öğrenmek ve yetkin olmak.',6:'Güvenmek ve sağlam bir zemin bulmak.',7:'Olasılıkları keşfetmek, özgür hissetmek.',8:'Kendi yolunu seçmek ve korumak.',9:'İç huzuru ve uyumu korumak.'};
const centers = { gut:'İçgüdü · Eylem', heart:'Kalp · Duygu', head:'Zihin · Düşünce' };
const labels = ['Hiç katılmıyorum','Katılmıyorum','Biraz katılmıyorum','Biraz katılıyorum','Katılıyorum','Tamamen katılıyorum'];
let storageAvailable = true;
let state = fresh();
let view = 'home';
let busy = false;
let shownAt = performance.now();
let toastTimer;
try { state = restore(localStorage.getItem(STORE)) || fresh(); } catch { storageAvailable = false; }

function save() {
  try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { storageAvailable = false; }
}
function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
}
function moveTop() { window.scrollTo({top:0,behavior:'instant'}); }
function openDialog(html) { $('#dialog-content').innerHTML = html; $('#detail-dialog').showModal(); }
function closeDialog() { $('#detail-dialog').close(); }

function typeDetail(type) {
  const content = CONTENT[type];
  if (!content) return;
  openDialog(`<div class="dialog-number">${type}</div><p class="eyebrow">DOKUZ BAKIŞTAN BİRİ</p><h2>${names[type]}</h2><p>${esc(content.short)}</p><h3>İçten içe aradığın</h3><p>${motives[type]}</p><h3>Bu örüntüyü tanı</h3><p>${esc(content.detailed)}</p><p>Bu açıklama Enneagram modelinin bir yorumudur. Kendini tek bir tanıma sığdırmak zorunda değilsin.</p><button class="button primary small" data-action="close-dialog">Keşfetmeye devam et →</button>`);
}

function renderOrbit() {
  const point = type => {
    const angle = (type * 40 - 90) * Math.PI / 180;
    return [50 + Math.cos(angle) * 38, 50 + Math.sin(angle) * 38];
  };
  const path = list => list.map((type,index) => (index?'L':'M') + point(type).join(' ')).join(' ') + 'Z';
  $('#type-orbit').innerHTML = `<svg class="orbit-svg" viewBox="0 0 100 100" aria-hidden="true"><circle class="orbit-dash" cx="50" cy="50" r="46"/><circle class="orbit-ring" cx="50" cy="50" r="38"/><circle class="orbit-ring" cx="50" cy="50" r="28"/><path class="orbit-geometry" d="${path([1,4,2,8,5,7])} ${path([9,6,3])}"/></svg><div class="orbit-center" id="orbit-center"></div>${TYPES.map(type => {const [x,y]=point(type);return `<button class="orbit-node" style="left:${x}%;top:${y}%" data-type="${type}" aria-label="Tip ${type}: ${names[type]}">${type}</button>`;}).join('')}`;
  const update = type => {
    $('#orbit-center').innerHTML = `<span class="center-number">${type}</span><strong>${names[type]}</strong><small>${motives[type]}</small>`;
    document.querySelectorAll('.orbit-node').forEach(button => button.classList.toggle('active',Number(button.dataset.type) === type));
  };
  document.querySelectorAll('.orbit-node').forEach(button => {
    button.addEventListener('pointerenter',() => update(Number(button.dataset.type)));
    button.addEventListener('focus',() => update(Number(button.dataset.type)));
  });
  update(9);
}

function renderHome() {
  const saved = state.phase !== 'intro';
  $('#resume-card').hidden = !saved;
  if (saved) {
    const count = Object.keys(state.likert).length;
    $('#resume-card').innerHTML = `<div><strong>${state.phase==='result'?'Keşif sonucun bu cihazda duruyor.':'Kaldığın yer seni bekliyor.'}</strong><p>${state.phase==='result'?'Yanıtlarını yeniden girmene gerek yok.':`${count} / 74 ifade yanıtlandı. İlerlemen bu cihazda saklandı.`}</p></div><button data-action="start">${state.phase==='result'?'Sonucumu gör':'Devam et'} →</button>`;
    $('#hero-start').innerHTML = `${state.phase==='result'?'Sonucumu gör':'Kaldığım yerden devam et'} <span aria-hidden="true">→</span>`;
  } else $('#hero-start').innerHTML = 'Yolculuğa başla <span aria-hidden="true">→</span>';
}

function stageHeader(stage,progress) {
  return `<div class="test-toolbar"><button data-action="pause">← Ara ver / Ana sayfa</button><span class="saved-status"><span class="status-dot"></span>${storageAvailable?'İlerlemen bu cihazda saklanıyor':'İlerlemen yalnız bu sekmede tutuluyor'}</span></div><div class="stage-labels"><span class="${stage===1?'current':'done'}">01 · KENDİNİ GÖZLEMLE</span><span class="${stage===2?'current':stage>2?'done':''}">02 · YAKLAŞIMINI SEÇ</span><span class="${stage===3?'current':''}">03 · BÜTÜNÜ GÖR</span></div><div class="progress-track" role="progressbar" aria-label="Keşif ilerlemesi" aria-valuenow="${Math.round(progress)}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${progress}%"></div></div>`;
}

function renderQuestion(focus) {
  let html;
  if (state.phase === 'likert') {
    const item = items.get(state.order[state.idx]);
    html = `${stageHeader(1,state.idx/74*80)}<div class="test-transition"><div class="question-meta"><p class="eyebrow">ÇOĞU ZAMAN NASIL HİSSEDERSİN?</p><span class="question-count">İfade ${state.idx+1} / 74</span></div><div class="question-card"><h1 tabindex="-1" id="question-title">${esc(item.text.tr)}</h1></div><div class="scale-labels"><span>Bana hiç benzemiyor</span><span>Bana tamamen benziyor</span></div><div class="answer-scale" role="group" aria-labelledby="question-title">${labels.map((label,index) => `<button class="scale-option${state.likert[item.id]===index+1?' selected':''}" data-answer="${index+1}" aria-label="${index+1}: ${label}" aria-pressed="${state.likert[item.id]===index+1}"><span class="number">${index+1}</span><span class="answer-label">${label}</span></button>`).join('')}</div><p class="question-hint">İdeal halini değil, günlük hayattaki halini düşün.<br><kbd>1</kbd> – <kbd>6</kbd> ile yanıtla · <button data-action="back">← Önceki ifade</button></p></div>`;
  } else if (state.phase === 'pairs') {
    const queued=state.queue[state.idx], pair=pairs.get(queued.id);
    const options=queued.flip?[pair.textB.tr,pair.textA.tr]:[pair.textA.tr,pair.textB.tr];
    html = `${stageHeader(2,80+state.idx/state.queue.length*16)}<div class="test-transition"><div class="question-meta"><p class="eyebrow">SANA GÖRE SEÇİLEN KARŞILAŞTIRMALAR</p><span class="question-count">Karşılaştırma ${state.idx+1} / ${state.queue.length}</span></div><h1 class="test-heading" tabindex="-1" id="question-title">Hangisi sana daha yakın?</h1><p class="test-subtitle">İkisi de sana uyabilir. Çoğu zaman seni daha iyi anlatan yaklaşımı seç.</p><div class="pair-choices">${options.map((text,index)=>`<button class="choice-card" data-answer="${index}" aria-label="Seçenek ${index+1}: ${esc(text)}"><span class="choice-code">${index+1}</span><p>${esc(text)}</p></button>`).join('')}</div><p class="question-hint"><kbd>1</kbd> veya <kbd>2</kbd> ile seç · <button data-action="back">← Önceki adım</button></p></div>`;
  } else {
    html = `${stageHeader(3,97)}<div class="test-transition"><div class="question-meta"><p class="eyebrow">SON BİR BAKIŞ</p><span class="question-count">Son adım</span></div><h1 class="test-heading" tabindex="-1" id="question-title">Hangi portrede kendini buluyorsun?</h1><p class="test-subtitle">Bir davranıştan çok, seni içten içe harekete geçiren şeyi düşün.</p><div class="portrait-choices">${state.shown.map((type,index)=>`<button class="choice-card" data-answer="${type}" aria-label="Portre ${index+1}"><span class="choice-code">${index+1}</span><p>${esc(PARAGRAPHS[type].tr)}</p></button>`).join('')}</div><p class="question-hint"><kbd>1</kbd> – <kbd>3</kbd> ile seç · <button data-action="back">← Önceki adım</button></p></div>`;
  }
  $('#test-screen').innerHTML=html;
  $('#test-screen').dataset.step=state.phase+':'+state.idx;
  shownAt=performance.now();
  if (focus) $('#question-title').focus({preventScroll:true});
}

function radar(pct) {
  const point=(type,radius)=>{const angle=(type*40-90)*Math.PI/180;return [170+Math.cos(angle)*radius,170+Math.sin(angle)*radius];};
  return `<svg class="radar" viewBox="0 0 340 340" role="img" aria-label="Dokuz tipteki ifade uyumu; ayrıntılı değerler aşağıdaki listede"><circle cx="170" cy="170" r="117"/><circle cx="170" cy="170" r="78"/><circle cx="170" cy="170" r="39"/>${TYPES.map(type=>{const [x,y]=point(type,117);const [lx,ly]=point(type,141);return `<line x1="170" y1="170" x2="${x}" y2="${y}"/><text x="${lx}" y="${ly+4}" text-anchor="middle">${type}</text>`;}).join('')}<polygon class="radar-area" points="${TYPES.map(type=>point(type,117*pct[type]/100).join(',')).join(' ')}"/>${TYPES.map(type=>{const [x,y]=point(type,117*pct[type]/100);return `<circle class="radar-dot" cx="${x}" cy="${y}" r="3"/>`;}).join('')}</svg>`;
}

function renderResult(focus) {
  const data=compute(state), {profile,result,quality:q}=data;
  const type=result.main, content=CONTENT[type], [left,right]=WINGS[type];
  const wingText=data.wing.wing?`${type}w${data.wing.wing} · ${names[data.wing.wing]} kanadı`:'Komşu kanatlar birbirine yakın';
  const messages={strong:'Yanıtların belirgin bir örüntüye işaret ediyor.',likely:'Bu örüntü yanıtlarında daha çok öne çıkıyor.',close:'Birden fazla örüntü sana yakın görünüyor.',undetermined:'Sonucunu tek bir tipe indirgemeyelim.'};
  const cautions=[];
  if(q.speeding)cautions.push('Bazı ifadeler oldukça hızlı yanıtlandı.');
  if(q.straightline||q.acquiescence)cautions.push('Yanıtlarında aynı seçeneğe yönelme yüksek.');
  if(q.inconsistent)cautions.push('Benzer örüntülere verdiğin yanıtlar farklılaşmış olabilir.');
  const ranking=[...TYPES].sort((a,b)=>profile.pct[b]-profile.pct[a]||a-b);
  $('#result-screen').innerHTML=`<div class="result-topbar"><button data-action="home">← Ana sayfa</button><div class="result-actions"><button class="button secondary small" data-action="download">Sonucu indir ↓</button><button class="button secondary small" data-action="print">Yazdır / PDF ↗</button></div></div><div class="result-hero"><div><p class="eyebrow">KEŞFİNİN ÖNE ÇIKAN EĞİLİMİ</p><h1 class="result-name" id="result-title" tabindex="-1"><span>TİP ${type}</span>${names[type]}</h1><p class="result-short">${motives[type]}<br>${esc(content.short)}</p><div class="result-tags"><span class="tag">${esc(wingText)}</span><span class="tag">Üç merkez · ${data.tritype.join(' – ')}</span></div></div>${radar(profile.pct)}</div><div class="result-quality"><strong>${messages[result.label]}</strong><p>${cautions.join(' ')} ${result.label==='strong'||result.label==='likely'?'Yine de bu, kesin bir kişilik tanısı ya da bilimsel olasılık değildir.':`Tip ${type} ve Tip ${result.runnerUp} açıklamalarını birlikte okumak daha anlamlı olabilir.`}</p></div><div class="result-grid"><article class="result-panel"><h2>Bu örüntü sana ne söylüyor?</h2><p>${esc(content.detailed)}</p><h3>Yakın olan diğer bakış</h3><p><button data-type="${result.runnerUp}">Tip ${result.runnerUp} · ${names[result.runnerUp]} ↗</button><br>${motives[result.runnerUp]}</p><h3>Kanatların: ${left} ve ${right}</h3><p>${data.wing.wing?esc(content.wings[String(data.wing.wing)]):`Her iki komşu tipin özellikleri de sana yakın görünüyor. Tip ${left} ile Tip ${right} açıklamalarını oku; tek bir kanat seçmek zorunda değilsin.`}</p><details class="result-expand"><summary>Modelde zorlanma ve gelişim yönleri</summary><h3>Zorlanırken · Tip ${STRESS[type]}</h3><p>${esc(content.stress)}</p><h3>Gelişim yönü · Tip ${GROWTH[type]}</h3><p>${esc(content.growth)}</p><p>Bu bağlantılar Enneagram modeline aittir; herkes için zorunlu ya da ölçülmüş bir değişim yolu değildir.</p></details></article><article class="result-panel"><h2>Dokuz tipte yanıt uyumun</h2><div class="score-list">${ranking.map((t,index)=>`<div class="score-row${index===0?' first':''}"><span class="score-number">${t}</span><div><div class="score-name"><button data-type="${t}">${names[t]} ↗</button></div><div class="score-bar"><i style="width:${profile.pct[t]}%"></i></div></div><span class="score-pct">%${profile.pct[t]}</span></div>`).join('')}</div><p class="small-note">Her oran, o tipe ait ifadelere verdiğin yanıtların uyumudur. Oranların toplamı 100 olmak zorunda değildir; kişilik olasılığı veya klinik güven puanı değildir.</p><h3>Merkezlerin sıralaması</h3><p>${data.centers.map((center,index)=>`${index+1}. ${centers[center]}`).join('<br>')}</p><p class="small-note">Ana eğilim, üç aşamanın birlikte değerlendirilmesiyle belirlenir. Bu yüzden ifade uyumu en yüksek tipten farklı olabilir. Üç merkez ve kanatlar, keşfi derinleştirmek için yorumlayıcı ipuçlarıdır.</p></article></div><div class="result-bottom"><p>Kendini tanımak bir etiket bulmaktan daha büyük bir yolculuk.<br>Bu araç psikolojik değerlendirme veya uzman görüşü yerine geçmez.</p><button class="button secondary" data-action="restart">Yeni bir keşfe başla ↗</button><button class="clear-link" data-action="clear">Bu cihazdaki yanıtlarımı sil</button></div>`;
  if(focus)$('#result-title').focus({preventScroll:true});
}

function render(focus=false) {
  $('#home-screen').hidden=view!=='home';
  $('#test-screen').hidden=view!=='test';
  $('#result-screen').hidden=view!=='result';
  if(view==='home')renderHome();
  else if(view==='result')renderResult(focus);
  else renderQuestion(focus);
}

function begin() {
  if(state.phase==='intro'){state=start();save();}
  view=state.phase==='result'?'result':'test';
  closeDialog();render(true);moveTop();
}
function choose(value,button) {
  if(busy||view!=='test')return;
  busy=true;
  if(button)button.classList.add('selected');
  const next=answer(state,value,performance.now()-shownAt);
  saveNext(next);
  setTimeout(()=>{const previous=state.phase;state=next;busy=false;view=next.phase==='result'?'result':'test';render(true);if(previous!==next.phase)moveTop();},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:180);
}
function saveNext(next){try{localStorage.setItem(STORE,JSON.stringify(next));}catch{storageAvailable=false;}}

document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button)return;
  if(button.dataset.type){typeDetail(Number(button.dataset.type));return;}
  if(button.dataset.answer!==undefined){choose(Number(button.dataset.answer),button);return;}
  const action=button.dataset.action;
  if(busy&&['back','pause','home','start','restart'].includes(action))return;
  if(action==='start')begin();
  if(action==='close-dialog')closeDialog();
  if(action==='home'||action==='pause'){view='home';render();moveTop();}
  if(action==='back'){state=back(state);save();render(true);}
  if(action==='privacy')openDialog('<p class="eyebrow">GİZLİLİK, SADECE SÖZDE DEĞİL</p><h2>Yanıtların sende kalır.</h2><p>Hesap açman, isim veya e-posta paylaşman gerekmez. Test yanıtların ve ilerlemen yalnız bu tarayıcının yerel depolamasında tutulur. Google Sheets’e, bir analiz servisine veya başka bir sunucuya gönderilmez.</p><p>Ortak bir cihaz kullanıyorsan işin bittiğinde yerel yanıtlarını silebilirsin. Tarayıcı verilerini temizlemek de kaydı siler. Barındırma sağlayıcısı, sayfanın açılması için standart erişim kayıtları tutabilir.</p><p>Enneagram, kendini gözlemlemek için kullanılan dokuz tipli bir modeldir. Bu ücretsiz deneysel araç klinik tanı koymaz; sonuçları bilimsel olarak doğrulanmış kişilik olasılıkları değildir.</p><button class="button secondary small" data-action="clear">Bu cihazdaki yanıtları sil</button>');
  if(action==='restart'||action==='clear')openDialog(`<p class="eyebrow">YALNIZ BU TARAYICIDAKİ KAYIT</p><h2>${action==='restart'?'Yeni bir sayfa açalım mı?':'Yanıtlarını silmek istiyor musun?'}</h2><p>Bu cihazda kaydedilmiş ilerlemen ve sonucun silinecek. Bu işlem geri alınamaz.</p><button class="button primary small" data-action="${action==='restart'?'confirm-restart':'confirm-clear'}">${action==='restart'?'Sil ve yeniden başla':'Evet, yanıtlarımı sil'}</button> <button class="button secondary small" data-action="close-dialog">Vazgeç</button>`);
  if(action==='confirm-clear'||action==='confirm-restart'){
    try{localStorage.removeItem(STORE);}catch{}
    state=fresh();view='home';closeDialog();
    if(action==='confirm-restart')begin();else{render();moveTop();toast('Bu tarayıcıdaki yanıtların silindi.');}
  }
  if(action==='print')window.print();
  if(action==='download'){
    const data=compute(state),result={uygulama:'Ennegram',surum:1,tarih:new Date().toISOString(),not:'Deneysel öz değerlendirme; klinik tanı veya doğrulanmış kişilik olasılığı değildir.',anaEgilim:data.result.main,kanat:data.wing.wing,ucMerkez:data.tritype,ifadeUyumu:data.profile.pct,sonucYorumu:data.result.label};
    const url=URL.createObjectURL(new Blob([JSON.stringify(result,null,2)],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download='ennegram-sonuc-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Sonuç dosyan cihazına indirildi.');
  }
});
document.querySelectorAll('[data-home-link]').forEach(link=>link.addEventListener('click',event=>{if(view!=='home'){event.preventDefault();view='home';render();document.querySelector(link.hash).scrollIntoView();}}));
$('#detail-dialog').addEventListener('click',event=>{if(event.target===$('#detail-dialog')){const box=event.target.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeDialog();}});
document.addEventListener('keydown',event=>{
  if(view!=='test'||busy||$('#detail-dialog').open||event.ctrlKey||event.metaKey||event.altKey||['INPUT','TEXTAREA'].includes(event.target.tagName)||event.repeat)return;
  if(event.key==='ArrowLeft'){event.preventDefault();state=back(state);save();render(true);return;}
  const number=Number(event.key);
  if(!Number.isInteger(number)||number<1)return;
  const max=state.phase==='likert'?6:state.phase==='pairs'?2:3;
  if(number>max)return;
  event.preventDefault();const value=state.phase==='likert'?number:state.phase==='pairs'?number-1:state.shown[number-1];
  choose(value,$(`[data-answer="${value}"]`));
});

$('#type-grid').innerHTML=TYPES.map(type=>`<button class="type-card" data-type="${type}" aria-label="Tip ${type}, ${names[type]} hakkında bilgi"><span class="type-index">TİP ${String(type).padStart(2,'0')}</span><h3>${names[type]}</h3><p>${motives[type]}</p><span class="type-num" aria-hidden="true">${type}</span><span class="type-arrow" aria-hidden="true">↗</span></button>`).join('');
renderOrbit();render();
if(!storageAvailable)toast('Tarayıcı depolaması kapalı; bu sekmeyi kapatırsan ilerleme kaybolabilir.');
