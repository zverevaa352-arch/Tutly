import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useI18n } from '../../components/I18nContext';

const Map = dynamic(()=>import('../../components/Map'), { ssr:false });

const tutors = [
  { id:'1', name:'Anna Müller', headline:'Mathe & Physik (Klassen 7–13)', subjects:['Mathematik','Physik'], city:'Berlin', rate:32, lat:52.52, lng:13.405, rating:4.9 },
  { id:'2', name:'Jonas Weber', headline:'Englisch & IELTS', subjects:['Englisch'], city:'Berlin', rate:28, lat:52.50, lng:13.39, rating:4.8 },
  { id:'3', name:'Elena Rossi', headline:'Deutsch als Fremdsprache (A1–B2)', subjects:['Deutsch'], city:'Potsdam', rate:30, lat:52.40, lng:13.06, rating:4.7 },
];

export default function Tutors() {
  const { t } = useI18n();
  return (
    <div className="grid">
      <div className="card">
        <Suspense fallback={<div>...</div>}>
          <Map points={tutors} />
        </Suspense>
      </div>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))'}}>
        {tutors.map(tu => (
          <div key={tu.id} className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontWeight:700}}>{tu.name}</div>
              <div style={{color:'#0f766e',fontWeight:700}}>€{tu.rate}/{t('tutors.pricePerHour')}</div>
            </div>
            <div style={{color:'#475569',fontSize:14,marginTop:6}}>{tu.headline}</div>
            <div style={{marginTop:8}}>
              {tu.subjects.map(s=>(<span key={s} className="badge">{s}</span>))}
            </div>
            <div style={{marginTop:8,fontSize:13,color:'#64748b'}}>{tu.city} · ⭐ {tu.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
          }
