import { Component } from 'react';
import fetch from 'isomorphic-unfetch'
import InternalJob from '../components/job/internalJob';
import ExternalJob from '../components/job/externalJob';

type jobProps = {
  data: any;
}

type jobState = {

}

class Job extends Component<jobProps, jobState> {
  render() {
    const job = this.props.data.job
    {
      return job.externalPosting ?
        <ExternalJob job={job} />
        :
        <InternalJob job={job} />
    }
  }
}

/* 
// @ts-ignore */
Job.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch('http://localhost:4000/job?jobId=' + id)
  const data = await res.json()

  return {
    data: data,
  }
}

export default Job;