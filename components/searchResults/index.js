import Result from './result';

const SearchResults = (props) => {
  return (
    <div className="results">
      {props.results.length > 0 ? <p>We found {props.results.length} jobs</p> : null}
      {props.results.map((job, index) => <Result job={job} key={index}/> )}
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