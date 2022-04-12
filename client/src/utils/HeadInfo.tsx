import { Helmet } from 'react-helmet'

interface IProps {
  title: string
}

const HeadInfo: React.FC<IProps> = ({ title }) => {
  return (
    <Helmet>
      <title>Fintrack - {title}</title>
    </Helmet>
  )
}

export default HeadInfo