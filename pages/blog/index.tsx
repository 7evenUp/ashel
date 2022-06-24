import BlogCard from '../../components/BlogCard'
import styles from './blog.module.css'

const Blog = () => {
  return (
    <main className={styles.main}>
      <BlogCard
        id="why"
        title='Какие книги я читаю и почему'
        date='24.06.2022'
        description='Если вы хорошо меня знаете, то прекрасно осведомлены, что я люблю читать книги. Так какие книги я прочитал, читаю и собираюсь читать, расскажу '
        keyWords={['Книги', 'Самообразование', 'Искусство', 'Математика']}
        />
    </main>
  )
}

export default Blog