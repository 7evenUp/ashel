import { useRouter } from 'next/router'
import { withSessionSsr } from "../../lib/withSession"
import Button from '../../components/Button'
import { UserType } from '../api/user'
import useUser from "../../lib/useUser"
import fetchJson from "../../lib/fetchJson"
import TextInput from '../../components/Input/TextInput'
import { addDocument } from '../../firebase/useGallery'
import { useState } from 'react'
// import styles from './admin.module.css'

type AdminProps = {
  user: UserType
}

const Admin = ({ user }: AdminProps) => {
  const [loading, setLoading] = useState(false)
  const [docAddedSuccess, setDocAddedSuccess] = useState('')
  const [docAddedError, setDocAddedError] = useState('')
  const { mutateUser } = useUser()
  const router = useRouter()
  
  return (
    <main
      // className={styles.main}
      >
      This is an Admin Page

      <Button title='Logout' onClick={async () => {
        mutateUser(
          await fetchJson('/api/logout', { method: 'POST' }),
          false
        )
        router.push('/login')
      }} />

      <form onSubmit={async (evt) => {
        evt.preventDefault()
        
        
        const file: File = evt.currentTarget.file.files[0]
        const title = evt.currentTarget.qtitle.value

        console.log(file)
        // setLoading(true)
        // const { resultId, error } = await addDocument(file, title)
        // setLoading(false)

        // if (resultId) setDocAddedSuccess(resultId)
        // else if (error) setDocAddedError(error)
      }}>
        Gallery form
        <TextInput name="qtitle" typeInput='text' required max={18} min={1} />
        <input type="file" name="file" required />
        <button>Submit</button>

        {loading === true && <span>Uploading...</span>}

        {docAddedSuccess && <h1 style={{color: 'green'}}>Success with new ID: {docAddedSuccess}</h1>}
        {docAddedError && <h1 style={{color: 'red'}}>Error happend: {docAddedError}</h1>}
      </form>
    </main>
  )
}

export default Admin

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user

    if (user) {
      return {
        props: {
          user: req.session.user
        }
      }
    } else {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  },
)