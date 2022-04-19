import { numberFormatter } from './../../utils/numberFormatter'
import { ITransactionData } from './../../redux/types/transactionTypes'
import { BsFillArrowDownLeftCircleFill, BsFillArrowUpRightCircleFill } from 'react-icons/bs'

interface IProps {
  transaction: ITransactionData
}

const TransactionDetail: React.FC<IProps> = ({ transaction }) => {
  return (
    <div className='flex items-center justify-between text-sm mb-4'>
      <div className='flex items-center gap-4 w-fit'>
        <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center'>
          {
            transaction.type === 'expense'
            ? <BsFillArrowDownLeftCircleFill className='text-red-400 text-xl' />
            : <BsFillArrowUpRightCircleFill className='text-green-400 text-xl' />
          }
        </div>
        <p>{transaction.purpose}</p>
      </div>
      <div>
        {numberFormatter(transaction.amount)},00
      </div>
    </div>
  )
}

export default TransactionDetail