// إهدنا — الموقع التسويقي: التبديل اللغوي، المشاريع، المشاركة
(function(){
  const I=window.IHDINA_I18N, P=window.IHDINA_PROJECTS;
  const CONTACT_EMAIL='useronline.235@gmail.com';
  let lang=localStorage.getItem('ihdina_mkt_lang')||'ar';
  let axis='core';

  // ===== اللغة =====
  function applyLang(){
    const meta=I.langs[lang];
    document.documentElement.lang=lang;
    document.documentElement.dir=meta.dir;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.dataset.i18n, v=I.t[k];
      if(v && v[lang]!=null) el.textContent=v[lang];
    });
    document.title=I.t.site_title[lang]+' | IHDINA';
    // أزرار اللغات
    document.getElementById('langBtns').innerHTML=Object.entries(I.langs).map(([code,m])=>
      `<button class="${code===lang?'on':''}" data-lang="${code}">${m.name}</button>`).join('');
    // بريد الداعمين
    document.getElementById('donorMail').href=
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(I.t.email_subject[lang])}&body=${I.t.email_body[lang]}`;
    renderAxis(); renderShare();
    localStorage.setItem('ihdina_mkt_lang',lang);
  }

  document.getElementById('langBtns').addEventListener('click',e=>{
    const b=e.target.closest('[data-lang]');
    if(b){ lang=b.dataset.lang; applyLang(); }
  });

  // ===== المشاريع =====
  function renderAxis(){
    const tabs=document.getElementById('axisTabs');
    tabs.innerHTML=P.axes.map(a=>{
      const count=P.projects.filter(p=>p.axis===a.id).length;
      const on=a.id===axis;
      return `<button data-axis="${a.id}" class="${on?'on':''}" style="${on?`background:${a.color};border-color:${a.color}`:''}">${a.icon} ${a.name[lang]} (${count})</button>`;
    }).join('');

    const a=P.axes.find(x=>x.id===axis);
    document.getElementById('axisHead').innerHTML=`<div class="tg">${a.tag[lang]}</div>`;

    document.getElementById('projGrid').innerHTML=P.projects
      .filter(p=>p.axis===axis)
      .map(p=>`<div class="proj ${p.star?'core-p':''}">
          ${p.star?`<span class="star">${I.t.core_badge[lang]}</span>`:''}
          <div class="ic">${p.icon}</div>
          <h4>${p.name[lang]}</h4>
          <p>${p.pitch[lang]}</p>
        </div>`).join('');
  }
  document.getElementById('axisTabs').addEventListener('click',e=>{
    const b=e.target.closest('[data-axis]');
    if(b){ axis=b.dataset.axis; renderAxis(); }
  });

  // ===== المشاركة الاجتماعية =====
  function renderShare(){
    const url=location.href.split('#')[0];
    const txt=encodeURIComponent(I.t.share_text[lang]);
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
      `<button id="copyBtn">🔗 ${I.t.copy_link[lang]}</button>`;
    document.getElementById('copyBtn').onclick=function(){
      const done=()=>{ this.textContent='✓ '+I.t.copied[lang]; setTimeout(()=>renderShare(),1600); };
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

  applyLang();
})();
