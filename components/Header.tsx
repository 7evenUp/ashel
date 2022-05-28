import Link from "next/link"

const Header = () => {
  return (
    <header>
      <h1>ASHEL</h1>
      <nav>
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
    </header>
  )
}

export default Header