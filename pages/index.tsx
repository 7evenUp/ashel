import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ashel website</title>
        <meta name="description" content="Ashel website blog-portfolio" />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className={styles.welcome}>
          <div className={styles.welcome_text}>
            <h2>ты зашёл сюда, чтобы получше меня узнать? Ну тогда я не против</h2>
            <div className={styles.cta}>
              <Image src="/arrow.svg" alt="Arrow image" width={178} height={106} />
              <Button title="Тыкни сюда" />
            </div>
          </div>
          <Image className={styles.welcome_image} src="/welcome.svg" alt="Welcome image" width={380} height={334} />
        </div>
        <div className={styles.info}>
          <div className={styles.info_text}>
            <p>Ты наверно думаешь, зачем я создал вот это вот всё. Или может ты вообще ни о чём не думаешь.</p>
            <p>Короче, Москва - не Сочи, так уж и быть, в кратце расскажу о себе.</p>
            <p>Мне 21 год, ушёл со школы после 9 класса, получил диплом программиста, играю в футбол и по выходным не прочь оттопыриться. Любитель книг и спичек. Работаю в криптовалюте и имею стабильный заработок в интернете.</p>
            <p>В данный момент своего жизненного отрезка ищу истинный путь в нашей краткосрочной жизни.</p>
          </div>
          <span className={styles.separator} />
          <div className={styles.bio}>
            1
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
