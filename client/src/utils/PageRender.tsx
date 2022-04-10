import { createElement } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from './../components/general/NotFound'

const generatePage = (pageName: string) => {
  const component = () => require(`./../pages/${pageName}`).default
  
  try {
    return createElement(component())
  } catch (err: any) {
    return <NotFound />
  }
}

const PageRender = () => {
  const { page, id } = useParams()
  let pageName = id ? `${page}/[id]` : `${page}`
  return generatePage(pageName)
}

export default PageRender