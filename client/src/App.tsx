import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages'
import PageRender from './utils/PageRender'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:id' element={<PageRender />} />
      </Routes>
    </Router>
  )
}

export default App