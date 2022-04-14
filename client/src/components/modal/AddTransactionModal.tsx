import { useState } from 'react'
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai'
import { MdAttachMoney } from 'react-icons/md'
import { BsPatchQuestion } from 'react-icons/bs'
import { FormSubmit, InputChange } from '../../utils/Interface'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  modalRef: React.MutableRefObject<HTMLDivElement>
}

const AddTransactionModal: React.FC<IProps> = ({ openModal, setOpenModal, modalRef }) => {
  const [transactionData, setTransactionData] = useState({
    amount: '',
    purpose: '',
    time: '',
    type: ''
  })

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setTransactionData({ ...transactionData, [name]: value })
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    console.log(transactionData)
  }

  return (
    <div className={`${openModal ? 'opacity-100' : 'opacity-0'} ${openModal ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex justify-center items-center px-5`}>
      <div
        ref={modalRef}
        className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform w-full max-w-[500px] bg-gray-800 shadow-xl rounded-md`}
      >
        <div className='border-b border-gray-500 flex items-center justify-between p-5'>
          <h1 className='text-lg'>Add Transaction</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='px-5 py-7'>
          <form onSubmit={handleSubmit}>
            <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
              <MdAttachMoney className='text-xl mr-3' />
              <input type='text' name='amount' autoComplete='off' placeholder='Amount' value={transactionData.amount} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
            </div>
            <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
              <BsPatchQuestion className='text-xl mr-3' />
              <input type='text' name='purpose' autoComplete='off' placeholder='Purpose' value={transactionData.purpose} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
            </div>
            <div className='flex items-center border border-gray-600 rounded-md p-3 mb-8'>
              <AiOutlineClockCircle className='text-xl mr-3' />
              <input type='time' name='time' autoComplete='off' placeholder='Time' value={transactionData.time} onChange={handleChange} className='w-full bg-transparent text-sm outline-none' />
            </div>
            <div className='flex items-center justify-between gap-6'>
              <button onClick={() => setTransactionData({ ...transactionData, type: 'income' })} className='bg-accent w-full flex-1 py-3 hover:bg-accentDark transition-[background]'>Add as Income</button>
              <button onClick={() => setTransactionData({ ...transactionData, type: 'expense' })} className='bg-red-400 w-full flex-1 py-3 hover:bg-red-500 transition-[background]'>Add as Expense</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionModal