import { FormEvent, useState } from 'react'
import Button from '../../components/Button'
import TextInput from '../../components/Input/TextInput'
import fetchJson, { FetchError } from '../../lib/fetchJson'
import useUser from '../../lib/useUser'
// import styles from './login.module.css'

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: '/admin',
    redirectIfFound: true
  })

  const [errorMsg, setErrorMsg] = useState('')

  const SubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
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
      <div>
        <h2>Вау, ты нашёл секретную страницу</h2>
        <p>
          С помощью данной формы я захожу к себе в админ-панель,
          где добавляю и редактирую свои посты
        </p>
      </div>
      
      <form onSubmit={SubmitHandler} className={styles.form_container}>
        Login form

        <TextInput 
          name='username'
          typeInput='text'
          required />

        <TextInput 
          name='password'
          typeInput='password'
          required />

        {errorMsg && <p>Error: {errorMsg}</p>}

        <Button title='Login'/>
      </form>
    </main>
  )
}

export default Login