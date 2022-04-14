import TransactionDetail from './TransactionDetail'

const TransactionContainer = () => {
  return (
    <div className='mb-6'>
      <p className='font-medium text-gray-400 text-sm'>31 March 2022</p>
      <div className='mt-4 mb-3'>
        <TransactionDetail />
        <TransactionDetail />
      </div>
    </div>
  )
}

export default TransactionContainer