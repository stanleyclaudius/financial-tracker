import { AiOutlineClose } from 'react-icons/ai'
import NewsCard from './NewsCard'

interface IProps {
  newsRef: React.MutableRefObject<HTMLDivElement>
  openNews: boolean
  setOpenNews: React.Dispatch<React.SetStateAction<boolean>>
}

const NewsContainer: React.FC<IProps> = ({ newsRef, openNews, setOpenNews }) => {
  return (
    <div ref={newsRef} className={`lg:block flex-1 lg:bg-primary lg:border-l lg:border-gray-700 px-8 py-10 transition-all lg:static lg:right-0 fixed ${openNews ? 'right-0' : '-right-[5000px]'} top-0 bottom-0 blue-glassmorphism`}>
      <div className='border-b border-gray-700 pb-4 mb-7 text-gray-300 flex items-center justify-between'>
        <h1 className='lg:text-lg'>Finance News</h1>
        <AiOutlineClose onClick={() => setOpenNews(false)} className='cursor-pointer lg:hidden block' />
      </div>
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