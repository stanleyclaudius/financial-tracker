import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootStore } from './../utils/Interface'
import Dashboard from './../components/home/Dashboard'
import Layout from './../components/general/Layout'

const Home = () => {
  const navigate = useNavigate()
  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (!auth.token) {
      navigate('/login')
    }
  }, [auth.token, navigate])

  return (
    <Layout title='Home'>
      <Dashboard />
    </Layout>
  )
}

export default Home