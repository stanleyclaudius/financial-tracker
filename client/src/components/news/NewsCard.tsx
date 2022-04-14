const NewsCard = () => {
  return (
    <div className='flex items-center gap-4 cursor-pointer mb-7 hover:underline'>
      <div className='w-12 h-12 bg-gray-400 shrink-0'></div>
      <div>
        <h2 className='text-gray-200 mb-2'>Title Goes Here</h2>
        <p className='text-xs text-gray-400'>Lorem ipsum dolor sit amet ...</p>
      </div>
    </div>
  )
}

export default NewsCard