import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineClockCircle, AiOutlineDashboard } from 'react-icons/ai'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import { BiNews } from 'react-icons/bi'
import { RootStore } from './../../utils/Interface'
import { logout } from './../../redux/actions/authActions'
import AddTransactionModal from './../modal/AddTransactionModal'

interface IProps {
  setOpenNews: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<IProps> = ({ setOpenNews }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openAddTransactionModal, seteOpenAddTransactionModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)
  const { pathname } = useLocation()

  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const addTransactionModalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleLogout = async() => {
    await dispatch(logout(auth.token!))
    navigate('/login')
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openDropdown])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openAddTransactionModal && addTransactionModalRef.current && !addTransactionModalRef.current.contains(e.target as Node)) {
        seteOpenAddTransactionModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openAddTransactionModal])

  return (
    <>
      <div className='flex lg:hidden w-full bg-secondary text-white items-center justify-between px-7 py-5 border-b border-gray-600 sticky top-0'>
        <Link to='/' className='flex items-center gap-4'>
          <div className='w-10 h-10'>
            <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt='Fintrack' className='w-full h-full' />
          </div>
          <p>Fintrack</p>
        </Link>
        <div className='flex items-center gap-8'>
          <BiNews onClick={() => setOpenNews(true)} className='cursor-pointer text-2xl text-gray-400' />
          <div ref={dropdownRef} className='flex items-center gap-4 relative'>
            <div onClick={() => setOpenDropdown(!openDropdown)} className='w-7 h-7 rounded-full cursor-pointer outline outline-2 outline-offset-2 outline-accent'>
              <img src={auth.user?.avatar} alt={auth.user?.name} className='w-full h-full rounded-full' />
            </div>
            <div className={`${openDropdown ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top absolute top-[100%] mt-3 right-0 w-[180px] bg-gray-700 rounded-md`}>
              <Link to='/' className={`flex items-center gap-3 p-3 border-b border-gray-500 w-full w-full hover:text-accent hover:font-medium ${pathname === '/' || pathname === '/index' ? 'text-accent font-medium' : 'text-gray-400'}`}>
                <AiOutlineDashboard className='text-xl' />
                Overview
              </Link>
              <Link to='/history' className={`flex ${pathname === '/history' ? 'text-accent font-medium' : 'text-gray-400'} items-center gap-3 p-3 border-b border-gray-500 w-full text-gray-400 hover:text-accent hover:font-medium`}>
                <AiOutlineClockCircle className='text-xl' />
                History
              </Link>
              <p onClick={() => seteOpenAddTransactionModal(true)} className='cursor-pointer flex items-center gap-3 p-3 border-b border-gray-500 w-full text-gray-400 hover:text-accent hover:font-medium'>
                <HiOutlineDocumentAdd className='text-xl' />
                Add Transaction
              </p>
              <div onClick={handleLogout} className='flex items-center gap-3 text-gray-400 p-3 cursor-pointer w-full hover:text-accent hover:font-medium'>
                <MdLogout className='text-xl' />
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddTransactionModal
        openModal={openAddTransactionModal}
        setOpenModal={seteOpenAddTransactionModal}
        modalRef={addTransactionModalRef}
      />
    </>
  )
}

export default Navbar