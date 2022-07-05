import { getDocs, collection } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
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
    <>
      <Head>
        <title>{data.title} | My Site</title>
        <meta
          name="description"
          content={data.description}
          key="desc"
        />
      </Head>
      <article className={styles.container}>
        <header className={styles.header}>
          <button
            style={{
              background: 'url("/arrow_back.svg") no-repeat',
              backgroundSize: 'cover',
              width: 40,
              height: 40,
              cursor: 'pointer'
            }}
            type='button'
            onClick={() => router.back()} />
          <h2>{data.title}</h2>
          <span>{data.date}</span>
        </header>
        <div
          dangerouslySetInnerHTML={{__html: data.htmlData}}
          className={styles.content} />
      </article>
    </>
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