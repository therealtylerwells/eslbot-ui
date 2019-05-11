import { Table } from "semantic-ui-react";
import JobRow from './jobRow';

const MyJobs = (props: any) => {
  const jobs = props.jobs;
  return jobs ? (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ 'textAlign': 'center' }}>Posted Date</Table.HeaderCell>
          <Table.HeaderCell>City</Table.HeaderCell>
          <Table.HeaderCell>Country</Table.HeaderCell>
          <Table.HeaderCell>Job Title</Table.HeaderCell>
          <Table.HeaderCell>Job Description</Table.HeaderCell>
          <Table.HeaderCell style={{ 'textAlign': 'center' }}>View</Table.HeaderCell>
          <Table.HeaderCell style={{ 'textAlign': 'center' }}>Renew</Table.HeaderCell>
          <Table.HeaderCell style={{ 'textAlign': 'center' }}>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {jobs.map((job: any, index: number) => {
          return (
            <JobRow
              job={job}
              key={index}
              handleDelete={props.handleDelete}
              handleRenew={props.handleRenew}
            />
          )
        })}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='9'>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ) : null
}

export default MyJobs;