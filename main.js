// Weights are representative estimates in units of 10^27 cells; see the on-page sources.
export const habitats = [
  { name: '陸の地下', statistic: 'Magnaboscoら（2018）によれば、陸の地下には約20〜60穣個の原核生物が暮らしていると推定されています。', weight: 400, organism: '地下深くの原核生物', place: '地表から遠く離れた、岩のすきま', lives: [
    { events: [['誕生', '岩のすきまに生まれた。暗い。どうやら、ずっと暗い。'], ['100年後', 'わずかな栄養を使いながら過ごした。特にご報告することはない。'], ['300年後', 'ようやく分裂した。あなたと、あなたのようなものになった。']], end: '何者にもならず、二つになった。', span: '300年・分裂で一区切り' },
    { events: [['誕生', '地下水と岩の境目に生まれた。住所はない。'], ['80年後', '少しだけ代謝した。今世紀いちばんの出来事だった。'], ['200年後', '使える栄養が尽き、活動を止めた。地上では誰も気づかなかった。']], end: '静かな一生だった。最初から最後まで。', span: '200年・活動停止' }
  ]},
  { name: '海底の堆積物', statistic: 'Kallmeyerら（2012）によれば、海底の堆積物には約29穣個の微生物が暮らしていると推定されています。', weight: 300, organism: '海底に暮らす原核生物', place: '海の底、そのまた下の泥の中', lives: [
    { events: [['誕生', '泥の中に生まれた。海の見える暮らしではなかった。'], ['50年後', '隣にも微生物がいた。会話の機能は実装されていなかった。'], ['500年後', '少しずつ得たエネルギーで、ついに分裂した。引っ越しはしなかった。']], end: '一生かけても、海は見えなかった。', span: '500年・分裂で一区切り' },
    { events: [['誕生', '海底の泥の粒に挟まって生まれた。なかなかの圧迫感だ。'], ['30年後', '流れてきた有機物から、わずかな栄養を得た。ごちそうだった。'], ['90年後', '環境が変わり、代謝を続けられなくなった。再び、泥の一部になった。']], end: '地球に還った。移動距離は、ほぼゼロ。', span: '90年・活動停止' }
  ]},
  { name: '土壌', statistic: 'Whitmanら（1998）によれば、地球の土壌には約26穣個の原核生物が暮らしていると推定されています。', weight: 260, organism: '土の中の原核生物', place: '名もない地面、ひとかけらの土の中', lives: [
    { events: [['誕生', '湿った土の中に生まれた。すぐそばに、途方もなく大きな根があった。'], ['2日後', 'まわりの養分を取り込んだ。趣味と仕事と食事が、すべて同じだった。'], ['5日後', '体が二つに分かれた。どちらがあなたなのか、判定する人はいない。']], end: '自分探しをする前に、自分が増えた。', span: '5日・分裂で一区切り' },
    { events: [['誕生', '落ち葉の下に生まれた。なかなか栄養のある物件だった。'], ['1日後', '有機物を分解した。誰からも頼まれていないが、地球の役には立った。'], ['3日後', '原生生物に取り込まれた。食物連鎖というものを、内側から学んだ。']], end: '誰かの一部になるという、結末。', span: '3日・捕食' },
    { events: [['誕生', '雨上がりの土に生まれた。世界は水で満ちていた。'], ['4日後', '水の膜に沿って、少し移動した。生涯最大の旅だった。'], ['8日後', '土が乾き、生き続けることができなくなった。雨予報は、知らなかった。']], end: '天気に左右される、一生だった。', span: '8日・乾燥' }
  ]},
  { name: '海水', statistic: 'Whitmanら（1998）によれば、外洋には約12穣個の原核生物が暮らしていると推定されています。', weight: 120, organism: '海を漂う原核生物', place: 'どこかの海、一滴にも満たない世界', lives: [
    { events: [['誕生', '海の中に生まれた。持ち家はなく、全方向が海だった。'], ['6時間後', '栄養を取り込みながら漂った。大海原を行く、というほどは進んでいない。'], ['1日後', '無事に分裂した。財産はなかったが、DNAは分け合えた。']], end: '海は広かった。あなたは、小さかった。', span: '1日・分裂で一区切り' },
    { events: [['誕生', '海流に運ばれながら生まれた。出身地は、すでに遠い。'], ['3時間後', '何かに出会った。運命の出会いだった。相手はウイルスだった。'], ['8時間後', '感染によって細胞が壊れた。あなたの成分は、また海を漂いはじめた。']], end: '一生は短く、循環は続く。', span: '8時間・ウイルス感染' }
  ]}
];
export function selectHabitat(random = Math.random) {
  const total = habitats.reduce((sum, item) => sum + item.weight, 0);
  let ticket = random() * total;
  for (const item of habitats) { ticket -= item.weight; if (ticket < 0) return item; }
  return habitats[habitats.length - 1];
}
const total = habitats.reduce((sum, item) => sum + item.weight, 0);
const percentage = item => (item.weight / total * 100).toFixed(1);
const odds = document.querySelector('#odds');
odds.innerHTML = habitats.map(item => `<div class="odds-item"><span class="odds-label">${item.name}</span><span class="odds-value">${percentage(item)}<small>%</small></span></div>`).join('');
const birth = document.querySelector('#birth');
const result = document.querySelector('#result');
let count = 0;
birth.addEventListener('click', () => {
  const habitat = selectHabitat();
  const life = habitat.lives[Math.floor(Math.random() * habitat.lives.length)];
  count += 1;
  result.innerHTML = `<div class="result-top"><span>いのちの記録 / ${String(count).padStart(3, '0')}</span><span>完</span></div><h2 id="result-title">あなたは、${habitat.organism}。</h2><p class="result-place">${habitat.place}</p><p class="result-stat">${habitat.statistic}<a href="#about">出典・集計の範囲</a></p><div class="story">${life.events.map(([time, description]) => `<div class="story-item"><span class="story-time">${time}</span><p>${description}</p></div>`).join('')}</div><p class="epitaph">${life.end}</p><p class="fiction">この一生：${life.span}</p><div class="result-actions"><button class="copy-button" id="copy">一生をコピー</button><button class="copy-button rebirth-button" id="rebirth">生まれ直す</button><span class="fiction" id="copy-status" role="status"></span></div>`;
  result.hidden = false;
  result.getAnimations().forEach(animation => animation.cancel());
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    result.animate(
      [{ opacity: 0.25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 450, easing: 'ease-out' }
    );
  }
  birth.innerHTML = 'もう一度、生まれる <span aria-hidden="true">→</span>';
  result.focus({ preventScroll: true });
  result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  document.querySelector('#rebirth').addEventListener('click', () => birth.click());
  document.querySelector('#copy').addEventListener('click', async () => {
    const content = `約100穣分の1\nあなたは、${habitat.organism}。\n${habitat.place}\n\n${life.events.map(([time, description]) => `${time}：${description}`).join('\n')}\n\n${life.end}\n（ジョークゲーム・一生の描写は創作です）`;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(content);
      document.querySelector('#copy-status').textContent = 'コピーしました。';
    } catch {
      const area = document.createElement('textarea');
      area.value = content; area.readOnly = true; area.setAttribute('aria-label', 'コピーする一生の文章');
      area.style.cssText = 'width:100%;height:160px;margin-top:16px;font:14px serif;';
      result.append(area); area.focus(); area.select();
      document.querySelector('#copy-status').textContent = '下の文章を選択してコピーしてください。';
    }
  });
});
