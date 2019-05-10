import Link from 'next/link'

interface resultProps {
  job: any,
  key: any,
}

const Result = (props: resultProps) => {
  return (
    <div className="result-container">
      <div className="row">
        <div className="column">
          {/* <p><strong>External Link</strong></p> */}
          <Link href={{ pathname: '/job', query: { id: '5cd396143a194a61d3200458'}}} as='/job/5cd396143a194a61d3200458'><a>Test</a></Link>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>{props.job.text}</p>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>{props.job.location}</p>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>Posted {new Date(props.job.dateAdded).toLocaleDateString('en-US')}</p>
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

export default Result;