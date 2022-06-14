import Image from 'next/image'
import Card from '../../components/Card'
import GalleryCard from '../../components/GalleryCard'
import styles from './gallery.module.css'

const Gallery = () => {
  return (
    <main className={styles.main}>
      <GalleryCard title='Футбол' date='14.06.2022' accentColor='red' >
        <Image
            width={400}
            height={400}
            objectFit="cover"
            src={'/party.png'}
            alt="Party" />
      </GalleryCard>
      <GalleryCard title='Вечеринка' date='12.05.2022' accentColor='cyan' >
        <Image
            width={400}
            height={400}
            objectFit="cover"
            src={'/party.png'}
            alt="Party" />
      </GalleryCard>
    </main>
  )
}

export default Gallery