import { FormEvent, useState } from 'react'
import Button from '../../components/Button'
import fetchJson, { FetchError } from '../../lib/fetchJson'
import useUser from '../../lib/useUser'
import styles from './Login.module.css'

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: '/admin',
    redirectIfFound: true
  })

  const [errorMsg, setErrorMsg] = useState('')

  const SubmitHandler = async (evt: FormEvent) => {
    evt.preventDefault()

    const body = {
      username: evt.currentTarget.username.value,
      password: evt.currentTarget.password.value
    }

    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
      )
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message)
      } else {
        setErrorMsg('An unexpected error happened: ' + error)
      }
    }
  }

  return (
    <main className={styles.main}>
      Login form
      <form onSubmit={SubmitHandler} className={styles.form_container}>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' name='username' required />

        <label htmlFor='password'>Password</label>
        <input id='password' type='password' name='password' required />

        {errorMsg && <p>Error: {errorMsg}</p>}

        <Button title='Login'/>
      </form>
    </main>
  )
}

export default Login