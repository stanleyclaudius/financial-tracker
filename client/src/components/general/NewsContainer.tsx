import NewsCard from './NewsCard'

const NewsContainer = () => {
  return (
    <div className='md:block hidden flex-1 bg-primary border-l border-gray-700 px-8 py-10'>
      <h1 className='text-lg border-b border-gray-700 pb-4 mb-7 text-gray-300'>Finance News</h1>
      <div className='max-h-[80vh] overflow-auto hide-scrollbar'>
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </div>
  )
}

export default NewsContainer