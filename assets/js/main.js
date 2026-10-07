import {initTheme} from './theme.js';
import {initLang} from './i18n.js';
const base=document.querySelector('script[data-root]')?.dataset.root||'./';
initTheme();
initLang(base);
