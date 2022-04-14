import { Line, Chart } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import TransactionContainer from './../transaction/TransactionContainer'

ChartJS.register(...registerables)

const Dashboard = () => {
  return (
    <div className='flex-[4] bg-primary p-10 flex flex-col gap-5'>
      <div className='flex-1 lg:flex-[2] flex flex-col gap-7'>
        <div>
          <p className='text-gray-400'>Current Balance</p>
          <h1 className='text-3xl lg:text-4xl font-semibold mt-5'>IDR 25.000.000,00</h1>
        </div>
        <div className='flex-1 bg-secondary rounded-md'>
          <Line
            height={100}
            options={{ maintainAspectRatio: false }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May'],
              datasets: [
                {
                  label: 'Income',
                  data: [200, 300, 300, 350, 50],
                  backgroundColor: 'green',
                  borderColor: '#3FB967'
                },
                {
                  label: 'Expense',
                  data: [50, 400, 80, 100, 350],
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
        <TransactionContainer />
        <TransactionContainer />
      </div>
    </div>
  )
}

export default Dashboard