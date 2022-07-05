import Image from 'next/image'
import { getShimmerBase64 } from '../../lib/getShimmer'
import styles from './WorkCard.module.css'

type WorkCardProps = {
  title: string
  subtitle: string
  imgSrc: string
  description: string
  stack: Array<string>
  githubLink?: string
  previewLink: string
  accentColor: 'green' | 'cyan' | 'red'
}

const WorkCard = ({
  title,
  subtitle,
  imgSrc,
  description,
  stack,
  githubLink,
  previewLink,
  accentColor
}: WorkCardProps) => {
  return (
    <div className={styles.container}>
      <header
        className={styles.header}
        style={{
          backgroundColor: accentColor === 'green'
            ? '#B1F25E' : accentColor === 'cyan'
            ? '#5EF2E0' : '#F25E9C'
        }}>{title}</header>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.description}>
            <h2>{subtitle}</h2>
            <p>{description}</p>
          </div>
          <div className={styles.tech_stack}>
            <h2>Стек технологий</h2>
            <div>
              {stack.map((el, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: accentColor === 'green'
                      ? '#B1F25E' : accentColor === 'cyan'
                      ? '#5EF2E0' : '#F25E9C'
                  }}>{el}</span>
              ))}
            </div>
          </div>
          <div className={styles.links}>
            {githubLink && <a href={githubLink} target="_blank" rel="noreferrer">Ссылочка на исходник</a>}
            <a href={previewLink}  target="_blank" rel="noreferrer">Ссылочка на проект тут</a>
          </div>
        </div>
        <div className={styles.preview_image}>
          <Image
            width={450}
            height={450}
            objectFit="cover"
            src={imgSrc}
            alt={subtitle}
            layout='fill'
            placeholder="blur"
            blurDataURL={getShimmerBase64(150, 150)} />
        </div>
      </div>
    </div>
  )
}

export default WorkCard