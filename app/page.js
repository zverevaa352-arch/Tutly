import Link from 'next/link';
import { useI18n } from '../components/I18nContext';

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="hero">
      <div>
        <h1 style={{fontSize:34,margin:'12px 0'}}>{t('home.headline')}</h1>
        <p style={{color:'#475569',lineHeight:1.6}}>{t('home.sub')}</p>
        <div style={{marginTop:18,display:'flex',gap:10}}>
          <Link className="btn" href="/tutors">{t('home.cta')}</Link>
          <Link className="card" href="/for-tutors">{t('home.ctaTutor')}</Link>
        </div>
      </div>
      <div className="card">
        <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop" alt="study" style={{width:'100%',borderRadius:12}}/>
      </div>
    </div>
  );
}
