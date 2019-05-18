import { Table } from "semantic-ui-react";
import JobRow from "./jobRow";

const MyJobs = (props: any) => {
  const jobs = props.jobs;
  return jobs && !props.editMode ? (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              Posted Date
            </Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Job Title</Table.HeaderCell>
            <Table.HeaderCell>Job Description</Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              Edit
            </Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              View
            </Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              Renew
            </Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              Delete
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs.map((job: any, index: number) => {
            return (
              <JobRow
                job={job}
                key={index}
                handleDelete={props.handleDelete}
                handleRenew={() => props.handleRenew(job._id)}
                handleEdit={() => props.handleEdit(job._id)}
              />
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="10" />
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  ) : null;
};

export default MyJobs;
