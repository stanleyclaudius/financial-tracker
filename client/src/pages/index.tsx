import NewsContainer from "../components/general/NewsContainer"
import Sidebar from "../components/general/Sidebar"
import Dashboard from "../components/home/Dashboard"

const Home = () => {
  return (
    <div className='flex text-white h-[100vh] max-h-[100vh] overflow-y-hidden'>
      <Sidebar />
      <Dashboard />
      <NewsContainer />
    </div>
  )
}

export default Home