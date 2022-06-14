import styles from './GalleryCard.module.css'

type GalleryCardProps = {
  title: string
  date: string
  children: React.ReactNode
  accentColor: 'green' | 'cyan' | 'red'
}

const GalleryCard = ({children, title, accentColor, date}: GalleryCardProps) => {
  return (
    <div className={styles.container}>
      <header
        className={styles.header}
        style={{backgroundColor: accentColor === 'green' ? '#B1F25E' :
                accentColor === 'cyan' ? '#5EF2E0' : '#F25E9C'}}>
        {title}
        <div className={styles.date_wrapper}>
          <span
            className={styles.date_icon}
            style={{backgroundImage: 'url(iconClockBold.svg)'}}></span>
          <span className={styles.date}>{date}</span>
        </div>
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default GalleryCard