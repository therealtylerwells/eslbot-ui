import Result from './result';

interface searchProps {
  results: any,
}



const SearchResults = (props: searchProps) => {
  return (
    <div className="results">
      {props.results.length > 0 ? <p>We found {props.results.length} jobs</p> : null}
      {/* TODO: Fix type for job */}
      {props.results.map((job: any, index: number) => <Result job={job} key={index}/> )}
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