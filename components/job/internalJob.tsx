import { Divider, Icon, Flag } from 'semantic-ui-react';
{/* 
// @ts-ignore */}
import TimeAgo from 'javascript-time-ago'
{/* 
// @ts-ignore */}
import en from 'javascript-time-ago/locale/en'
import ApplyModal from './applyModal';

TimeAgo.addLocale(en)

const internalJob = (props: any) => {
  return (
    <div>
      <div>
        <p className="jobTitle">{props.job.jobTitle}</p>
      </div>
      <div>
        <span className="jobName"><Icon name="home" />{props.job.name}</span>
        <span className="jobLocation"><Flag style={{'marginLeft':'12px'}} name={props.job.country.toLowerCase()} />{props.job.city}, {props.job.country}</span><br/>
        <p className="postedDate"><Icon name="clock" style={{'marginLeft':'3px', marginTop: '4px'}}/>Posted {new Date(props.job.updatedAt).toLocaleDateString('en-US')}</p>
      </div>
      <Divider />
      <ApplyModal style={{
        position: 'absolute',
        top: '30px',
        display: 'flex',
      }}></ApplyModal>
      <div style={{'margin':'10px 0'}}>
        <p style={{ 'whiteSpace': 'pre-wrap' }}>{props.job.jobDescription}</p>
      </div>
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
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}

export default internalJob;