import { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import HeadInfo from './../../utils/HeadInfo'

interface IProps {
  title: string
  children: React.ReactElement
}

const Layout: React.FC<IProps> = ({ title, children }) => {
  const [openNews, setOpenNews] = useState(false)

  const newsRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openNews && newsRef.current && !newsRef.current.contains(e.target as Node)) {
        setOpenNews(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openNews])

  return (
    <>
      <HeadInfo title={title} />
      <Navbar />
      <div className='flex text-white h-[100vh] max-h-[100vh] overflow-y-hidden'>
        <Sidebar />
        {children}
      </div>
    </>
  )
}

export default Layout