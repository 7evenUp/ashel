import WorkCard from '../../components/WorkCard'
import styles from './works.module.css'

const Works = () => {
  return (
    <main className={styles.main}>
      <WorkCard
        title='Веб-сайт'
        subtitle='Мой личный веб-сайт'
        description='Я разработал данный проект для личных целей: чтобы моё лицо тусовалось на медиа пространствах'
        stack={['Next.js', 'Typescript', 'Firebase']}
        imgSrc='/works/ashel_preview.png'
        githubLink='https://github.com/7evenUp/ashel'
        previewLink='https://ashel.vercel.app/'
        accentColor='cyan'
      />
    </main>
  )
}

export default Works