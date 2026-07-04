// إهدنا — النواة المشتركة: الحالة، التنقل، الأدوات
// الخصوصية بالتصميم: كل البيانات محلية على جهاز المستخدم فقط (localStorage) — لا خادم، لا تتبع.
(function(){
  const KEY = 'ihdina_state_v1';

  window.IHDINA = {
    load(){
      try{ return JSON.parse(localStorage.getItem(KEY)) || {} }catch(e){ return {} }
    },
    save(st){ localStorage.setItem(KEY, JSON.stringify(st)); },
    get(k, def){ const st=this.load(); return (k in st)? st[k] : def; },
    set(k, v){ const st=this.load(); st[k]=v; this.save(st); },

    // تقدّم الكتل
    doneBlocks(){ return new Set(this.get('doneBlocks', [])); },
    toggleBlock(id){
      const s=this.doneBlocks();
      s.has(id) ? s.delete(id) : s.add(id);
      this.set('doneBlocks', [...s]);
      return s.has(id);
    },

    // أسماء الفئات الثمانية (من الإطار النظري v2.0)
    CATS: {
      B:{name:'البناء', en:'Building'}, T:{name:'التكليف', en:'Assignment'},
      W:{name:'الوعيد', en:'Warning'}, H:{name:'الحكاية', en:'Narrative'},
      D:{name:'الحسم', en:'Resolution'}, R:{name:'الرغبة', en:'Desire'},
      S:{name:'التشريع', en:'Legislation'}, E:{name:'العبادة', en:'Worship'},
      B1:{name:'البناء — نزول الكتاب'}, B2:{name:'البناء — خلق الكون'},
      B3:{name:'البناء — خلق الإنسان'}, B4:{name:'البناء — الحمد وأسماء الله'},
      B5:{name:'البناء — صفات الله والمثل'}, B6:{name:'البناء — البركة'}
    },
    catName(code){ return (this.CATS[code]||{}).name || code; },
    catBase(code){ return code[0]==='B' ? 'B' : code; },

    // أنماط الشخصية (القوي الأمين — القصص 26 + مراتب النفس)
    PERSONALITIES: {
      A:{key:'A', name:'القوي المبادر', desc:'يتحرك بالفعل قبل الكلام — يناسبه التكليف والتطبيق العملي المبكر', boost:{T:1.3,S:1.2,D:1.1}},
      B:{key:'B', name:'الأمين الثابت', desc:'يبني ببطء ويثبت طويلاً — يناسبه البناء المتدرج والعبادة المنتظمة', boost:{B:1.3,E:1.2,R:1.1}},
      C:{key:'C', name:'المتدبّر الباحث', desc:'يسأل ويتأمل قبل أن يقتنع — تناسبه الحكاية والبرهان والقصص', boost:{H:1.3,B:1.2,W:1.1}}
    },
    ENVIRONMENTS: {
      supportive:{name:'بيئة داعمة', desc:'أسرة أو مجتمع يعين على الالتزام — يمكن رفع الجرعة اليومية', dose:3},
      neutral:{name:'بيئة محايدة', desc:'لا معين ولا معيق — جرعة متوسطة مع مجتمع رقمي بديل', dose:2},
      hard:{name:'بيئة صعبة', desc:'ضغط أو معارضة — جرعة خفيفة وكتل الثبات أولاً (منهج أصحاب الأخدود)', dose:1}
    }
  };

  // بناء شريط التنقل الموحد
  window.buildNav = function(active){
    const pages = [
      ['index.html','الرئيسية'],
      ['tafsir.html','التفسير التفاعلي'],
      ['reactor.html','مفاعل الهداية'],
      ['sira.html','مزامنة السيرة'],
      ['laws.html','القوانين والمسارات'],
      ['projects.html','دليل المشاريع'],
      ['languages.html','خريطة اللغات']
    ];
    const nav = pages.map(([href,label]) =>
      `<a href="${href}" class="${active===href?'on':''}">${label}</a>`).join('');
    document.write(`
      <header class="site">
        <img src="assets/logo-mark.png" alt="إهدنا" style="height:92px;display:block;margin:0 auto 4px;filter:drop-shadow(0 4px 10px rgba(20,104,90,.2))">
        <div class="tag">إهدنا · IHDINA</div>
        <div class="sub">New Muslim &amp; Muslimah Center · مركز المسلم الجديد والمسلمة الجديدة</div>
        <div class="sub" style="font-size:13px;color:var(--muted)">التفسير التفاعلي الذكي · محاكاة النزول الأول</div>
        <nav class="main">${nav}</nav>
      </header>`);
  };

  window.buildFooter = function(){
    document.write(`
      <footer class="site">
        ISMA — د. أبوسلمان الحسني · <span class="g">إهدنا الصراط المستقيم</span><br>
        بياناتك محفوظة على جهازك فقط — خصوصية بالتصميم
      </footer>`);
  };

  // PWA: تسجيل مانيفست الجذر وعامل الخدمة عند الاستضافة (يُتجاهل محلياً)
  if (location.protocol.startsWith('http')) {
    const l = document.createElement('link');
    l.rel = 'manifest'; l.href = '../manifest.json';
    document.head.appendChild(l);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('../sw.js');
  }
})();
