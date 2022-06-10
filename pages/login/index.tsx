import { FormEvent } from 'react'
import Button from '../../components/Button'
import styles from './Login.module.css'

const Login = () => {
  const SubmitHandler = async (evt: FormEvent) => {
    evt.preventDefault()

    const body = {
      username: evt.currentTarget.username.value,
      password: evt.currentTarget.password.value
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const json = await res.json()

    console.log("RESPOND FROM SERVER: ", json)

    console.log('FORM BODY:')
    console.log(body)
  }

  return (
    <main className={styles.main}>
      Login form
      <form onSubmit={SubmitHandler} className={styles.form_container}>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' name='username' required />

        <label htmlFor='password'>Password</label>
        <input id='password' type='password' name='password' required />

        <Button title='Login'/>
      </form>
    </main>
  )
}

export default Login