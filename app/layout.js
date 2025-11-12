import './globals.css';
import Link from 'next/link';
import { I18nProvider, useI18n, LangSwitcher } from '../components/I18nContext';

function Header(){
  const { t } = useI18n();
  return (
    <header className="header">
      <Link href="/" style={{fontWeight:800,color:'#0f766e'}}>Tutly</Link>
      <nav style={{display:'flex',gap:16,fontSize:14,alignItems:'center'}}>
        <Link href="/tutors">{t('nav.findTutor')}</Link>
        <Link href="/for-tutors">{t('nav.forTutors')}</Link>
        <LangSwitcher/>
      </nav>
    </header>
  );
}

function Footer(){
  const { t } = useI18n();
  return (
    <footer className="footer container">
      © {new Date().getFullYear()} Tutly.de · {t('footer.copyright')}
      {' · '}<a href="/impressum">{t('footer.impressum')}</a>
      {' · '}<a href="/datenschutz">{t('footer.privacy')}</a>
    </footer>
  );
}

export const metadata = {
  title: 'Tutly — репетиторы в Германии',
  description: 'Найдите репетитора рядом с вами — карта, фильтры, анкеты.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <I18nProvider>
          <Header/>
          <main className="container">{children}</main>
          <Footer/>
        </I18nProvider>
      </body>
    </html>
  );
}
