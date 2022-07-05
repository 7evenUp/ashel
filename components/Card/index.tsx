import styles from './Card.module.css'

type CardProps = {
  title: string
  children: React.ReactNode
  accentColor: 'green' | 'cyan' | 'red'
}

const Card = ({children, title, accentColor}: CardProps) => {
  return (
    <div className={styles.container}>
      <header
        className={styles.header}
        style={{
          backgroundColor: accentColor === 'green'
            ? '#B1F25E' : accentColor === 'cyan'
            ? '#5EF2E0' : '#F25E9C'
        }}>
        {title}
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Card