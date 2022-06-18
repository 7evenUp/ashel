import styles from './TextInput.module.css'

type TextInputTypes = {
  name: string
  typeInput: 'text' | 'password' | 'email'
  required?: boolean
  max?: number
  min?: number
}

export default function TextInput({ name, typeInput, required, max, min }: TextInputTypes) {
  return (
    <label htmlFor={name} className={styles.label}>
      <span className={styles.span}>{name}</span>
      <input
        className={styles.input}
        id={name}
        type={typeInput}
        placeholder={name}
        required={required ? true : false}
        maxLength={max}
        minLength={min} />
    </label>
  )
}
