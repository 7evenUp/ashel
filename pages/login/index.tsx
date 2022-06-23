import { FormEvent, useState } from 'react'
import Button from '../../components/Button'
import TextInput from '../../components/Input/TextInput'
import fetchJson, { FetchError } from '../../lib/fetchJson'
import useUser from '../../lib/useUser'

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
    <main style={{
      padding: '4rem 0',
      flex: '1 1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 300,
        maxWidth: 450,
        gap: 32,
        fontSize: 20
      }}>
        <h2>Вау, ты нашёл секретную страницу</h2>
        <p>
          С помощью данной формы я захожу к себе в админ-панель,
          где добавляю и редактирую свои посты.
          Если хочешь зайти посмотреть, то вот:
        </p>
        <span>Username: <code>RootUser</code></span>
        <span>Password: <code>RootUserPassword</code></span>
      </div>
      
      <form
        onSubmit={SubmitHandler}
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          minWidth: 300,
          maxWidth: 400
        }}
        >
        <TextInput 
          name='username'
          typeInput='text'
          required />

        <TextInput 
          name='password'
          typeInput='password'
          required />

        {errorMsg && <p style={{
          backgroundColor: '#F25E9C',
          color: 'white',
          padding: '8px 16px',
          fontSize: 20,
          borderRadius: 5
        }}>Error: {errorMsg}</p>}

        <div style={{maxWidth: 300}}>
          <Button title='Login' />
        </div>

        
      </form>
    </main>
  )
}

export default Login