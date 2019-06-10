import { JobType } from "../../types/types";
import InternalResult from "./internalResult";
import ExternalResult from "./externalResult";

interface searchProps {
  results: JobType[];
}

const SearchResults = (props: searchProps) => {
  const jobs = props.results;
  return props.results ? (
    <div className="results">
      <p>
        {jobs.length === 50
          ? "recently posted jobs"
          : jobs.length === 0
          ? "we found no jobs. try searching again"
          : `we found ${jobs.length} jobs`}
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
