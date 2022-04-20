import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { ALERT } from './../../redux/types/alertTypes'
import { RootStore } from './../../utils/Interface'
import { postDataAPI } from './../../utils/fetchData'
import HeadInfo from './../../utils/HeadInfo'

const Activate = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (auth.token) {
      navigate('/')
    }
  }, [auth.token, navigate])

  useEffect(() => {
    postDataAPI('auth/activate', { token: id })
      .then(res => {
        dispatch({
          type: ALERT,
          payload: {
            success: res.data.msg
          }
        })
        navigate('/login')
      })
      .catch(err => {
        dispatch({
          type: ALERT,
          payload: {
            errors: err.response.data.msg
          }
        })
        navigate('/login')
      })
  }, [id, dispatch, navigate])

  return (
    <>
      <HeadInfo title='Activate Account' />
      <div></div>
    </>
  )
}

export default Activate