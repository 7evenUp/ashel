import { withSessionSsr } from "../../lib/withSession";
import Button from '../../components/Button'
import { UserType } from '../api/user'
import styles from './Admin.module.css'

type AdminProps = {
  user: UserType
}

const Admin = ({ user }: AdminProps) => {
  return (
    <main className={styles.main}>
      This is an Admin Page

      <Button title='Logout' onClick={async () => {
        const res = await fetch('api/logout', { method: 'POST'})
        console.log(res)
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