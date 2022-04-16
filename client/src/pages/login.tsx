import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite'
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { BiLock } from 'react-icons/bi'
import { FormSubmit, InputChange, RootStore } from './../utils/Interface'
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from './../utils/constant'
import { ALERT } from './../redux/types/alertTypes'
import { facebookLogin, googleLogin, login } from './../redux/actions/authActions'
import HeadInfo from './../utils/HeadInfo'
import Loader from './../components/general/Loader'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { alert, auth } = useSelector((state: RootStore) => state)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!userData.email || !userData.password) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide email and password.'
        }
      })
    }

    await dispatch(login(userData))
    setUserData({ email: '', password: '' })
  }

  const onGoogleSuccess = (res: GoogleLoginResponse) => {
    const token = res.getAuthResponse().id_token
    dispatch(googleLogin(token))
  }

  const onFacebookSuccess = (res: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = res.authResponse
    dispatch(facebookLogin(accessToken, userID))
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/')
    }
  }, [auth.token, navigate])

  return (
    <>
      <HeadInfo title='Sign In' />
      <div className='flex h-[100vh] overflow-hidden bg-primary'>
        <div className='flex-1 text-white px-12 py-16'>
          <div>
            <div className='flex items-center gap-7 mb-16'>
              <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt='Fintrack' />
              <h1 className='text-3xl'>Fintrack</h1>
            </div>
            <h1 className='text-3xl mb-10'>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
                <AiOutlineUser className='text-xl mr-3' />
                <input type='text' name='email' autoComplete='off' placeholder='Email address' value={userData.email} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
              </div>
              <div className='flex items-center border border-gray-600 rounded-md p-3 mb-2 relative'>
                <BiLock className='text-xl mr-3' />
                <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={userData.password} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
                {
                  !showPassword
                  ? <AiFillEye className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPassword(true)} />
                  : <AiFillEyeInvisible className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPassword(false)} />
                }
              </div>
              <Link to='/forget_password' className='text-sm'>Forget password?</Link>
              <div className='flex items-center justify-between mt-10'>
                <button className={`${alert.loading ? 'bg-gray-300 hover:bg-gray-300 cursor-auto' : 'bg-accent hover:bg-accentDark cursor-pointer'} transition-[background] rounded-full px-7 py-2 text-sm`}>
                  {
                    alert.loading
                    ? <Loader />
                    : 'Sign In'
                  }
                </button>
                <Link to='/register' className='hover:underline block w-fit text-sm outline-none'>Create Account</Link>
              </div>
            </form>
          </div>
          <div className='mt-10'>
            <p className='text-center text-gray-300 font-medium text-sm'>Or Sign In With</p>
            <div className='flex justify-center items-center mt-7'>
              <div className='w-fit'>
                <GoogleLogin
                  client_id={GOOGLE_CLIENT_ID}
                  cookiepolicy='single_host_origin'
                  onSuccess={onGoogleSuccess}
                />
              </div>
              <div className='ml-8'>
                <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  onSuccess={onFacebookSuccess}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='hidden md:block flex-[2] bg-cover' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/auth_background.png)` }} />
      </div>
    </>
  )
}

export default Login