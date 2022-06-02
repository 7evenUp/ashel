import Link from "next/link"
import { useState } from "react"
import styles from './Header.module.css'

const Header = () => {
  const [burgerClicked, setBurgerClicked] = useState(false)
  
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
      </div>
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