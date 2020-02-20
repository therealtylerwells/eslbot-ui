import { JobType } from "../../types/types";
import InternalResult from "./internalResult";
import ExternalResult from "./externalResult";

interface searchProps {
  results: JobType[];
  docCount: number | undefined;
}

const SearchResults = (props: searchProps) => {
  const jobs = props.results;
  return (
    <div className="results">
      <p>
        {jobs.length === 50
          ? `${props.docCount} jobs have been posted in the past 90 days. You're viewing the latest 50`
          : jobs.length === 0
          ? "we found no jobs. try searching again"
          : `we found ${jobs.length} jobs`}
      </p>
      {jobs.map((job: JobType, index: number) => {
        return !job.hasOwnProperty("externalPosting") ? <ExternalResult job={job} key={index} /> : <InternalResult job={job} key={index} />;
      })}
      {/* 
      // @ts-ignore */}
      <style jsx>{`
        .results {
          text-align: center;
        }
      `}</style>
    </div>
  ) 
};

export default SearchResults;
