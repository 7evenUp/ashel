import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/Button'
import styles from '../styles/404.module.css'

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <Image src={'/page404.svg'} alt="Page not found" width={500} height={361} />
      <Link href="/">
        <a><Button title='Вернись на главную'/></a>
      </Link>
    </div>
  )
}