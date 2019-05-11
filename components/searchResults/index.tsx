import { JobType } from '../../types/types';
import InternalResult from './internalResult';
import ExternalResult from './externalResult';

interface searchProps {
  results: any,
}



const SearchResults = (props: searchProps) => {
  const jobs = props.results.response;
  return (
    <div className="results">
      {jobs.length > 0 ? <p>We found {jobs.length} jobs</p> : null}
      {jobs.map((job: JobType, index: number) => {
        return job.externalPosting ? <ExternalResult job={job} key={index}/> : <InternalResult job={job} key={index}/>
      } )}
      {/* 
      // @ts-ignore */}
    <style jsx>{`
      .results {
        text-align: center;
        margin-top: 20px;
      }
    `}</style>
    </div>
  )
}

export default SearchResults;