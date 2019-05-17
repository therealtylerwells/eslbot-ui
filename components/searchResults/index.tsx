import { JobType } from "../../types/types";
import InternalResult from "./internalResult";
import ExternalResult from "./externalResult";

interface searchProps {
  results: any;
}

const SearchResults = (props: searchProps) => {
  const jobs = props.results;
  return props.results ? (
    <div className="results">
      <p>
        {jobs.length === 50
          ? "Recently posted jobs"
          : jobs.length === 0
          ? "We found no jobs. Try searching again"
          : `We found ${jobs.length} search reuslts`}
      </p>
      {jobs.map((job: JobType, index: number) => {
        return !job.hasOwnProperty("externalPosting") ? (
          <ExternalResult job={job} key={index} />
        ) : (
          <InternalResult job={job} key={index} />
        );
      })}
      {/* 
      // @ts-ignore */}
      <style jsx>{`
        .results {
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  ) : null;
};

export default SearchResults;
