import { useRouter } from 'next/router'
import Link from 'next/link'
import { withSessionSsr } from "../../lib/withSession"
import Button from '../../components/Button'
import { UserType } from '../api/user'
import useUser from "../../lib/useUser"
import fetchJson from "../../lib/fetchJson"
import { useMediaQuery } from 'react-responsive'

type AdminProps = {
  user: UserType
}

const Admin = ({ user }: AdminProps) => {
  const isMobile = useMediaQuery({
    query: '(min-width: 665px)'
  })
  const { mutateUser } = useUser()
  const router = useRouter()
  
  return (
    <main style={{
      padding: '4rem 0',
      flex: '1 1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{
        display: 'flex',
        flexDirection: !isMobile ? 'column' : 'row',
        gap: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>
        This is an Admin Page
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          gap: 16,
          fontSize: 20
        }}>
          <li><Link href="admin/blog"><a>Блог</a></Link></li>
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