import styles from './Button.module.css'

type ButtonProps = {
  title: string
  large?: boolean
}

const Button = ({title, large}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${large && styles.button__large}`}>
        {title}
    </button>
  )
}

export default Button