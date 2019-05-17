import { Divider, Icon, Flag, Button } from 'semantic-ui-react';
{/* 
// @ts-ignore */}
import TimeAgo from 'javascript-time-ago'
{/* 
// @ts-ignore */}
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

const internalJob = (props: any) => {
  return (
    <div>
      <div>
        <p className="jobTitle">{props.job.jobTitle}</p>
      </div>
      <div>
        <span className="jobName"><Icon name="home" />{props.job.name}</span>
        <span className="jobLocation"><Flag style={{'marginLeft':'6px'}} name={props.job.country.toLowerCase()} />{props.job.city}, {props.job.country}</span>
        <Icon name="clock" style={{'marginLeft':'6px'}}/><span className="postedDate">Posted {new Date(props.job.updatedAt).toLocaleDateString('en-US')}</span>
      </div>
      <Divider />
      <Button primary onClick={props.handleApply}>Apply Now</Button>
      <div style={{'margin':'10px 0'}}>
        <p style={{ 'whiteSpace': 'pre-wrap' }}>{props.job.jobDescription}</p>
      </div>
      <Button primary onClick={props.handleApply}>Apply Now</Button>
      <style jsx>{`
        .jobTitle {
          font-size: 38px;
        }
        .jobName {
          font-size: 20px;
          font-weight: bold;
        }
        .jobLocation {
          font-size: 20px;
          line-height: 26px;
        }
        .postedDate {
          font-size: 20px;
        }
      `}</style>
    </div>
  )
}

export default internalJob;