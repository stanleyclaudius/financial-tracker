import { MdFilterAlt } from 'react-icons/md'
import TransactionContainer from './../transaction/TransactionContainer'

const Transaction = () => {
  return (
    <div className='flex-[4] bg-primary p-10'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-xl'>Previous Transaction</h1>
        <button className='bg-gray-700 hover:bg-gray-800 transition-[background] rounded-md px-5 py-2 flex items-center gap-3'>
          <MdFilterAlt />
          Filter
        </button>
      </div>
      <div className='h-[80vh] overflow-auto hide-scrollbar'>
        <TransactionContainer />
        <TransactionContainer />
        <TransactionContainer />
      </div>
    </div>
  )
}

export default Transaction