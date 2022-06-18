import Image from 'next/image'
import { GetStaticProps } from 'next'
import GalleryCard from '../../components/GalleryCard'
import { GalleryDocType, getGalleryDocs } from '../../firebase/useGallery'
import styles from './gallery.module.css'

const Gallery = ({data}: { data: Array<GalleryDocType>}) => {
  return (
    <main className={styles.main}>
      {data.map((el, index) => {
        return (
          <GalleryCard
            key={index}
            title={el.title}
            date={el.date}
            accentColor={index % 3 === 0 ? 'red' : index % 2 === 0 ? 'cyan' : 'green'} >
            <Image
                width={350}
                height={350}
                objectFit="cover"
                src={el.imgSrc}
                alt="Party" />
          </GalleryCard>
        )
      })}
    </main>
  )
}

export default Gallery

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await getGalleryDocs()

  return {
    props: {
      data: data
    }
  }
}