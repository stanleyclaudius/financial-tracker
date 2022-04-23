import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootStore } from '../utils/Interface'
import Layout from './../components/general/Layout'
import Transaction from './../components/history/Transaction'

const History = () => {
  const navigate = useNavigate()

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (!auth.token) {
      navigate('/login')
    }
  }, [auth.token, navigate])
  
  return (
    <Layout title='History'>
      <Transaction />
    </Layout>
  )
}

export default History