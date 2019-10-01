import Link from "next/link";
import { JobType } from "../../types/types";
import { Flag, Icon, Divider } from "semantic-ui-react";
{
  /* 
// @ts-ignore */}
import TimeAgo from "javascript-time-ago";
{
  /* 
// @ts-ignore */}
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

interface internalResultProps {
  job: JobType;
  key?: number;
}

const InternalResult = (props: internalResultProps) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <div className="result-container">
      <div className="row">
        <div className="column">
          <Link href={{ pathname: "/job", query: { id: props.job._id } }} as={`/job/${props.job._id}`}>
            <a>{props.job.jobTitle}</a>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <p>
            <Icon name="briefcase" /> {props.job.name}
            <br />
            {/* 
      // @ts-ignore */}
            <Flag name={props.job.country.toLowerCase()} />
            {props.job.city}, {props.job.country}
            <br />
            <Icon name="calendar" />
            {timeAgo.format(new Date(props.job.updatedAt as any))}
          </p>
        </div>
      </div>
      {/* 
      // @ts-ignore */}
      <Divider />
      <style jsx>{`
        a {
          font-size: 18px;
          color: #0074d9;
        }
        .result-container {
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }
        .row {
          display: flex;
          flex-direction: row;
          padding-bottom: 12.5px;
        }
        .column {
          flex: 1;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default InternalResult;
