import { JobType } from "../../types/types";
import { Flag, Icon, Divider, Popup } from "semantic-ui-react";
import React from "react";
{/* 
// @ts-ignore */}
import TimeAgo from "javascript-time-ago";
{/* 
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
      <div className="row">
        <div className="column">
          <a href={props.job.link} rel="noopener" target="_blank">
            {props.job.text}
          </a>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Popup
            content={
              "External links are jobs we find online and share with our users. Clicking an external link will take you to an external website. This link will take you to "  + props.job.website + '.'
            }
            trigger={
              <div>
                <Icon style={{ color: "gray" }} name="question" />
                <span style={{ fontSize: "12px", color: "gray" }}>
                  <strong>External Link</strong>
                </span>
              </div>
            }
          />
          <p>
            <Icon name="at" />
            <a
              style={{ fontSize: "16px" }}
              href={props.job.websiteLink}
              rel="noopener"
              target="_blank"
            >
              {props.job.website}
            </a>
            <br />
            {/* 
      // @ts-ignore */}
            <Flag name={props.job.location.toLowerCase()} />
            {props.job.location}
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
          font-size: 24px;
          line-height: 22px;
          color: #0074d9;
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
      `}</style>
    </div>
  );
};

export default ExternalResult;
