import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { BiLock } from 'react-icons/bi'
import { FormSubmit, InputChange, RootStore } from './../utils/Interface'
import { ALERT } from './../redux/types/alertTypes'
import { register } from './../redux/actions/authActions'
import { checkEmail } from './../utils/checkEmail'
import HeadInfo from './../utils/HeadInfo'
import Loader from './../components/general/Loader'

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { alert, auth } = useSelector((state: RootStore) => state)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!userData.name || !userData.email || !userData.password || !userData.passwordConfirmation) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide name, email, password, and password confirmation.'
        }
      })
    }

    if (!checkEmail(userData.email)) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide valid email address.'
        }
      })
    }

    if (userData.password.length < 8) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Password should be at least 8 characters.'
        }
      })
    }

    if (userData.password !== userData.passwordConfirmation) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Password confirmation should be matched with password.'
        }
      })
    }

    await dispatch(register(userData))
    setUserData({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  useEffect(() => {
    if (auth.token) {
      navigate(-1)
    }
  }, [auth.token, navigate])

  return (
    <>
      <HeadInfo title='Sign Up' />
      <div className='flex h-[100vh] overflow-hidden bg-primary'>
        <div className='flex-1 text-white px-12 py-16'>
          <div>
            <div className='flex items-center gap-7 mb-16'>
              <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt='Fintrack' />
              <h1 className='text-3xl'>Fintrack</h1>
            </div>
            <h1 className='text-3xl mb-10'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
                <AiOutlineUser className='text-xl mr-3' />
                <input type='text' name='name' autoComplete='off' placeholder='Name' value={userData.name} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
              </div>
              <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
                <AiOutlineUser className='text-xl mr-3' />
                <input type='text' name='email' autoComplete='off' placeholder='Email address' value={userData.email} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
              </div>
              <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8 relative'>
                <BiLock className='text-xl mr-3' />
                <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={userData.password} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
                {
                  !showPassword
                  ? <AiFillEye className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPassword(true)} />
                  : <AiFillEyeInvisible className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPassword(false)} />
                }
              </div>
              <div className='flex items-center border border-gray-600 rounded-md p-3 relative'>
                <BiLock className='text-xl mr-3' />
                <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation' placeholder='Password Confirmation' value={userData.passwordConfirmation} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
                {
                  !showPasswordConfirmation
                  ? <AiFillEye className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPasswordConfirmation(true)} />
                  : <AiFillEyeInvisible className='text-gray-400 cursor-pointer ml-3' onClick={() => setShowPasswordConfirmation(false)} />
                }
              </div>
              <div className='flex items-center justify-between mt-10'>
                <button className={`${alert.loading ? 'bg-gray-300 hover:bg-gray-300 cursor-auto' : 'bg-accent hover:bg-accentDark cursor-pointer'} transition-[background] rounded-full px-7 py-2 text-sm`}>
                  {
                    alert.loading
                    ? <Loader />
                    : 'Sign Up'
                  }
                </button>
                <Link to='/login' className='hover:underline block w-fit text-sm outline-none'>Sign In</Link>
              </div>
            </form>
          </div>
        </div>
        <div className='hidden md:block flex-[2] bg-cover' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/auth_background.png)` }} />
      </div>
    </>
  )
}

export default Register