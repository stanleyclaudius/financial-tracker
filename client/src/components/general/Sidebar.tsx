import { Link, useLocation } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { AiOutlineDashboard, AiOutlineClockCircle } from 'react-icons/ai'

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <div className='md:flex hidden flex-1 bg-secondary px-7 py-10 flex-col'>
      <div className='flex-1'>
        <div className='flex items-center gap-4 border-b border-gray-700 pb-5 mb-12'>
          <div className='w-10 h-10 bg-gray-600'></div>
          <h1>Lorem Ipsum</h1>
        </div>
        <div className='flex items-center gap-4 mb-12'>
          <div className='w-12 h-12 rounded-full outline outline-2 outline-offset-2 outline-accent'></div>
          <h1>User Name</h1>
        </div>
        <div>
          <Link to='/' className={`flex items-center gap-3 mb-6 w-fit hover:text-accent hover:font-medium ${pathname === '/' || pathname === '/index' ? 'text-accent font-medium' : 'text-gray-400'}`}>
            <AiOutlineDashboard className='text-xl' />
            Overview
          </Link>
          <Link to='/' className='flex items-center gap-3 mb-6 w-fit text-gray-400 hover:text-accent hover:font-medium'>
            <AiOutlineClockCircle className='text-xl' />
            History
          </Link>
          <Link to='/' className='flex items-center gap-3 w-fit text-gray-400 hover:text-accent hover:font-medium'>
            <HiOutlineDocumentAdd className='text-xl' />
            Add Transaction
          </Link>
        </div>
      </div>
      <div className='border-t border-gray-700 pt-5'>
        <div className='flex items-center gap-3 text-gray-400 cursor-pointer w-fit hover:text-accent hover:font-medium'>
          <MdLogout className='text-xl' />
          Logout
        </div>
      </div>
    </div>
  )
}

export default Sidebar