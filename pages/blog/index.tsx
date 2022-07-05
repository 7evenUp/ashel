import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import BlogCard from '../../components/BlogCard'
import styles from './blog.module.css'

const Blog = () => {
  const [value, loading, error] = useCollection(collection(db, 'blog'), {
    snapshotListenOptions: { includeMetadataChanges: true}
  })
  return (
    <main className={styles.main}>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && value.docs.map((doc) => (
        <BlogCard
          key={doc.id}
          id={doc.id}
          title={doc.data().title}
          date={new Date(doc.data().date.seconds * 1000).toLocaleDateString()}
          description={doc.data().description}
          keyWords={doc.data().keyWords} />
      ))}
    </main>
  )
}

export default Blog