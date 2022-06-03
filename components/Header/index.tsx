import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from './Header.module.css'

const Header = () => {
  const [burgerClicked, setBurgerClicked] = useState(false)
  const router = useRouter()
  
  return (
    <header className={styles.container}>
      <h1 className={styles.heading}>ASHEL</h1>
      <div
        className={`${styles.burger_nav} ${burgerClicked ? styles.burger_nav__active : ''}`}
        onClick={() => {
          setBurgerClicked(!burgerClicked)
        }}>
        <button type="button" className={styles.burger_btn}></button>
        <nav className={styles.burger_menu}>
          <ul>
            <li className={router.pathname === "/blog" ? styles.burger_link__active : ""}>
              <Link href={'blog'}>
                <a>Блог</a>
              </Link>
            </li>
            <li className={router.pathname === "/works" ? styles.burger_link__active : ""}>
              <Link href={'works'}>
                <a>Работы</a>
              </Link>
            </li>
            <li className={router.pathname === "/gallery" ? styles.burger_link__active : ""}>
              <Link href={'gallery'}>
                <a>Галерея</a>
              </Link>
            </li>
            <li className={router.pathname === "/contacts" ? styles.burger_link__active : ""}>
              <Link href={'contacts'}>
                <a>Контакты</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={router.pathname === "/blog" ? styles.link__active : ""}>
            <Link href={'blog'}>
              <a>Блог</a>
            </Link>
          </li>
          <li className={router.pathname === "/works" ? styles.link__active : ""}>
            <Link href={'works'}>
              <a>Работы</a>
            </Link>
          </li>
          <li className={router.pathname === "/gallery" ? styles.link__active : ""}>
            <Link href={'gallery'}>
              <a>Галерея</a>
            </Link>
          </li>
          <li className={router.pathname === "/contacts" ? styles.link__active : ""}>
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