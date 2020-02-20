import { JobType } from "../../types/types";
import { Flag, Icon, Divider } from "semantic-ui-react";
import React from "react";
{
  /* 
// @ts-ignore */}
import TimeAgo from "javascript-time-ago";
{
  /* 
// @ts-ignore */}
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

interface externalResultProps {
  job: JobType;
  key?: number;
}

const ExternalResult = (props: externalResultProps) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <div className="result-container">
      <a className="headline" href={props.job.link} rel="noopener" target="_blank">
        {props.job.text
          ? props.job.text.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "")
          : null}
      </a>
      <div className="row">
        <div className="column">
          <p className="details">
            {/* 
      // @ts-ignore */}
            <Flag name={props.job.location.toLowerCase()} />
            {props.job.location}
            <br />
            <a className="site-link" href={props.job.websiteLink} rel="noopener" target="_blank">
              <Icon name="at" />
              {props.job.website}
            </a>
            <br />
            <Icon name="calendar" />
            {timeAgo.format(new Date(props.job.dateAdded as any))}
          </p>
        </div>
      </div>
      {/* 
      // @ts-ignore */}
      <Divider />
      <style jsx>{`
        a {
          font-family: "Poppins", sans-serif;
          text-align: left;
          width: fit-content;
        }
        .details {
          font-size: 14px;
        }
        .result-container {
          display: flex;
          flex-direction: column;
          font-size: 16px;
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
        .headline {
          font-size: 18px;
          line-height: 18px;
          margin-bottom: 4px;
        }
        .site-link {
          font-size: 14px;
          margin-right: 4px;
        }
        @media (max-width: 900px) {
          .headline {
            font-size: 18px;
          }
          .details {
            font-size: 14px;
          }
          .site-link {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default ExternalResult;
