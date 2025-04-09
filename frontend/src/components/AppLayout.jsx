import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <main style={{ padding: '1.5rem' }}>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
