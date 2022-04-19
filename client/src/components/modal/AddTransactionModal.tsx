import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAttachMoney } from 'react-icons/md'
import { BsPatchQuestion } from 'react-icons/bs'
import { FormSubmit, InputChange, RootStore } from './../../utils/Interface'
import { ALERT } from '../../redux/types/alertTypes'
import { insertTransaction } from '../../redux/actions/transactionActions'
import Loader from '../general/Loader'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  modalRef: React.MutableRefObject<HTMLDivElement>
}

const AddTransactionModal: React.FC<IProps> = ({ openModal, setOpenModal, modalRef }) => {
  const [transactionData, setTransactionData] = useState({
    amount: 0,
    purpose: '',
    type: ''
  })
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setTransactionData({ ...transactionData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!transactionData.amount || !transactionData.purpose) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Please provide amount and purpose of transaction.'
        }
      })
    }

    if (transactionData.purpose.length > 255) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Transaction purpose should be less than 255 characters.'
        }
      })
    }

    if (transactionData.amount < 1000) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: 'Transaction amoount should be at least Rp1.000,00'
        }
      })
    }

    setLoading(true)
    await dispatch(insertTransaction(transactionData, auth.token!))
    setLoading(false)
    setTransactionData({ amount: 0, purpose: '', type: '' })
    setOpenModal(false)
  }

  return (
    <div className={`${openModal ? 'opacity-100' : 'opacity-0'} ${openModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5`}>
      <div
        ref={modalRef}
        className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-gray-800 shadow-xl rounded-md text-white`}
      >
        <div className='border-b border-gray-500 flex items-center justify-between p-5'>
          <h1 className='text-lg'>Add Transaction</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='px-5 py-7'>
          <form onSubmit={handleSubmit}>
            <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
              <MdAttachMoney className='text-xl mr-3' />
              <input type='number' name='amount' autoComplete='off' placeholder='Amount' value={transactionData.amount} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
            </div>
            <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
              <BsPatchQuestion className='text-xl mr-3' />
              <input type='text' name='purpose' autoComplete='off' placeholder='Purpose' value={transactionData.purpose} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
            </div>
            <div className='flex items-center justify-between gap-6'>
              <button
                onClick={() => setTransactionData({ ...transactionData, type: 'income' })}
                className={`${loading ? 'bg-gray-300 hover:bg-gray-300 cursor-auto' : 'bg-accent hover:bg-accentDark cursor-pointer'} w-full flex-1 py-3 transition-[background]`}
              >
                {
                  loading
                  ? <Loader />
                  : 'Add as Income'
                }
              </button>
              <button
                onClick={() => setTransactionData({ ...transactionData, type: 'expense' })}
                className={`${loading ? 'bg-gray-300 hover:bg-gray-300 cursor-auto' : 'bg-red-400 hover:bg-red-500 cursor-pointer'} w-full flex-1 py-3 transition-[background]`}
              >
                {
                  loading
                  ? <Loader />
                  : 'Add as Expense'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionModal