import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { AiOutlineDashboard, AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import { logout } from './../../redux/actions/authActions'
import { RootStore } from './../../utils/Interface'
import AddTransactionModal from './../modal/AddTransactionModal'

const Sidebar = () => {
  const [openAddTransactionModal, seteOpenAddTransactionModal] = useState(false)

  const addTransactionModalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)
  const { pathname } = useLocation()

  const handleLogout = async() => {
    await dispatch(logout(auth.token!))
    navigate('/login')
  }

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
      <div className='lg:flex hidden flex-1 bg-secondary px-7 py-10 flex-col'>
        <div className='flex-1'>
          <div className='flex items-center gap-4 border-b border-gray-700 pb-5 mb-12'>
            <div className='w-10 h-10 shrink-0'>
              <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt='Fintrack' />
            </div>
            <h1>Fintrack</h1>
          </div>
          <div className='flex items-center gap-4 mb-12'>
            <div className='w-12 h-12 rounded-full outline outline-2 outline-offset-2 outline-accent shrink-0'>
              <img src={auth.user?.avatar} alt={auth.user?.name} className='rounded-full w-full h-full' />
            </div>
            <h1>{auth.user?.name}</h1>
          </div>
          <div>
            <Link to='/' className={`flex items-center gap-3 mb-6 w-fit hover:text-accent hover:font-medium ${pathname === '/' || pathname === '/index' ? 'text-accent font-medium' : 'text-gray-400'}`}>
              <AiOutlineDashboard className='text-xl' />
              Overview
            </Link>
            <Link to='/history' className={`flex items-center gap-3 mb-6 w-fit hover:text-accent hover:font-medium ${pathname === '/history' ? 'text-accent font-medium' : 'text-gray-400'}`}>
              <AiOutlineClockCircle className='text-xl' />
              History
            </Link>
            <p onClick={() => seteOpenAddTransactionModal(true)} className='flex items-center gap-3 w-fit text-gray-400 hover:text-accent hover:font-medium cursor-pointer'>
              <HiOutlineDocumentAdd className='text-xl' />
              Add Transaction
            </p>
          </div>
        </div>
        <div className='border-t border-gray-700 pt-5'>
          <div onClick={handleLogout} className='flex items-center gap-3 text-gray-400 cursor-pointer w-fit hover:text-accent hover:font-medium'>
            <MdLogout className='text-xl' />
            Logout
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

export default Sidebar