import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdFilterAlt } from 'react-icons/md'
import TransactionContainer from './../transaction/TransactionContainer'
import { ITransaction } from '../../redux/types/transactionTypes'
import { RootStore } from '../../utils/Interface'
import { getAllTransactions } from '../../redux/actions/transactionActions'
import Loader from '../general/Loader'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { getDataAPI } from '../../utils/fetchData'

interface IYear {
  year: string
}

const Transaction = () => {
  const [years, setYears] = useState<IYear[]>([])
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedYear, setSelectedYear] = useState(`${new Date().getFullYear()}`)

  const filterRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, alert, chart, history } = useSelector((state: RootStore) => state)

  const handleSelectYear = (year: string) => {
    setSelectedYear(year)
    setOpenFilter(false)
  }

  useEffect(() => {
    if (auth.token)
      dispatch(getAllTransactions(auth.token, selectedYear))
  }, [dispatch, auth.token, selectedYear])

  useEffect(() => {
    setTransactions(history)
  }, [history])

  useEffect(() => {
    const fetchYearData = async() => {
      const tokenExpResult = await checkTokenExp(auth.token!, dispatch)
      const accessToken = tokenExpResult ? tokenExpResult : auth.token
      const res = await getDataAPI('transaction/year', accessToken)
      setYears(res.data.years)
    }

    if (chart.incomes.length > 0 || chart.expenses.length > 0) {
      fetchYearData()
    }
  }, [auth.token, dispatch, chart.incomes, chart.expenses])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openFilter && filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openFilter])

  return (
    <div className='flex-[4] bg-primary p-10'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-xl'>Previous Transaction</h1>
        {
          years.length > 0 &&
          <div className='flex items-center gap-4'>
            <div ref={filterRef} className='relative'>
              <button onClick={() => setOpenFilter(!openFilter)} className='bg-gray-700 hover:bg-gray-800 transition-[background] rounded-md px-5 py-2 flex items-center gap-3'>
                <MdFilterAlt />
                Filter
              </button>
              <div className={`absolute top-[100%] mt-4 right-0 rounded-md w-[100px] ${openFilter ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-gray-700 shadow-xl`}>
                {
                  years.map((item, idx) => (
                    <p
                      key={item.year}
                      onClick={() => handleSelectYear(item.year)}
                      className={`${idx === 0 && idx === years.length - 1 ? 'rounded-md' : idx === 0 ? 'rounded-t-md' : idx === years.length - 1 ? 'rounded-b-md' : undefined} ${idx !== years.length - 1 ? 'border-b border-gray-500' : undefined} text-center p-2 cursor-pointer hover:bg-gray-600 ${selectedYear === item.year ? 'bg-gray-600' : undefined}`}
                    >
                    {item.year}
                  </p>
                  ))
                }
              </div>
            </div>
            {selectedYear}
          </div>
        }
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