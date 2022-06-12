import { useRouter } from 'next/router'
import { withSessionSsr } from "../../lib/withSession"
import Button from '../../components/Button'
import { UserType } from '../api/user'
import styles from './admin.module.css'
import useUser from "../../lib/useUser"
import fetchJson from "../../lib/fetchJson"

type AdminProps = {
  user: UserType
}

const Admin = ({ user }: AdminProps) => {
  const { mutateUser } = useUser()
  const router = useRouter()
  
  return (
    <main className={styles.main}>
      This is an Admin Page

      <Button title='Logout' onClick={async () => {
        mutateUser(
          await fetchJson('/api/logout', { method: 'POST' }),
          false
        )
        router.push('/login')
      }} />
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