import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite'
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { BiLock } from 'react-icons/bi'
import { FormSubmit, InputChange } from '../utils/Interface'
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '../utils/constant'
import HeadInfo from './../utils/HeadInfo'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  const onGoogleSuccess = (res: GoogleLoginResponse) => {
    const token = res.getAuthResponse().id_token
  }

  const onFacebookSuccess = (res: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = res.authResponse
  }

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
              <p className='text-sm'>Forget password?</p>
              <div className='flex items-center justify-between mt-10'>
                <button className='bg-accent hover:bg-accentDark transition-[background] rounded-full px-7 py-2 text-sm'>Sign In</button>
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
        <div className='flex-[2] bg-cover' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/auth_background.png)` }} />
      </div>
    </>
  )
}

export default Login