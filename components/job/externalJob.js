import Layout from '../common/layout';

const externalJob = (props) => {
  return (
    <Layout>
      <p>External Job</p>
      <p>{props.job}</p>
    </Layout>
  )
}

export default externalJob;