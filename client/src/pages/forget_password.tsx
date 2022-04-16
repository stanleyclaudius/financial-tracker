import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { FormSubmit, RootStore } from './../utils/Interface'
import { ALERT } from './../redux/types/alertTypes'
import { checkEmail } from './../utils/checkEmail'
import { forgetPassword } from './../redux/actions/authActions'
import HeadInfo from './../utils/HeadInfo'
import Loader from './../components/general/Loader'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth, alert } = useSelector((state: RootStore) => state)

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!email) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide email address.'
        }
      })
    }

    if (!checkEmail(email)) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide valid email address.'
        }
      })
    }

    await dispatch(forgetPassword(email))
    setEmail('')
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/')
    }
  }, [auth.token, navigate])

  return (
    <>
      <HeadInfo title='Sign Up' />
      <div className='flex h-[100vh] overflow-hidden bg-primary'>
        <div className='flex-1 text-white px-12 py-16'>
          <div>
            <div className='flex items-center gap-7 mb-32'>
              <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt='Fintrack' />
              <h1 className='text-3xl'>Fintrack</h1>
            </div>
            <h1 className='text-3xl mb-10'>Forget Password</h1>
            <form onSubmit={handleSubmit}>
              <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
                <AiOutlineUser className='text-xl mr-3' />
                <input type='text' name='email' autoComplete='off' placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} className='w-full bg-transparent text-sm outline-none' />
              </div>
              <div className='flex items-center justify-between mt-10'>
                <button className={`${alert.loading ? 'bg-gray-300 hover:bg-gray-300 cursor-auto' : 'bg-accent hover:bg-accentDark cursor-pointer'} transition-[background] rounded-full px-7 py-2 text-sm`}>
                  {
                    alert.loading
                    ? <Loader />
                    : 'Send'
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

export default ForgetPassword