import { useRouter } from 'next/router'
import { withSessionSsr } from "../../lib/withSession"
import Button from '../../components/Button'
import { UserType } from '../api/user'
import useUser from "../../lib/useUser"
import fetchJson from "../../lib/fetchJson"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, addDoc, setDoc } from "firebase/firestore"
import { storage, db } from '../../firebase/config'
import TextInput from '../../components/Input/TextInput'
// import styles from './admin.module.css'

type AdminProps = {
  user: UserType
}

const Admin = ({ user }: AdminProps) => {
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
        
        const file = evt.currentTarget.file.files[0]
        const title = evt.currentTarget.qtitle.value

        const storageRef = ref(storage, 'some-child')

        const snapshot = await uploadBytes(storageRef, file)
        console.log('File uploaded')
        const URL = await getDownloadURL(snapshot.ref)
        console.log("URL: ", URL)
        const docs = await setDoc(doc(db, 'gallery'), {
          title: title,
          imgSrc: URL,
          date: new Date(Date.now())
        })
      }}>
        Gallery form
        <TextInput name="qtitle" typeInput='text' required />
        <input type="file" name="file" />
        <button>Submit</button>
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