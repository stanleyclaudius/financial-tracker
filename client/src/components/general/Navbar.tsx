import { useState, useEffect, useRef } from 'react'
import { AiOutlineClockCircle, AiOutlineDashboard } from 'react-icons/ai'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const { pathname } = useLocation()

  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDropdown])

  return (
    <div className='flex md:hidden w-full bg-secondary text-white items-center justify-between px-7 py-5 border-b border-gray-600 sticky top-0'>
      <div className='flex items-center gap-4'>
        <div className='w-10 h-10 bg-gray-600'></div>
        <p>Lorem Ipsum</p>
      </div>
      <div ref={dropdownRef} className='flex items-center gap-4 relative'>
        <div onClick={() => setOpenDropdown(!openDropdown)} className='w-9 h-9 rounded-full cursor-pointer outline outline-2 outline-offset-2 outline-accent'></div>
        <div className={`${openDropdown ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute top-[100%] mt-3 right-0 w-[180px] bg-gray-700 rounded-md`}>
          <Link to='/' className={`flex items-center gap-3 p-3 border-b border-gray-500 w-full w-fit hover:text-accent hover:font-medium ${pathname === '/' || pathname === '/index' ? 'text-accent font-medium' : 'text-gray-400'}`}>
            <AiOutlineDashboard className='text-xl' />
            Overview
          </Link>
          <Link to='/history' className='flex items-center gap-3 w-fit p-3 border-b border-gray-500 w-full text-gray-400 hover:text-accent hover:font-medium'>
            <AiOutlineClockCircle className='text-xl' />
            History
          </Link>
          <Link to='/' className='flex items-center gap-3 w-fit p-3 border-b border-gray-500 w-full text-gray-400 hover:text-accent hover:font-medium'>
            <HiOutlineDocumentAdd className='text-xl' />
            Add Transaction
          </Link>
          <div className='flex items-center gap-3 text-gray-400 p-3 cursor-pointer w-full hover:text-accent hover:font-medium'>
            <MdLogout className='text-xl' />
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar