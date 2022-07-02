import { getDocs, collection } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { db } from '../../firebase/config'
import { BlogDocType, getBlogDoc } from '../../firebase/useBlog'
import styles from './id.module.css'

const Post = ({data}: {data: BlogDocType}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Загружаю данные с сервера, потерпи...</div>
  }
  
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h2>{data.title}</h2>
        <span>{data.date}</span>
      </header>
      <div
        dangerouslySetInnerHTML={{__html: data.htmlData}}
        className={styles.content} />
    </article>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const querySnapshot = await getDocs(collection(db, 'blog'))
  let paths: Array<{params: {id: string}}> = []
  querySnapshot.forEach(doc => {
    paths.push({
      params: {
        id: doc.id
      }
    })
  })

  console.log("PATHS: ", paths)

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  if (params && params.id && !Array.isArray(params.id)) {
    const data: BlogDocType | undefined = await getBlogDoc(params.id)
    console.log("DATA: ", data)

    return {
      props: {
        data
      }
    }
  }
  return {
    props: {
      data: "No data"
    }
  }
}