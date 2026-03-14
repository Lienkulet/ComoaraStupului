'use client'

import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products, featuredProductIds } from '@/lib/products'
import { useLanguage } from '@/context/LanguageContext'
import HeroAnimations from '@/components/HeroAnimations'
import AnimateIn from '@/components/AnimateIn'
import AnimateStagger from '@/components/AnimateStagger'
import CountUp from '@/components/CountUp'
import styles from './page.module.css'

const tr = {
  RO: {
    heroEyebrow: 'Produse Apicole Naturale',
    heroTitle: 'Savurează',
    heroTitleSpan: 'Aurul Naturii',
    heroSubtitle: 'Livrat din inima stupului în sanctuarul tău. Miere, fagure, lumânări și polen de calitate superioară, direct de la producător.',
    heroBtnPrimary: 'Descoperă Produsele',
    heroBtnGhost: 'Despre Noi',
    featuredEyebrow: 'Cele mai apreciate',
    featuredTitle: 'Produse de Sezon',
    featuredSubtitle: 'Selectate cu grijă din cele mai bune loturi ale stupinei noastre, pentru a vă aduce gustul autentic al naturii.',
    viewAll: 'Vezi toate produsele',
    aboutEyebrow: 'Povestea Noastră',
    aboutTitle: 'Tradiție Apicultă de Generații',
    aboutP1: 'Comoara Stupului este o afacere de familie cu rădăcini adânci în tradiția apicultă moldovenească. Stupina noastră este situată în inima naturii, departe de poluare și chimicale.',
    aboutP2: 'Fiecare borcan de miere reprezintă munca neobosite a albinelor și îngrijirea cu drag a familiei noastre. Oferim produse pure, naturale, certificate direct de la sursă.',
    statYears: 'Ani Experiență',
    statHives: 'Stupi',
    statProducts: 'Produse',
    aboutBtn: 'Citește Povestea Noastră',
    benefitsEyebrow: 'De ce să ne alegeți',
    benefitsTitle: 'Avantajele Produselor Noastre',
    benefitsSubtitle: 'Ne angajăm să oferim cele mai pure și mai delicioase produse apicole, cu respectul față de natură și sănătatea dumneavoastră.',
    ctaTitle: 'Aveți Întrebări?',
    ctaText: 'Suntem mereu bucuroși să vă ajutăm. Contactați-ne pentru orice informație despre produsele noastre sau pentru a plasa o comandă specială.',
    ctaContact: 'Contactați-ne',
    ctaProducts: 'Vezi Produsele',
    benefits: [
      { icon: '🌿', title: '100% Natural', text: 'Toate produsele noastre sunt obținute natural, fără aditivi sau conservanți. Puritate garantată.' },
      { icon: '🐝', title: 'Direct de la Stupină', text: 'Eliminăm intermediarii. Produsele ajung direct de la stupina noastră la masa dumneavoastră.' },
      { icon: '🏆', title: 'Calitate Certificată', text: 'Fiecare lot este testat pentru a garanta calitatea și prospețimea produselor noastre.' },
      { icon: '🚚', title: 'Livrare Rapidă', text: 'Livrăm în toată Moldova. Comanda dumneavoastră ajunge proaspătă și în siguranță.' },
      { icon: '💚', title: 'Ecologic', text: 'Stupina noastră este situată departe de poluare, în natură curată și virgină.' },
      { icon: '❤️', title: 'Cu Pasiune', text: 'Îngrijim albinele cu dragoste și respect față de natură, de peste 20 de ani.' },
    ],
  },
  RU: {
    heroEyebrow: 'Натуральные Продукты Пчеловодства',
    heroTitle: 'Вкус',
    heroTitleSpan: 'Золота Природы',
    heroSubtitle: 'Доставлено прямо из улья к вашему столу. Мёд, соты, свечи и пыльца высшего качества, напрямую от производителя.',
    heroBtnPrimary: 'Открыть Продукты',
    heroBtnGhost: 'О нас',
    featuredEyebrow: 'Самые популярные',
    featuredTitle: 'Сезонные Продукты',
    featuredSubtitle: 'Тщательно отобранные из лучших партий нашей пасеки, чтобы донести до вас подлинный вкус природы.',
    viewAll: 'Смотреть все продукты',
    aboutEyebrow: 'Наша История',
    aboutTitle: 'Традиции Пчеловодства из Поколения в Поколение',
    aboutP1: 'Comoara Stupului — это семейный бизнес с глубокими корнями в молдавских традициях пчеловодства. Наша пасека расположена в сердце природы, вдали от загрязнений и химикатов.',
    aboutP2: 'Каждая банка мёда представляет собой неустанный труд пчёл и заботливый уход нашей семьи. Мы предлагаем чистые, натуральные, сертифицированные продукты напрямую от источника.',
    statYears: 'Лет Опыта',
    statHives: 'Ульев',
    statProducts: 'Продуктов',
    aboutBtn: 'Читать Нашу Историю',
    benefitsEyebrow: 'Почему выбирают нас',
    benefitsTitle: 'Преимущества Наших Продуктов',
    benefitsSubtitle: 'Мы стремимся предлагать самые чистые и вкусные продукты пчеловодства с уважением к природе и вашему здоровью.',
    ctaTitle: 'Есть Вопросы?',
    ctaText: 'Мы всегда рады помочь. Свяжитесь с нами для получения любой информации о наших продуктах или для размещения специального заказа.',
    ctaContact: 'Связаться с нами',
    ctaProducts: 'Смотреть Продукты',
    benefits: [
      { icon: '🌿', title: '100% Натуральный', text: 'Все наши продукты получены естественным путём, без добавок и консервантов. Гарантированная чистота.' },
      { icon: '🐝', title: 'Прямо с Пасеки', text: 'Мы устраняем посредников. Продукты поступают прямо с нашей пасеки на ваш стол.' },
      { icon: '🏆', title: 'Сертифицированное Качество', text: 'Каждая партия тестируется для гарантии качества и свежести наших продуктов.' },
      { icon: '🚚', title: 'Быстрая Доставка', text: 'Доставляем по всей Молдове. Ваш заказ прибывает свежим и в целости.' },
      { icon: '💚', title: 'Экологично', text: 'Наша пасека расположена вдали от загрязнений, в чистой и нетронутой природе.' },
      { icon: '❤️', title: 'С Душой', text: 'Мы ухаживаем за пчёлами с любовью и уважением к природе уже более 20 лет.' },
    ],
  },
}

export default function HomePage() {
  const { lang } = useLanguage()
  const t = tr[lang]

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
            {t.heroEyebrow}
          </div>
          <h1 data-hero="title" className={styles.heroTitle}>
            {t.heroTitle} <span>{t.heroTitleSpan}</span>
          </h1>
          <p data-hero="subtitle" className={styles.heroSubtitle}>
            {t.heroSubtitle}
          </p>
          <div data-hero="btns" className={styles.heroBtns}>
            <Link href="/produse" className={styles.heroBtnPrimary}>
              {t.heroBtnPrimary}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link href="/despre" className={styles.heroBtnGhost}>
              {t.heroBtnGhost}
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
          <span className={styles.sectionEyebrow}>{t.featuredEyebrow}</span>
          <h2 className={styles.sectionTitle}>{t.featuredTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.featuredSubtitle}</p>
        </AnimateIn>
        <AnimateStagger as="div" className={styles.featuredGrid} stagger={0.1}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimateStagger>
        <AnimateIn as="div" className={styles.viewAllWrap} y={20} delay={0.1}>
          <Link href="/produse" className="btn-primary">
            {t.viewAll}
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
            <p className={styles.aboutEyebrow}>{t.aboutEyebrow}</p>
            <h2 className={styles.aboutTitle}>{t.aboutTitle}</h2>
            <p className={styles.aboutText}>{t.aboutP1}</p>
            <p className={styles.aboutText}>{t.aboutP2}</p>
            <div className={styles.aboutStats}>
              <div className={styles.statItem}>
                <CountUp end={20} suffix="+" className={styles.statNumber} />
                <span className={styles.statLabel}>{t.statYears}</span>
              </div>
              <div className={styles.statItem}>
                <CountUp end={100} suffix="+" className={styles.statNumber} />
                <span className={styles.statLabel}>{t.statHives}</span>
              </div>
              <div className={styles.statItem}>
                <CountUp end={12} className={styles.statNumber} />
                <span className={styles.statLabel}>{t.statProducts}</span>
              </div>
            </div>
            <Link href="/despre" className={styles.aboutBtn}>
              {t.aboutBtn}
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
          <span className={styles.sectionEyebrow}>{t.benefitsEyebrow}</span>
          <h2 className={styles.sectionTitle}>{t.benefitsTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.benefitsSubtitle}</p>
        </AnimateIn>
        <AnimateStagger as="div" className={styles.benefitsGrid} stagger={0.09}>
          {t.benefits.map((b, i) => (
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
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className="btn-primary">
              {t.ctaContact}
            </Link>
            <Link href="/produse" className="btn-ghost">
              {t.ctaProducts}
            </Link>
          </div>
        </AnimateIn>
      </section>
    </>
  )
}
