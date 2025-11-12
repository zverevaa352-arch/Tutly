'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const dictionaries = {
  de: {
    nav:{ findTutor:"Nachhilfe finden", forTutors:"Für Lehrer" },
    home:{ headline:"Finde Nachhilfe in Deutschland – schnell und einfach", sub:"Filter nach Fach, Preis und Sprache. Verifizierte Profile und Bewertungen.", cta:"Nachhilfe finden", ctaTutor:"Lehrer werden" },
    tutors:{ listTitle:"Nachhilfelehrer", city:"Stadt", pricePerHour:"€/Std" },
    footer:{ impressum:"Impressum", privacy:"Datenschutz", copyright:"Hergestellt für Deutschland" }
  },
  en: {
    nav:{ findTutor:"Find a tutor", forTutors:"For tutors" },
    home:{ headline:"Find a tutor in Germany – fast and easy", sub:"Filter by subject, price and language. Verified profiles and reviews.", cta:"Find a tutor", ctaTutor:"Become a tutor" },
    tutors:{ listTitle:"Tutors", city:"City", pricePerHour:"€/h" },
    footer:{ impressum:"Impressum", privacy:"Privacy", copyright:"Made for Germany" }
  },
  ar: {
    nav:{ findTutor:"ابحث عن مدرس", forTutors:"للمدرسين" },
    home:{ headline:"اعثر على مدرس في ألمانيا بسرعة وسهولة", sub:"فلترة حسب المادة والسعر واللغة. ملفات موثّقة وتقييمات.", cta:"ابحث عن مدرس", ctaTutor:"انضم كمدرس" },
    tutors:{ listTitle:"المدرسون", city:"المدينة", pricePerHour:"يورو/ساعة" },
    footer:{ impressum:"Impressum", privacy:"الخصوصية", copyright:"صنع لألمانيا" }
  },
  ru: {
    nav:{ findTutor:"Найти репетитора", forTutors:"Для репетиторов" },
    home:{ headline:"Найдите репетитора в Германии — быстро и просто", sub:"Фильтры по предмету, цене и языку. Подтверждённые анкеты и отзывы.", cta:"Искать репетитора", ctaTutor:"Стать репетитором" },
    tutors:{ listTitle:"Репетиторы", city:"Город", pricePerHour:"€/час" },
    footer:{ impressum:"Impressum", privacy:"Datenschutz", copyright:"Сделано для Германии" }
  },
  fr: {
    nav:{ findTutor:"Trouver un prof", forTutors:"Pour les professeurs" },
    home:{ headline:"Trouvez un professeur en Allemagne – simple et rapide", sub:"Filtrer par matière, prix et langue. Profils vérifiés et avis.", cta:"Trouver un prof", ctaTutor:"Devenir professeur" },
    tutors:{ listTitle:"Professeurs", city:"Ville", pricePerHour:"€/h" },
    footer:{ impressum:"Impressum", privacy:"Confidentialité", copyright:"Conçu pour l'Allemagne" }
  },
  es: {
    nav:{ findTutor:"Buscar profesor", forTutors:"Para profesores" },
    home:{ headline:"Encuentra un profesor en Alemania – rápido y fácil", sub:"Filtra por asignatura, precio e idioma. Perfiles verificados y reseñas.", cta:"Buscar profesor", ctaTutor:"Hazte profesor" },
    tutors:{ listTitle:"Profesores", city:"Ciudad", pricePerHour:"€/h" },
    footer:{ impressum:"Impressum", privacy:"Privacidad", copyright:"Hecho para Alemania" }
  }
};
const rtlLangs = new Set(['ar']);

const I18nCtx = createContext({ t:(k)=>k, lang:'de', setLang:()=>{} });

export function I18nProvider({ children }){
  const [lang, setLangState] = useState('de');

  useEffect(()=>{
    const stored = typeof window !== 'undefined' && window.localStorage.getItem('lang');
    if (stored && dictionaries[stored]) setLangState(stored);
    else {
      const code = typeof navigator !== 'undefined' ? (navigator.language||'de').slice(0,2).toLowerCase() : 'de';
      if (dictionaries[code]) setLangState(code);
    }
  },[]);

  useEffect(()=>{
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', lang);
    if (typeof document !== 'undefined') document.documentElement.setAttribute('dir', rtlLangs.has(lang)?'rtl':'ltr');
  },[lang]);

  const t = useMemo(()=>{
    const dict = dictionaries[lang] || dictionaries.de;
    return (key)=>{
      const parts = key.split('.');
      let cur = dict;
      for (const p of parts){ cur = cur?.[p]; if (cur===undefined) return key; }
      return cur;
    };
  },[lang]);

  const setLang = (l)=>{ if (dictionaries[l]) setLangState(l); };

  return <I18nCtx.Provider value={{ t, lang, setLang }}>{children}</I18nCtx.Provider>;
}

export function useI18n(){ return useContext(I18nCtx); }

export function LangSwitcher(){
  const { lang, setLang } = useI18n();
  const langs = [
    { code:'de', label:'DE' }, { code:'en', label:'EN' },
    { code:'ar', label:'AR' }, { code:'ru', label:'RU' },
    { code:'fr', label:'FR' }, { code:'es', label:'ES' },
  ];
  return (
    <div className="lang">
      <span>🌐</span>
      {langs.map(l => (
        <button key={l.code} onClick={()=>setLang(l.code)}
          style={{border:'none',background:'transparent',padding:'4px 6px',borderRadius:8,
                  fontWeight: lang===l.code ? 800 : 500,
                  color: lang===l.code ? '#0f766e' : '#334155'}}>
          {l.label}
        </button>
      ))}
    </div>
  );
        }
