import { dateFormatter } from '../../utils/dateFormatter'
import { ITransaction } from './../../redux/types/transactionTypes'
import TransactionDetail from './TransactionDetail'

interface IProps {
  item: ITransaction
}

const TransactionContainer: React.FC<IProps> = ({ item }) => {
  return (
    <div className='mb-6'>
      <p className='font-medium text-gray-400'>{dateFormatter(`${item?.date}`)}</p>
      <div className='mt-4 mb-3'>
        {
          item?.data.map(transaction => (
            <TransactionDetail key={transaction.id} transaction={transaction} />
          ))
        }
      </div>
    </div>
  )
}

export default TransactionContainer