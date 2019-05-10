import Layout from '../common/layout';

const internalJob = (props) => {
  return (
    <Layout>
      <p>Internal Job</p>
      <p>{props.job.city}</p>
    </Layout>
  )
}

export default internalJob;