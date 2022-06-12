import styles from './TextInput.module.css'

type TextInputTypes = {
  name: string
  typeInput: 'text' | 'password' | 'email'
  required?: boolean
}

export default function TextInput({ name, typeInput, required }: TextInputTypes) {
  return (
    <label htmlFor={name} className={styles.label}>
      <span className={styles.span}>{name}</span>
      <input
        className={styles.input}
        id={name}
        type={typeInput}
        placeholder={name}
        required={required ? true : false} />
    </label>
  )
}
