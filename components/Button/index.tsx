import styles from './Button.module.css'

type ButtonProps = {
  title: string
  onClick: () => void
  large?: boolean
}

const Button = ({title, large, onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${large && styles.button__large}`}>
        {title}
    </button>
  )
}

export default Button