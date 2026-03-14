import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'Despre Noi',
  description: 'Aflați povestea familiei Comoara Stupului și pasiunea noastră pentru apicultură tradițională.',
}

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

const values = [
  {
    icon: '🌿',
    title: 'Naturalitate',
    text: 'Toate produsele noastre sunt 100% naturale, fără aditivi sau conservanți de niciun fel.',
  },
  {
    icon: '🤝',
    title: 'Transparență',
    text: 'Suntem deschiși în privința metodelor noastre de producție și a calității produselor.',
  },
  {
    icon: '🌍',
    title: 'Sustenabilitate',
    text: 'Practicăm apicultura responsabilă, cu respect față de natură și ecosistem.',
  },
  {
    icon: '🏡',
    title: 'Tradiție',
    text: 'Păstrăm metodele tradiționale de apicultură transmise de la o generație la alta.',
  },
  {
    icon: '🏆',
    title: 'Calitate',
    text: 'Nu facem compromisuri când vine vorba de calitate. Fiecare produs este testat.',
  },
  {
    icon: '❤️',
    title: 'Pasiune',
    text: 'Dragostea pentru albine și pentru natură se simte în fiecare picătură de miere.',
  },
]

export default function DesprePage() {
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
          <h1>Povestea Noastră</h1>
          <p>O familie, o pasiune, un angajament față de calitate și natură.</p>
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
          <span className={styles.eyebrow}>Cine Suntem</span>
          <h2>O Afacere de Familie cu Rădăcini Adânci</h2>
          <p>
            Comoara Stupului a luat naștere dintr-o pasiune moștenită: dragostea pentru albine și pentru produsele lor minunate. Timp de peste două decenii, familia noastră a cultivat cu grijă stupina, punând pe primul loc calitatea și naturalitatea.
          </p>
          <p>
            Stupina noastră este situată în inima naturii moldovenești, departe de poluare și chimicale. Albinele noastre culeg nectarul din flori sălbatice și cultivate ecologic, aducând în fiecare borcan esența pură a naturii.
          </p>
          <p>
            Credem cu tărie că mierea adevărată nu are nevoie de aditivi sau prelucrări industriale. De aceea, procesăm produsele cu minimă intervenție, păstrând toate proprietățile lor benefice intacte.
          </p>
          <Link href="/produse" className="btn-primary" style={{ marginTop: '8px' }}>
            Descoperă Produsele Noastre
          </Link>
        </div>
      </div>

      {/* VALUES */}
      <div className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <h2>Valorile Noastre</h2>
          <p>Principiile care ne ghidează în fiecare zi și care se reflectă în calitatea produselor noastre.</p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
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
        <h2 className={styles.sectionTitle}>Galeria Noastră</h2>
        <p className={styles.sectionSubtitle}>Momente din viața stupinei și producția noastră naturală.</p>
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
        <h2>Veniți să Ne Cunoașteți</h2>
        <p>
          Suntem mereu bucuroși să primim vizitatori la stupina noastră. Contactați-ne pentru a planifica o vizită sau pentru orice întrebare.
        </p>
        <Link href="/contact" className="btn-primary">
          Contactați-ne
        </Link>
      </div>
    </div>
  )
}
