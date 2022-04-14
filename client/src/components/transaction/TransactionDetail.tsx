const TransactionDetail = () => {
  return (
    <div className='grid grid-cols-4 text-sm mb-4'>
      <div className='flex items-center gap-4'>
        <div className='w-10 h-10 rounded-full bg-secondary'></div>
        <p>Car Salon</p>
      </div>
      <div className='flex items-center justify-center'>
        IDR 75.000,00
      </div>
      <div className='text-center flex items-center justify-center'>
        IDR 24.925.000,00
      </div>
      <div className='flex items-center justify-end'>
        10:00
      </div>
    </div>
  )
}

export default TransactionDetail