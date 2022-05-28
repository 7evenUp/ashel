import styles from './Button.module.css'

type ButtonProps = {
  title: string
}

const Button = ({title}: ButtonProps) => {
  return (
    <button className={styles.button}>{title}</button>
  )
}

export default Button