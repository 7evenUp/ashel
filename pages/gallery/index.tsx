import Image from 'next/image'
import GalleryCard from '../../components/GalleryCard'
import { collection, getDocs } from "firebase/firestore"
import styles from './gallery.module.css'

const Gallery = ({data}: { data: any[]}) => {
  return (
    <main className={styles.main}>
      {data.map(dataElement => {
        return (
          <div key={dataElement.title}>{dataElement.title}</div>
        )
      })}
      <GalleryCard title='Футбол' date='14.06.2022' accentColor='red' >
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

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from 'next'
import { db } from '../../firebase/config'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const querySnapshot = await getDocs(collection(db, 'gallery'))
  let data: any[] = []
  querySnapshot.forEach(doc => {
    const docData = doc.data()
    console.log(docData)
    data.push({
      title: docData.title,
      imgSrc: docData.imgSrc,
      date: new Date(docData.date.seconds * 1000).toLocaleDateString()
    })
  })

  console.log(data)

  return {
    props: {
      data: data
    }
  }
}