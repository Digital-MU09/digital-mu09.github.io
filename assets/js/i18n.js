const cache={};
async function load(lang,base){
  if(cache[lang])return cache[lang];
  const r=await fetch(`${base}data/i18n/${lang}.json`);
  return cache[lang]=await r.json();
}
export async function applyLang(lang,base){
  const root=document.documentElement;
  root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
  try{
    const d=await load(lang,base);
    document.querySelectorAll('[data-i18n]').forEach(el=>{const v=d[el.dataset.i18n];if(v)el.textContent=v});
    document.querySelectorAll('[data-i18n-aria]').forEach(el=>{const v=d[el.dataset.i18nAria];if(v)el.setAttribute('aria-label',v)});
  }catch(e){console.error('i18n load failed',e)}
  const b=document.getElementById('lang-toggle');
  if(b){b.textContent=lang==='ar'?'EN':'ع';b.setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية')}
}
export function initLang(base){
  let lang=document.documentElement.lang==='en'?'en':'ar';
  applyLang(lang,base);
  document.getElementById('lang-toggle')?.addEventListener('click',()=>{
    lang=lang==='ar'?'en':'ar';
    try{localStorage.setItem('lang',lang)}catch(e){}
    applyLang(lang,base);
  });
}
