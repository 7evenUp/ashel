import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/Button'
import Card from '../components/Card'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ashel website</title>
        <meta name="description" content="Ashel website blog-portfolio" />
      </Head>
      <main className={styles.main}>
        <div className={styles.welcome}>
          <div className={styles.welcome_text}>
            <h2>ты зашёл сюда, чтобы получше меня узнать? Ну тогда я не против</h2>
            <div className={styles.cta}>
              <div className={styles.cta_image}>
                <Image src="/arrow.svg" alt="Arrow image" width={178} height={106} />
              </div>
              <Button title="Тыкни сюда" large onClick={() => alert("Ты лох")} />
            </div>
          </div>
          <div className={styles.welcome_image}>
            <Image src="/welcome.svg" alt="Welcome image" width={380} height={334} />
          </div>
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
            <Card title="Программист" accentColor="red">
              <p>
                Я пишу клиентскую часть на React, серверную на Node.js. Могу немного Python. Для разработки мобильных приложений использую React Native. Также практикую себя в UI/UX дизайне
              </p>
              <Link href="/works">
                <a>Посмотреть работы</a>
              </Link>
            </Card>
            <Card title='Футболист' accentColor="green">
              <p>
                Играю в футбол с пелёнок. В 2017 переехал в Санкт-Петербург и начал играть в футбол 11х11. В данный момент времени играю в ПФЛ (Пивной футбольной лиге). Очень много тренируюсь и пропагандирую ЗОЖ
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home