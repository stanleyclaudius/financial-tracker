import { MdFilterAlt } from "react-icons/md"

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
        <div className='mb-9'>
          <p className='text-gray-400 font-medium'>31 Mar 2020</p>
          <div className='mt-4 mb-3'>
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
            <div className='grid grid-cols-4 text-sm'>
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
          </div>
        </div>
        <div className='mb-9'>
          <p className='text-gray-400 font-medium'>31 Mar 2020</p>
          <div className='mt-4 mb-3'>
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
            <div className='grid grid-cols-4 text-sm'>
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
          </div>
        </div>
        <div className='mb-9'>
          <p className='text-gray-400 font-medium'>31 Mar 2020</p>
          <div className='mt-4 mb-3'>
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
            <div className='grid grid-cols-4 text-sm'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction