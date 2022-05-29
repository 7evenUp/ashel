import Link from "next/link"
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.heading}>ASHEL</h1>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <Link href={'blog'}>
              <a>Блог</a>
            </Link>
          </li>
          <li>
            <Link href={'works'}>
              <a>Работы</a>
            </Link>
          </li>
          <li>
            <Link href={'gallery'}>
              <a>Галерея</a>
            </Link>
          </li>
          <li>
            <Link href={'contacts'}>
              <a>Контакты</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header