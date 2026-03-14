'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import styles from './page.module.css'

const galleryImages = [
  { src: '/assets/galeryImgs/galery1.jpeg', alt: 'Stupina noastră' },
  { src: '/assets/galeryImgs/galery2.jpeg', alt: 'Albine la lucru' },
  { src: '/assets/galeryImgs/galery3.jpeg', alt: 'Recoltarea mierii' },
  { src: '/assets/galeryImgs/galeri4.jpeg', alt: 'Faguri naturali' },
  { src: '/assets/galeryImgs/galery5.jpeg', alt: 'Produse naturale' },
  { src: '/assets/galeryImgs/galery6.jpeg', alt: 'Natura' },
  { src: '/assets/galeryImgs/galery7.jpeg', alt: 'Stupina' },
  { src: '/assets/galeryImgs/galery8.jpeg', alt: 'Stupi' },
  { src: '/assets/galeryImgs/galery10.jpeg', alt: 'Natură curată' },
  { src: '/assets/galeryImgs/galery13.jpeg', alt: 'Produse apicole' },
  { src: '/assets/galeryImgs/oragnic_farm.jpeg', alt: 'Ferma organică' },
  { src: '/assets/galeryImgs/remorca.jpeg', alt: 'Transportul stupilor' },
]

const tr = {
  RO: {
    heroTitle: 'Povestea Noastră',
    heroSubtitle: 'O familie, o pasiune, un angajament față de calitate și natură.',
    storyEyebrow: 'Cine Suntem',
    storyTitle: 'O Afacere de Familie cu Rădăcini Adânci',
    storyP1: 'Comoara Stupului a luat naștere dintr-o pasiune moștenită: dragostea pentru albine și pentru produsele lor minunate. Timp de peste două decenii, familia noastră a cultivat cu grijă stupina, punând pe primul loc calitatea și naturalitatea.',
    storyP2: 'Stupina noastră este situată în inima naturii moldovenești, departe de poluare și chimicale. Albinele noastre culeg nectarul din flori sălbatice și cultivate ecologic, aducând în fiecare borcan esența pură a naturii.',
    storyP3: 'Credem cu tărie că mierea adevărată nu are nevoie de aditivi sau prelucrări industriale. De aceea, procesăm produsele cu minimă intervenție, păstrând toate proprietățile lor benefice intacte.',
    storyBtn: 'Descoperă Produsele Noastre',
    valuesTitle: 'Valorile Noastre',
    valuesSubtitle: 'Principiile care ne ghidează în fiecare zi și care se reflectă în calitatea produselor noastre.',
    galleryTitle: 'Galeria Noastră',
    gallerySubtitle: 'Momente din viața stupinei și producția noastră naturală.',
    ctaTitle: 'Veniți să Ne Cunoașteți',
    ctaText: 'Suntem mereu bucuroși să primim vizitatori la stupina noastră. Contactați-ne pentru a planifica o vizită sau pentru orice întrebare.',
    ctaBtn: 'Contactați-ne',
    values: [
      { icon: '🌿', title: 'Naturalitate', text: 'Toate produsele noastre sunt 100% naturale, fără aditivi sau conservanți de niciun fel.' },
      { icon: '🤝', title: 'Transparență', text: 'Suntem deschiși în privința metodelor noastre de producție și a calității produselor.' },
      { icon: '🌍', title: 'Sustenabilitate', text: 'Practicăm apicultura responsabilă, cu respect față de natură și ecosistem.' },
      { icon: '🏡', title: 'Tradiție', text: 'Păstrăm metodele tradiționale de apicultură transmise de la o generație la alta.' },
      { icon: '🏆', title: 'Calitate', text: 'Nu facem compromisuri când vine vorba de calitate. Fiecare produs este testat.' },
      { icon: '❤️', title: 'Pasiune', text: 'Dragostea pentru albine și pentru natură se simte în fiecare picătură de miere.' },
    ],
  },
  RU: {
    heroTitle: 'Наша История',
    heroSubtitle: 'Одна семья, одна страсть, одна приверженность качеству и природе.',
    storyEyebrow: 'Кто мы',
    storyTitle: 'Семейный Бизнес с Глубокими Корнями',
    storyP1: 'Comoara Stupului родилась из унаследованной страсти: любви к пчёлам и их замечательным продуктам. На протяжении более двух десятилетий наша семья бережно развивала пасеку, ставя во главу угла качество и натуральность.',
    storyP2: 'Наша пасека расположена в сердце молдавской природы, вдали от загрязнений и химикатов. Наши пчёлы собирают нектар с диких и экологически чистых цветов, принося в каждую банку чистую эссенцию природы.',
    storyP3: 'Мы твёрдо убеждены, что настоящий мёд не нуждается в добавках или промышленной обработке. Поэтому мы обрабатываем продукты с минимальным вмешательством, сохраняя все их полезные свойства.',
    storyBtn: 'Открыть Наши Продукты',
    valuesTitle: 'Наши Ценности',
    valuesSubtitle: 'Принципы, которыми мы руководствуемся каждый день и которые отражаются в качестве наших продуктов.',
    galleryTitle: 'Наша Галерея',
    gallerySubtitle: 'Моменты из жизни пасеки и нашего натурального производства.',
    ctaTitle: 'Приходите Познакомиться с Нами',
    ctaText: 'Мы всегда рады принять гостей на нашей пасеке. Свяжитесь с нами, чтобы спланировать визит или задать любой вопрос.',
    ctaBtn: 'Связаться с нами',
    values: [
      { icon: '🌿', title: 'Натуральность', text: 'Все наши продукты на 100% натуральные, без каких-либо добавок или консервантов.' },
      { icon: '🤝', title: 'Прозрачность', text: 'Мы открыты в отношении наших методов производства и качества продуктов.' },
      { icon: '🌍', title: 'Устойчивость', text: 'Мы практикуем ответственное пчеловодство с уважением к природе и экосистеме.' },
      { icon: '🏡', title: 'Традиция', text: 'Мы сохраняем традиционные методы пчеловодства, передаваемые из поколения в поколение.' },
      { icon: '🏆', title: 'Качество', text: 'Мы не идём на компромисс в вопросах качества. Каждый продукт проходит проверку.' },
      { icon: '❤️', title: 'Страсть', text: 'Любовь к пчёлам и природе ощущается в каждой капле мёда.' },
    ],
  },
}

export default function DesprePage() {
  const { lang } = useLanguage()
  const t = tr[lang]

  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={styles.heroSection}>
        <img
          src="/assets/galeryImgs/remorca.jpeg"
          alt="Stupina Comoara Stupului"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
        </div>
      </div>

      {/* STORY */}
      <div className={styles.storySection}>
        <img
          src="/assets/galeryImgs/albina.jpeg"
          alt="Albine la lucru"
          className={styles.storyImg}
        />
        <div className={styles.storyText}>
          <span className={styles.eyebrow}>{t.storyEyebrow}</span>
          <h2>{t.storyTitle}</h2>
          <p>{t.storyP1}</p>
          <p>{t.storyP2}</p>
          <p>{t.storyP3}</p>
          <Link href="/produse" className="btn-primary" style={{ marginTop: '8px' }}>
            {t.storyBtn}
          </Link>
        </div>
      </div>

      {/* VALUES */}
      <div className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <h2>{t.valuesTitle}</h2>
          <p>{t.valuesSubtitle}</p>
        </div>
        <div className={styles.valuesGrid}>
          {t.values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueIcon}>{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY */}
      <div className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>{t.galleryTitle}</h2>
        <p className={styles.sectionSubtitle}>{t.gallerySubtitle}</p>
        <div className={styles.galleryGrid}>
          {galleryImages.map((img, i) => (
            <div key={i} className={styles.galleryItem}>
              <img src={img.src} alt={img.alt} className={styles.galleryImg} />
            </div>
          ))}
          <div className={styles.galleryItem}>
            <video
              src="/assets/videos/videogalery.mp4"
              className={styles.galleryImg}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>

      {/* TEAM/CTA */}
      <div className={styles.teamSection}>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <Link href="/contact" className="btn-primary">
          {t.ctaBtn}
        </Link>
      </div>
    </div>
  )
}
