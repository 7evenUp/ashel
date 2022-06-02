import Header from '../Header'
import styles from './Layout.module.css'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  )
}

export default Layout