import { useState, useEffect, useRef } from 'react'
import HeadInfo from './../utils/HeadInfo'
import Navbar from './../components/general/Navbar'
import NewsContainer from './../components/general/NewsContainer'
import Sidebar from './../components/general/Sidebar'
import Dashboard from './../components/home/Dashboard'

const Home = () => {
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
      <HeadInfo title='Home' />
      <Navbar setOpenNews={setOpenNews} />
      <div className='flex text-white h-[100vh] max-h-[100vh] overflow-y-hidden'>
        <Sidebar />
        <Dashboard />
        <NewsContainer newsRef={newsRef} openNews={openNews} setOpenNews={setOpenNews} />
      </div>
    </>
  )
}

export default Home