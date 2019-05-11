import Link from 'next/link'
import { JobType } from '../../types/types';

interface internalResultProps {
  job: JobType,
  key: number,
}

const InternalResult = (props: internalResultProps) => {
  return (
    <div className="result-container">
      <div className="row">
        <div className="column">
          {/* <p><strong>External Link</strong></p> */}
          <Link href={{ pathname: '/job', query: { id: props.job._id } }} as={`/job/${props.job._id}`}><a>View</a></Link>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>{props.job.jobTitle}</p>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>{props.job.country}</p>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>Posted {new Date(props.job.createdAt as any).toLocaleDateString('en-US')}</p>
        </div>
      </div>
      {/* 
      // @ts-ignore */}
      <style jsx>{`
      .result-container {
        display: flex;
        flex-direction: column;
        border-bottom: .5px solid lightgray;
        height: 150px;
        margin: 0 0 20px 0;
        padding: 20px 0 20px 5px;
      }
      .row {
        display: flex;
        flex-direction: row;
        padding-bottom: 10px;
      }
      .column {
        flex: 1;
        text-align: left;
      }
    `}</style>
    </div>
  )
}

export default InternalResult;