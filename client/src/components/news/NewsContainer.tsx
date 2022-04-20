import { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { INewsData } from './../../redux/types/newsTypes'
import { RAPID_API_KEY } from './../../utils/constant'
import axios from 'axios'
import Loader from './../general/Loader'
import NewsCard from './NewsCard'

interface IProps {
  newsRef: React.MutableRefObject<HTMLDivElement>
  openNews: boolean
  setOpenNews: React.Dispatch<React.SetStateAction<boolean>>
}

const NewsContainer: React.FC<IProps> = ({ newsRef, openNews, setOpenNews }) => {
  const [news, setNews] = useState<INewsData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchNewsData = async() => {
      setLoading(true)
      const res = await axios.get('https://mboum-finance.p.rapidapi.com/ne/news', {
        headers: {
          'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
          'X-RapidAPI-Key': RAPID_API_KEY
        }
      })
      setLoading(false)
      setNews(res.data)
    }

    fetchNewsData()
  }, [])

  return (
    <div ref={newsRef} className={`lg:block flex-1 lg:bg-primary lg:border-l lg:border-gray-700 px-8 py-10 transition-all lg:static lg:right-0 fixed ${openNews ? 'right-0' : '-right-[5000px]'} top-0 bottom-0 blue-glassmorphism`}>
      <div className='border-b border-gray-700 pb-4 mb-7 text-gray-300 flex items-center justify-between'>
        <h1 className='lg:text-lg'>Finance News</h1>
        <AiOutlineClose onClick={() => setOpenNews(false)} className='cursor-pointer lg:hidden block' />
      </div>
      <div className='max-h-[80vh] overflow-auto hide-scrollbar'>
        {
          loading
          ? <Loader size='xl' />
          : (
            <>
              {
                news.map((item, idx) => (
                  <NewsCard key={idx} item={item} />
                ))
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default NewsContainer