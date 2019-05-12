import Layout from '../common/layout';
import { Header } from 'semantic-ui-react'

const externalJob = (props: any) => {
  return (
    <Layout>
      <Header>{props.job.name}</Header>
    </Layout>
  )
}

export default externalJob;