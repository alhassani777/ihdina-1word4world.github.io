// إهدنا — الموقع التسويقي: التبديل اللغوي (21 لغة)، المشاريع، المشاركة
(function(){
  const I=window.IHDINA_I18N, P=window.IHDINA_PROJECTS;
  const LANGS=window.IHDINA_LANGS, TR=window.IHDINA_TR||{};
  const CONTACT_EMAIL='useronline.235@gmail.com';
  const BASE=['ar','en','de']; // اللغات الأم المعرّفة في i18n.js وprojects.js
  let lang=localStorage.getItem('ihdina_mkt_lang')||'ar';
  if(!LANGS[lang]) lang='ar';
  let axis='core';

  // ===== محرك الترجمة مع fallback ذكي: اللغة المطلوبة ← الإنجليزية ← العربية =====
  function meta(code){ return LANGS[code]||LANGS.en; }
  // نص واجهة حسب المفتاح
  function T(key){
    // 1) حزمة اللغة التوسعية
    if(TR[lang] && TR[lang][key]!=null) return TR[lang][key];
    // 2) اللغات الأم في i18n
    const v=I.t[key];
    if(v){
      if(v[lang]!=null) return v[lang];      // لغة أم مباشرة
      if(v.en!=null) return v.en;            // fallback إنجليزي
      if(v.ar!=null) return v.ar;
    }
    return '';
  }
  // اسم/وصف كائن (محور أو مشروع) بحقل معيّن مع fallback
  function field(obj, key){
    if(!obj) return '';
    const o=obj[key];
    if(o){ if(o[lang]!=null) return o[lang]; if(o.en!=null) return o.en; if(o.ar!=null) return o.ar; }
    return '';
  }
  // محور/مشروع من الحزم التوسعية إن وُجد
  function axName(a){ const b=TR[lang]&&TR[lang].axes&&TR[lang].axes[a.id]; return (b&&b.name)||field(a,'name'); }
  function axTag(a){ const b=TR[lang]&&TR[lang].axes&&TR[lang].axes[a.id]; return (b&&b.tag)||field(a,'tag'); }
  function prName(p,i){ const b=TR[lang]&&TR[lang].proj&&TR[lang].proj[i]; return (b&&b.name)||field(p,'name'); }
  function prPitch(p,i){ const b=TR[lang]&&TR[lang].proj&&TR[lang].proj[i]; return (b&&b.pitch)||field(p,'pitch'); }

  // ===== بيانات ثابتة: الكتل المعرفية + الطبقات + المعرض =====
  const BLOCKS=[
    {t:'b_alaq',c:'b_alaq_c'},{t:'b_muddathir',c:'b_muddathir_c'},
    {t:'b_muzzammil',c:'b_muzzammil_c'},{t:'b_fatiha',c:'b_fatiha_c'},
    {t:'b_ikhlas',c:'b_ikhlas_c'},{t:'b_asr',c:'b_asr_c'}
  ];
  const LAYERS=[
    {ar:'النصّ والتلقّي',en:'Text & reception',de:'Text & Empfang'},
    {ar:'اللغة والدلالة',en:'Language & meaning',de:'Sprache & Bedeutung'},
    {ar:'السياق وأسباب النزول',en:'Context & occasions',de:'Kontext & Anlässe'},
    {ar:'ترتيب النزول',en:'Order of revelation',de:'Offenbarungsreihenfolge'},
    {ar:'الكتلة المعرفية',en:'The knowledge block',de:'Der Wissensblock'},
    {ar:'التصنيف الوظيفي',en:'Functional classification',de:'Funktionale Klassifikation'},
    {ar:'التكامل المتراكم',en:'Cumulative integration',de:'Kumulative Integration'},
    {ar:'البنية الفركتالية',en:'Fractal structure',de:'Fraktale Struktur'},
    {ar:'مزامنة السيرة',en:'Seerah synchronization',de:'Seerah-Synchronisation'},
    {ar:'الاستنباط',en:'Deduction',de:'Ableitung'},
    {ar:'الأثر القلبي',en:'Heart impact',de:'Wirkung aufs Herz'},
    {ar:'التخصيص',en:'Personalization',de:'Personalisierung'},
    {ar:'التطبيق العملي',en:'Practical application',de:'Praktische Anwendung'},
    {ar:'المشروع',en:'The project',de:'Das Projekt'},
    {ar:'الواقع الحيّ والأثر الحضاري',en:'Living reality & civilization',de:'Gelebte Realität & Zivilisation'}
  ];
  const GALLERY=[
    {src:'mark-teal-gold.jpg',cap:{ar:'الشعار الأساسي',en:'Primary mark',de:'Hauptzeichen'}},
    {src:'sirat-dark.jpg',cap:{ar:'الصراط المستقيم',en:'The straight path',de:'Der gerade Weg'}},
    {src:'mark-navy.jpg',cap:{ar:'نسخة كحلية',en:'Navy variant',de:'Marineblau'}},
    {src:'mark-teal.jpg',cap:{ar:'نسخة فيروزية',en:'Teal variant',de:'Türkis'}},
    {src:'isma-mark.jpg',cap:{ar:'علامة ISMA الكوفية',en:'ISMA Kufic mark',de:'ISMA-Kufi-Zeichen'}},
    {src:'isma-arch.jpg',cap:{ar:'محراب ISMA',en:'ISMA mihrab',de:'ISMA-Mihrab'}},
    {src:'sirat-teal.jpg',cap:{ar:'خط الثلث',en:'Thuluth calligraphy',de:'Thuluth-Kalligrafie'}},
    {src:'rahmana.jpg',cap:{ar:'رحمانا',en:'Rahmana',de:'Rahmana'}}
  ];
  function tl(o){ return o[lang]||o.en||o.ar; }

  // ===== اللغة =====
  function applyLang(){
    const m=meta(lang);
    document.documentElement.lang=lang;
    document.documentElement.dir=m.dir;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const t=T(el.dataset.i18n); if(t) el.textContent=t;
    });
    document.title=T('site_title')+' | IHDINA';
    buildLangMenu();
    document.getElementById('donorMail').href=
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(T('email_subject'))}&body=${T('email_body')}`;
    renderFlags(); renderBlocks(); renderLayers(); renderGallery(); renderAxis(); renderShare();
    localStorage.setItem('ihdina_mkt_lang',lang);
  }

  // ===== الكتل المعرفية =====
  function renderBlocks(){
    const host=document.getElementById('blocksFlow'); if(!host) return;
    host.innerHTML=BLOCKS.map((b,i)=>`
      <div class="block">
        <span class="bi">${i+1}</span>
        <span class="bt">${T(b.t)}</span>
        <span class="bc">${T(b.c)}</span>
      </div>`).join('<span class="barrow">→</span>');
  }

  // ===== الطبقات الـ15 =====
  function renderLayers(){
    const host=document.getElementById('layersGrid'); if(!host) return;
    host.innerHTML=LAYERS.map((L,i)=>`
      <div class="layer">
        <span class="lnum">${String(i+1).padStart(2,'0')}</span>
        <span class="ltxt">${tl(L)}</span>
      </div>`).join('');
  }

  // ===== معرض الهوية =====
  function renderGallery(){
    const host=document.getElementById('galleryGrid'); if(!host) return;
    host.innerHTML=GALLERY.map(g=>`
      <figure class="gitem" data-full="assets/gallery/${g.src}">
        <img src="assets/gallery/${g.src}" alt="${tl(g.cap)}" loading="lazy">
        <figcaption>${tl(g.cap)}</figcaption>
      </figure>`).join('');
    host.querySelectorAll('.gitem').forEach(el=>{
      el.addEventListener('click',()=>openLightbox(el.dataset.full));
    });
  }
  function openLightbox(src){
    const lb=document.getElementById('lightbox'), img=document.getElementById('lbImg');
    img.src=src; lb.classList.add('on');
  }

  // ===== حائط الأعلام =====
  function renderFlags(){
    const F=window.IHDINA_FLAGS; if(!F) return;
    const chip=([fl,nm])=>`<div class="flag-chip"><span class="fl">${fl}</span><span class="nm">${nm}</span></div>`;
    const d=document.getElementById('flagsDeep'), w=document.getElementById('flagsWorld');
    if(d) d.innerHTML=F.deep.map(chip).join('')+`<div style="width:100%" class="reach-more">${T('reach_more')}</div>`;
    if(w) w.innerHTML=F.world.map(chip).join('')+`<div style="width:100%" class="reach-more">${T('reach_more')}</div>`;
  }

  // قائمة منسدلة بالـ21 لغة (الجاهزة أولاً، ثم قيد المراجعة)
  function buildLangMenu(){
    const host=document.getElementById('langBtns');
    const codes=Object.keys(LANGS);
    const ready=codes.filter(c=>LANGS[c].ready), draft=codes.filter(c=>!LANGS[c].ready);
    const opt=c=>`<option value="${c}" ${c===lang?'selected':''}>${LANGS[c].native}${LANGS[c].ready?'':' …'}</option>`;
    host.innerHTML=
      `<select id="langSel" aria-label="Language">
         <optgroup label="✓">${ready.map(opt).join('')}</optgroup>
         <optgroup label="soon">${draft.map(opt).join('')}</optgroup>
       </select>`;
    document.getElementById('langSel').addEventListener('change',e=>{ lang=e.target.value; applyLang(); });
  }

  // ===== المشاريع =====
  function renderAxis(){
    const tabs=document.getElementById('axisTabs');
    tabs.innerHTML=P.axes.map(a=>{
      const count=P.projects.filter(p=>p.axis===a.id).length;
      const on=a.id===axis;
      return `<button data-axis="${a.id}" class="${on?'on':''}" style="${on?`background:${a.color};border-color:${a.color}`:''}">${a.icon} ${axName(a)} (${count})</button>`;
    }).join('');
    const a=P.axes.find(x=>x.id===axis);
    document.getElementById('axisHead').innerHTML=`<div class="tg">${axTag(a)}</div>`;
    document.getElementById('projGrid').innerHTML=P.projects
      .map((p,i)=>({p,i})).filter(x=>x.p.axis===axis)
      .map(({p,i})=>`<div class="proj ${p.star?'core-p':''}">
          ${p.star?`<span class="star">${T('core_badge')}</span>`:''}
          <div class="ic">${p.icon}</div>
          <h4>${prName(p,i)}</h4>
          <p>${prPitch(p,i)}</p>
        </div>`).join('');
  }
  document.getElementById('axisTabs').addEventListener('click',e=>{
    const b=e.target.closest('[data-axis]');
    if(b){ axis=b.dataset.axis; renderAxis(); }
  });

  // ===== المشاركة الاجتماعية =====
  function renderShare(){
    const url=location.href.split('#')[0];
    const txt=encodeURIComponent(T('share_text'));
    const u=encodeURIComponent(url);
    const nets=[
      ['WhatsApp',`https://wa.me/?text=${txt}%20${u}`,'💬'],
      ['Telegram',`https://t.me/share/url?url=${u}&text=${txt}`,'✈️'],
      ['X',`https://twitter.com/intent/tweet?text=${txt}&url=${u}`,'𝕏'],
      ['Facebook',`https://www.facebook.com/sharer/sharer.php?u=${u}`,'📘'],
      ['LinkedIn',`https://www.linkedin.com/sharing/share-offsite/?url=${u}`,'💼']
    ];
    document.getElementById('shareRow').innerHTML=
      nets.map(([n,href,ic])=>`<a href="${href}" target="_blank" rel="noopener">${ic} ${n}</a>`).join('')+
      `<button id="copyBtn">🔗 ${T('copy_link')}</button>`;
    document.getElementById('copyBtn').onclick=function(){
      const done=()=>{ this.textContent='✓ '+T('copied'); setTimeout(()=>renderShare(),1600); };
      if(navigator.clipboard&&navigator.clipboard.writeText)
        navigator.clipboard.writeText(url).then(done.bind(this),()=>fallback.call(this));
      else fallback.call(this);
      function fallback(){
        const ta=document.createElement('textarea'); ta.value=url;
        document.body.appendChild(ta); ta.select();
        try{document.execCommand('copy')}catch(e){}
        document.body.removeChild(ta); done.call(this);
      }
    };
  }

  // ===== إغلاق صندوق الإضاءة =====
  (function(){
    const lb=document.getElementById('lightbox'); if(!lb) return;
    const close=()=>lb.classList.remove('on');
    lb.addEventListener('click',e=>{ if(e.target===lb||e.target.classList.contains('lb-close')) close(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  })();

  applyLang();
})();
