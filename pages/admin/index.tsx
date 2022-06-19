import { useRouter } from 'next/router'
import Link from 'next/link'
import { withSessionSsr } from "../../lib/withSession"
import Button from '../../components/Button'
import { UserType } from '../api/user'
import useUser from "../../lib/useUser"
import fetchJson from "../../lib/fetchJson"
import styles from './admin.module.css'

type AdminProps = {
  user: UserType
}

const Admin = ({ user }: AdminProps) => {
  const { mutateUser } = useUser()
  const router = useRouter()
  
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        This is an Admin Page
        <ul className={styles.list}>
          <li><Link href="admin/blog"><a>Блог</a></Link></li>
          <li><Link href="admin/works"><a>Работы</a></Link></li>
          <li><Link href="admin/gallery"><a>Галерея</a></Link></li>
        </ul>
        <Button title='Logout' onClick={async () => {
          mutateUser(
            await fetchJson('/api/logout', { method: 'POST' }),
            false
          )
          router.push('/login')
        }} />
      </header>
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