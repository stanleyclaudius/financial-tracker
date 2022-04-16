import { useState } from 'react'
import { BiLock } from 'react-icons/bi'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FormSubmit, InputChange } from './../../utils/Interface'
import HeadInfo from './../../utils/HeadInfo'

const ForgetPassword = () => {
  const [passwordData, setPasswordData] = useState({
    password: '',
    passwordConfirmation: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

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
              <button className='bg-accent hover:bg-accentDark transition-[background] rounded-full px-6 py-2 text-sm'>Submit</button>
            </form>
          </div>
        </div>
        <div className='hidden md:block flex-[2] bg-cover' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/auth_background.png)` }} />
      </div>
    </>
  )
}

export default ForgetPassword