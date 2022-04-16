import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdFilterAlt } from 'react-icons/md'
import TransactionContainer from './../transaction/TransactionContainer'
import { ITransaction } from '../../redux/types/transactionTypes'
import { RootStore } from '../../utils/Interface'
import { getAllTransactions } from '../../redux/actions/transactionActions'
import Loader from '../general/Loader'

const Transaction = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const dispatch = useDispatch()
  const { auth, alert, history } = useSelector((state: RootStore) => state)

  useEffect(() => {
    dispatch(getAllTransactions(auth.token!))
  }, [dispatch, auth.token])

  useEffect(() => {
    setTransactions(history)
  }, [history])

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
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <>
              {
                transactions.map((item, idx) => (
                  <TransactionContainer key={idx} item={item} />
                ))
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default Transaction