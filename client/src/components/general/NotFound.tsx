import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className='w-screen h-screen overflow-hidden flex items-center justify-center bg-primary text-white flex-col'>
      <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt='Fintrack' />
      <h1 className='text-2xl mt-5 font-medium'>Page Not Found</h1>
      <Link to='/' className='bg-secondary rounded-md px-5 py-2 mt-7 hover:bg-accent transition-[background]'>Back to Home</Link>
    </div>
  )
}

export default NotFound