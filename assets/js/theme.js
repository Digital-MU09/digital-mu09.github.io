export function initTheme(){
  const root=document.documentElement,btn=document.getElementById('theme-toggle');
  btn?.addEventListener('click',()=>{
    const next=root.dataset.theme==='dark'?'light':'dark';
    root.dataset.theme=next;
    try{localStorage.setItem('theme',next)}catch(e){}
  });
}
