import WorkCard from '../../components/WorkCard'
import styles from './works.module.css'

const Works = () => {
  return (
    <main className={styles.main}>
      <WorkCard
        title='Веб-сайт'
        subtitle='Мой личный веб-сайт'
        description='Я разработал данный проект для личных целей: чтобы моё лицо тусовалось на медиа пространствах'
        stack={['React', 'Next.js', 'Figma', 'Firebase']}
        imgSrc='/works/ashel_preview.png'
        githubLink='https://github.com/7evenUp/ashel'
        previewLink='https://ashel.vercel.app/'
        accentColor='cyan' />

      <WorkCard
        title='Мобильное приложение'
        subtitle='Мобильное приложение для тренировок по футболу'
        description='Я разработал данное приложение с целью упрощения собственного тренировочного процесса. Идея пришла в голову еще на 1 курсе моего обучения. Однако тогда я знаниями мобильной разработки не располагал и не мог реализовать проект.'
        stack={['React', 'React Native', 'Redux', 'Figma', 'Firebase']}
        imgSrc='/works/ashel_preview.png'
        // githubLink='https://github.com/7evenUp/ashel'
        previewLink='https://ashel.vercel.app/'
        accentColor='green' />
    </main>
  )
}

export default Works