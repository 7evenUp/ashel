import { getDocs, collection } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { db } from '../../firebase/config'
import { BlogDocType, getBlogDoc } from '../../firebase/useBlog'

const Post = ({data}: {data: BlogDocType}) => {
  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <span>{data.date}</span>
      <br/>
      <span>Content:</span>
      <div dangerouslySetInnerHTML={{__html: data.htmlData}}>

      </div>
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
    fallback: false
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