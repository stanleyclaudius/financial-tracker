import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Line, Chart } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import TransactionContainer from './../transaction/TransactionContainer'
import { RootStore } from '../../utils/Interface'
import { getLatestTransactions, getMonthlyTransactions } from '../../redux/actions/transactionActions'
import { extractMonth } from '../../utils/dateFormatter'
import Loader from '../general/Loader'
import { getBalance } from '../../redux/actions/balanceActions'
import { numberFormatter } from '../../utils/numberFormatter'

ChartJS.register(...registerables)

const Dashboard = () => {
  const dispatch = useDispatch()
  const { auth, chart, alert, latestTransaction, balance } = useSelector((state: RootStore) => state)

  useEffect(() => {
    dispatch(getMonthlyTransactions(auth.token!))
    dispatch(getLatestTransactions(auth.token!))
    dispatch(getBalance(auth.token!))
  }, [auth.token, dispatch])
  
  return (
    <div className='flex-[4] bg-primary p-10 flex flex-col gap-5'>
      <div className='flex-1 lg:flex-[2] flex flex-col gap-7'>
        <div>
          <p className='text-gray-400'>Current Balance</p>
          <h1 className='text-3xl lg:text-4xl font-semibold mt-5'>{numberFormatter(balance.balance)},00</h1>
        </div>
        <div className='flex-1 bg-secondary rounded-md'>
          <Line
            height={100}
            options={{ maintainAspectRatio: false }}
            data={{
              labels: chart.incomes.map(item => extractMonth(item.month)),
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