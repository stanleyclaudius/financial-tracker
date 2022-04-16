import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { BiLock } from 'react-icons/bi'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FormSubmit, InputChange, RootStore } from './../../utils/Interface'
import HeadInfo from './../../utils/HeadInfo'
import { ALERT } from '../../redux/types/alertTypes'
import Loader from '../../components/general/Loader'
import { resetPassword } from '../../redux/actions/authActions'

const ForgetPassword = () => {
  const [passwordData, setPasswordData] = useState({
    password: '',
    passwordConfirmation: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, alert } = useSelector((state: RootStore) => state)

  const { id } = useParams()

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!passwordData.password || !passwordData.passwordConfirmation) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide password and password confirmation.'
        }
      })
    }

    if (passwordData.password.length < 8) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Password should be at least 8 characters.'
        }
      })
    }

    if (passwordData.password !== passwordData.passwordConfirmation) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Password confirmation should be matched with password.'
        }
      })
    }

    await dispatch(resetPassword(passwordData.password, `${id}`))
    setPasswordData({ password: '', passwordConfirmation: '' })
    navigate('/login')
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/')
    }
  }, [auth.token, navigate])

  return (
    <>
      <HeadInfo title='Reset Password' />
      <div className='flex h-[100vh] overflow-hidden bg-primary'>
        <div className='flex-1 text-white px-12 py-16'>
          <div>
            <div className='flex items-center gap-7 mb-24'>
              <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt='Fintrack' />
              <h1 className='text-3xl'>Fintrack</h1>
            </div>
            <h1 className='text-3xl mb-10'>Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8 relative'>
                <BiLock className='text-xl mr-3' />
                <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={passwordData.password} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
                {
                  !showPassword
                  ? <AiFillEye className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPassword(true)} />
                  : <AiFillEyeInvisible className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPassword(false)} />
                }
              </div>
              <div className='flex items-center border border-gray-600 rounded-md p-3 relative mb-8'>
                <BiLock className='text-xl mr-3' />
                <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation' placeholder='Password Confirmation' value={passwordData.passwordConfirmation} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
                {
                  !showPasswordConfirmation
                  ? <AiFillEye className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPasswordConfirmation(true)} />
                  : <AiFillEyeInvisible className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPasswordConfirmation(false)} />
                }
              </div>
              <button className={`${alert.loading ? 'bg-gray-300 hover:bg-gray-300 cursor-auto' : 'bg-accent hover:bg-accentDark cursor-pointer'} transition-[background] rounded-full px-6 py-2 text-sm`}>  
                {
                  alert.loading
                  ? <Loader />
                  : 'Submit'
                }
              </button>
            </form>
          </div>
        </div>
        <div className='hidden md:block flex-[2] bg-cover' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/auth_background.png)` }} />
      </div>
    </>
  )
}

export default ForgetPassword