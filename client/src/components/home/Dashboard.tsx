import { useState, useEffect, useRef } from 'react'
import { MdFilterAlt } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Line, Chart } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import { IYear, RootStore } from './../../utils/Interface'
import { getLatestTransactions, getMonthlyTransactions } from './../../redux/actions/transactionActions'
import { dateFormatter, numberFormatter } from './../../utils/formatter'
import { getBalance } from './../../redux/actions/balanceActions'
import { getDataAPI } from './../../utils/fetchData'
import { checkTokenExp } from './../../utils/checkTokenExp'
import TransactionContainer from './../transaction/TransactionContainer'
import Loader from './../general/Loader'

ChartJS.register(...registerables)

const Dashboard = () => {
  const [years, setYears] = useState<IYear[]>([])
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedYear, setSelectedYear] = useState(`${new Date().getFullYear()}`)

  const filterRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth, chart, alert, latestTransaction, balance } = useSelector((state: RootStore) => state)
  
  const handleSelectYear = (year: string) => {
    setSelectedYear(year)
    setOpenFilter(false)
  }

  useEffect(() => {
    if (auth.token)
      dispatch(getMonthlyTransactions(auth.token, selectedYear))
  }, [dispatch, auth.token, selectedYear])

  useEffect(() => {
    if (auth.token) {
      dispatch(getLatestTransactions(auth.token!))
      dispatch(getBalance(auth.token!))
    }
  }, [auth.token, dispatch])

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
    <div className='flex-[4] bg-primary p-10 flex flex-col gap-5'>
      <div className='flex-1 lg:flex-[2] flex flex-col gap-7'>
        <div>
          <p className='text-gray-400'>Current Balance</p>
          <div className='flex md:items-center flex-col md:flex-row justify-between md:mt-5 mt-3'>
            <h1 className='text-3xl lg:text-4xl font-semibold'>{numberFormatter.toIDRCurrency(balance.balance)},00</h1>
            {
              years.length > 0 &&
              <div className='flex items-center gap-4 md:mt-0 mt-5'>
                <div ref={filterRef} className='relative'>
                  <button onClick={() => setOpenFilter(!openFilter)} className='flex items-center gap-4 bg-gray-700 hover:bg-gray-800 transition-[background] rounded-md px-4 py-2'>
                    <MdFilterAlt />
                    Filter
                  </button>
                  <div className={`absolute top-[100%] right-0 ${openFilter ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-gray-700 rounded-md shadow-xl w-[100px] mt-4`}>
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
        </div>
        <div className='flex-1 bg-secondary rounded-md'>
          <Line
            height={100}
            options={{ maintainAspectRatio: false }}
            data={{
              labels: chart.incomes.length > chart.expenses.length ? chart.incomes.map(item => dateFormatter.getMonthNameFromDate(item.month)) : chart.expenses.map(item => dateFormatter.getMonthNameFromDate(item.month)),
              datasets: [
                {
                  label: 'Income',
                  data: chart.incomes.map(item => item.sum),
                  backgroundColor: 'green',
                  borderColor: '#3FB967'
                },
                {
                  label: 'Expense',
                  data: chart.expenses.map(item => item.sum),
                  backgroundColor: '#E02F2F',
                  borderColor: '#FF6565'
                }
              ]
            }}
          />
        </div>
      </div>
      <div className='flex-1 overflow-auto hide-scrollbar'>
        <p className='text-accent font-medium mb-4'>Latest Transaction</p>
        {
          alert.loading
          ? <Loader />
          : (
            <>
              {
                latestTransaction.map((item, idx) => (
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

export default Dashboard