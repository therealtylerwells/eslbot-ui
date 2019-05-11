import Layout from '../common/layout';

const internalJob = (props: any) => {
  return (
    <Layout>
      <p>Internal Job</p>
      <p>{props.job.city}</p>
    </Layout>
  )
}

export default internalJob;