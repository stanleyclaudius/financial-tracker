import { RiNewspaperLine } from 'react-icons/ri'
import { dateFormatter } from './../../utils/formatter'
import { INewsData } from './../../redux/types/newsTypes'
import { DateFormat } from './../../utils/Interface'

interface IProps {
  item: INewsData
}

const NewsCard: React.FC<IProps> = ({ item }) => {
  return (
    <a href={item.link} rel='noreferrer' target='_blank' className='flex items-center gap-4 cursor-pointer mb-7 hover:underline'>
      <div className='w-12 h-12 border boder-gray-900 rounded-md shrink-0 flex items-center justify-center'>
        <RiNewspaperLine className='text-xl' />
      </div>
      <div>
        <h2 className='text-gray-200 mb-2'>{item.title.length > 16 ? `${item.title.substring(0, 16)} ...` : item.title}</h2>
        <p className='text-xs text-gray-400'>{dateFormatter.formatDate(new Date(item.pubDate).toLocaleDateString(), DateFormat.YearMonthDay)}</p>
      </div>
    </a>
  )
}

export default NewsCard