import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products, featuredProductIds } from '@/lib/products'
import HeroAnimations from '@/components/HeroAnimations'
import AnimateIn from '@/components/AnimateIn'
import AnimateStagger from '@/components/AnimateStagger'
import CountUp from '@/components/CountUp'
import styles from './page.module.css'

export const metadata = {
  title: 'Comoara Stupului - Produse Apicole Naturale',
  description: 'Produse apicole naturale de calitate superioară. Miere, fagure, lumânări și polen direct de la producător.',
}

const benefits = [
  {
    icon: '🌿',
    title: '100% Natural',
    text: 'Toate produsele noastre sunt obținute natural, fără aditivi sau conservanți. Puritate garantată.',
  },
  {
    icon: '🐝',
    title: 'Direct de la Stupină',
    text: 'Eliminăm intermediarii. Produsele ajung direct de la stupina noastră la masa dumneavoastră.',
  },
  {
    icon: '🏆',
    title: 'Calitate Certificată',
    text: 'Fiecare lot este testat pentru a garanta calitatea și prospețimea produselor noastre.',
  },
  {
    icon: '🚚',
    title: 'Livrare Rapidă',
    text: 'Livrăm în toată Moldova. Comanda dumneavoastră ajunge proaspătă și în siguranță.',
  },
  {
    icon: '💚',
    title: 'Ecologic',
    text: 'Stupina noastră este situată departe de poluare, în natură curată și virgină.',
  },
  {
    icon: '❤️',
    title: 'Cu Pasiune',
    text: 'Îngrijim albinele cu dragoste și respect față de natură, de peste 20 de ani.',
  },
]

export default function HomePage() {
  const featuredProducts = featuredProductIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)

  return (
    <>
      <HeroAnimations />

      {/* HERO */}
      <section className={styles.hero}>
        <img
          data-hero="bg"
          src="/assets/generalImgs/hero.png"
          alt="Comoara Stupului"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div data-hero="eyebrow" className={styles.heroEyebrow}>
            <span>🍯</span>
            Produse Apicole Naturale
          </div>
          <h1 data-hero="title" className={styles.heroTitle}>
            Savurează <span>Aurul Naturii</span>
          </h1>
          <p data-hero="subtitle" className={styles.heroSubtitle}>
            Livrat din inima stupului în sanctuarul tău. Miere, fagure, lumânări și polen de calitate superioară, direct de la producător.
          </p>
          <div data-hero="btns" className={styles.heroBtns}>
            <Link href="/produse" className={styles.heroBtnPrimary}>
              Descoperă Produsele
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link href="/despre" className={styles.heroBtnGhost}>
              Despre Noi
            </Link>
          </div>
        </div>
        <div data-hero="scroll" className={styles.heroScroll}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className={styles.featured}>
        <AnimateIn as="div" className={styles.sectionHeader} y={24}>
          <span className={styles.sectionEyebrow}>Cele mai apreciate</span>
          <h2 className={styles.sectionTitle}>Produse de Sezon</h2>
          <p className={styles.sectionSubtitle}>
            Selectate cu grijă din cele mai bune loturi ale stupinei noastre, pentru a vă aduce gustul autentic al naturii.
          </p>
        </AnimateIn>
        <AnimateStagger as="div" className={styles.featuredGrid} stagger={0.1}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimateStagger>
        <AnimateIn as="div" className={styles.viewAllWrap} y={20} delay={0.1}>
          <Link href="/produse" className="btn-primary">
            Vezi toate produsele
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </AnimateIn>
      </section>

      {/* ABOUT BANNER */}
      <section className={styles.aboutBanner}>
        <div className={styles.aboutInner}>
          <AnimateIn as="div" className={styles.aboutTextCol} x={-48} y={0} duration={0.8}>
            <p className={styles.aboutEyebrow}>Povestea Noastră</p>
            <h2 className={styles.aboutTitle}>Tradiție Apicultă de Generații</h2>
            <p className={styles.aboutText}>
              Comoara Stupului este o afacere de familie cu rădăcini adânci în tradiția apicultă moldovenească. Stupina noastră este situată în inima naturii, departe de poluare și chimicale.
            </p>
            <p className={styles.aboutText}>
              Fiecare borcan de miere reprezintă munca neobosite a albinelor și îngrijirea cu drag a familiei noastre. Oferim produse pure, naturale, certificate direct de la sursă.
            </p>
            <div className={styles.aboutStats}>
              <div className={styles.statItem}>
                <CountUp end={20} suffix="+" className={styles.statNumber} />
                <span className={styles.statLabel}>Ani Experiență</span>
              </div>
              <div className={styles.statItem}>
                <CountUp end={100} suffix="+" className={styles.statNumber} />
                <span className={styles.statLabel}>Stupi</span>
              </div>
              <div className={styles.statItem}>
                <CountUp end={12} className={styles.statNumber} />
                <span className={styles.statLabel}>Produse</span>
              </div>
            </div>
            <Link href="/despre" className={styles.aboutBtn}>
              Citește Povestea Noastră
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </AnimateIn>
          <AnimateIn x={48} y={0} duration={0.8} delay={0.1}>
            <img
              src="/assets/galeryImgs/albina.jpeg"
              alt="Stupina noastră"
              className={styles.aboutImg}
            />
          </AnimateIn>
        </div>
      </section>

      {/* BENEFITS */}
      <section className={styles.benefits}>
        <AnimateIn as="div" className={styles.sectionHeader} y={24}>
          <span className={styles.sectionEyebrow}>De ce să ne alegeți</span>
          <h2 className={styles.sectionTitle}>Avantajele Produselor Noastre</h2>
          <p className={styles.sectionSubtitle}>
            Ne angajăm să oferim cele mai pure și mai delicioase produse apicole, cu respectul față de natură și sănătatea dumneavoastră.
          </p>
        </AnimateIn>
        <AnimateStagger as="div" className={styles.benefitsGrid} stagger={0.09}>
          {benefits.map((b, i) => (
            <div key={i} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{b.icon}</div>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitText}>{b.text}</p>
            </div>
          ))}
        </AnimateStagger>
      </section>

      {/* CONTACT CTA */}
      <section className={styles.contactCta}>
        <AnimateIn as="div" className={styles.ctaCard} y={32} scale={0.97}>
          <h2>Aveți Întrebări?</h2>
          <p>
            Suntem mereu bucuroși să vă ajutăm. Contactați-ne pentru orice informație despre produsele noastre sau pentru a plasa o comandă specială.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className="btn-primary">
              Contactați-ne
            </Link>
            <Link href="/produse" className="btn-ghost">
              Vezi Produsele
            </Link>
          </div>
        </AnimateIn>
      </section>
    </>
  )
}
