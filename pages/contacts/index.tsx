import Image from 'next/image'
import styles from './contacts.module.css'

const Contacts = () => {
  return (
    <>
      <main className={styles.main}>
        <ul className={styles.links}>
          <li><a href="https://www.instagram.com/7_even_up/">Instagram</a></li>
          <li><a href="https://vk.com/aptem_oxa" target={'_blank'} rel={'noreferrer'}>Vkontakte</a></li>
          <li><a href="https://github.com/7evenUp" target={'_blank'} rel={'noreferrer'}>Github</a></li>
          <li><a href="https://t.me/x7evenUpx" target={'_blank'} rel={'noreferrer'}>Telegram</a></li>
        </ul>
        <Image
          width={532}
          height={387}
          objectFit="cover"
          src={'/mail.svg'}
          alt="Mail image"
        />
        
      </main>
      <div className={styles.waves}>
        <div className={styles.wave1}>
          <Image
            width={486}
            height={186}
            objectFit="cover"
            src={'/wave1.svg'}
            alt=""
          />
        </div>
        <div className={styles.wave2}>
          <Image
            width={236}
            height={156}
            objectFit="cover"
            src={'/wave2.svg'}
            alt=""
          />
        </div>
        <div className={styles.wave3}>
          <Image
            width={377}
            height={115}
            objectFit="cover"
            src={'/wave3.svg'}
            alt=""
          />
        </div>
        <div className={styles.wave4}>
          <Image
            width={295}
            height={296}
            objectFit="cover"
            src={'/wave4.svg'}
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default Contacts