import { Table, Popup, Icon } from 'semantic-ui-react';
import Link from 'next/link';

const JobRow = (props: any) => {
  const { job } = props;
  return (
    <Table.Row>
      <Table.Cell style={{ 'textAlign': 'center' }}>{new Date(job.updatedAt).toLocaleDateString()}</Table.Cell>
      <Table.Cell>{job.name}</Table.Cell>
      <Table.Cell>{job.city}</Table.Cell>
      <Table.Cell>{job.country}</Table.Cell>
      <Table.Cell>
        <Popup
          content={job.jobTitle}
          trigger={<span>{job.jobTitle.substring(0, 20)}</span>}
        />
      </Table.Cell>
      <Table.Cell>
        <Popup
          content={job.jobDescription.substring(0, 500) + '. . .'}
          trigger={<span>{job.jobDescription.substring(0, 20)}</span>}
        />
      </Table.Cell>
      <Table.Cell style={{ 'textAlign': 'center' }}>
        <Popup
          content={"Edit your job post. If your posting is two weeks old, then this will update its post date to today as well."}
          trigger={<button onClick={props.handleEdit} style={{ border: 'none', cursor: 'pointer' }}><Icon name="pencil" color="black" /></button>}
        />
      </Table.Cell>
      <Table.Cell style={{ 'textAlign': 'center' }}>
        <button style={{ border: 'none', cursor: 'pointer' }}>
          <Link href={{ pathname: '/job', query: { id: job._id } }} as={`/job/${job._id}`}>
            <a><Icon name="search" color="grey" /></a>
          </Link>
        </button>
      </Table.Cell>
      <Table.Cell style={{ 'textAlign': 'center' }}>
        <Popup
          content={"Renewing a job updates your job post's post date to today, moving it to the top of results. Jobs must be 2 weeks old before they can be renewed."}
          trigger={<button onClick={props.handleRenew} style={{ border: 'none', cursor: 'pointer' }}><Icon name="refresh" color="blue" /></button>}
        />
      </Table.Cell>
      <Table.Cell style={{ 'textAlign': 'center' }}>
        <Popup
          content={"Delete this job"}
          trigger={<button onClick={() => props.handleDelete(job._id)} style={{ border: 'none', cursor: 'pointer' }}><Icon name="trash" color="red" /></button>}
        />
      </Table.Cell>
    </Table.Row>

  )
}

export default JobRow;