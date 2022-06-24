import Link from 'next/link'
import styles from './BlogCard.module.css'

type BlogCardProps = {
  title: string
  date: string
  description: string
  keyWords: Array<string>
}

const BlogCard = ({ title, date, description, keyWords }: BlogCardProps) => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.date_wrapper}>
          <span
            className={styles.date_icon}
            style={{backgroundImage: 'url(iconClockBold_gray.svg)'}}></span>
          <span className={styles.date}>{date}</span>
        </div>
      </header>
      <main className={styles.content}>
        <p className={styles.description}>{description}</p>
        <div className={styles.key_words}>
          {keyWords.map((el, index) => <span key={index}>{el}</span>)}
        </div>
        <Link href="#" className={styles.link}>
          <a>Читать далее</a>
        </Link>
      </main>
    </article>
  )
}

export default BlogCard