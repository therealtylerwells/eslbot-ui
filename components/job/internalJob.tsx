import Layout from '../common/layout';
import { Divider, Icon, Flag } from 'semantic-ui-react';
{/* 
// @ts-ignore */}
import TimeAgo from 'javascript-time-ago'
{/* 
// @ts-ignore */}
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

const internalJob = (props: any) => {
  console.log('jobProps', props)
  return (
    <Layout>
      <div>
        <p className="jobTitle">{props.job.jobTitle}</p>
      </div>
      <div>
        <p className="jobName"><Icon name="home" />{props.job.name}
        <span className="jobLocation"><Flag style={{'marginLeft':'20px'}} name={props.job.country.toLowerCase()} />{props.job.city}, {props.job.country}<br/><Icon name="clock" />Posted {new Date(props.job.createdAt).toLocaleDateString('en-US')}</span></p>
      </div>
      <div>
      </div>
      <Divider />
      <div>
        <p style={{ 'whiteSpace': 'pre' }}>{props.job.jobDescription}</p>
      </div>
      <style jsx>{`
        .jobTitle {
          font-size: 36px;
        }
        .jobName {
          font-size: 20px;
        }
        .jobLocation {
          font-size: 14px;
          line-height: 28px;
        }
      `}</style>
    </Layout>
  )
}

export default internalJob;