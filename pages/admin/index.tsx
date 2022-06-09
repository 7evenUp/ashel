import styles from './Admin.module.css'

const Admin = () => {
  return (
    <main className={styles.main}>
      This is an Admin Page
    </main>
  )
}

export default Admin

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { data } = await  // your fetch function here 
  console.log("Cookies", ctx.req.cookies)
  return {
    props: {
      
    }
  }
}