import React, { Component } from "react";
import {
  Form,
  Button,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { Row, Column } from "../common/grid";
import { JobType } from "../../types/types";

interface editJobProps {
  job: JobType;
  isEditMode: boolean;
  handleCancelEdit: () => void;
  handleSaveEdit: (state: editJobState) => void;
}

interface editJobState {
  name: string;
  email: string;
  country: string;
  city: string;
  jobDescription: string;
  errors: boolean;
  loading: boolean;
  _id: string;
  jobTitle: string;
}

class EditJob extends Component<editJobProps, editJobState> {
  state = {
    name: "",
    email: "",
    country: "",
    city: "",
    jobDescription: "",
    errors: false,
    loading: false,
    jobTitle: "",
    _id: ""
  };

  componentDidMount = async () => {
    const {
      city,
      country,
      email,
      jobTitle,
      jobDescription,
      name,
      _id
    } = this.props.job;
    this.setState({
      _id: _id!,
      city: city!,
      country: country!,
      email: email!,
      jobTitle: jobTitle!,
      jobDescription: jobDescription!,
      name: name!
    });
  };

  render() {
    return this.props.isEditMode ? (
      <Form>
        <Row>
          <Column>
            <Form.Input
              placeholder="School or Company Name"
              value={this.state.name}
              label="School or Company Name"
              onChange={() =>
                this.setState({
                  name: (event!.target as HTMLInputElement).value
                })
              }
            />
          </Column>
          <Column>
            <Form.Input
              placeholder="Unable to edit email address"
              label="Your Email Address"
              value={this.state.email}
              disabled
              onChange={() =>
                this.setState({
                  email: (event!.target as HTMLInputElement).value
                })
              }
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Form.Input
              placeholder="Job Title"
              label="Job Title"
              value={this.state.jobTitle}
              onChange={() =>
                this.setState({
                  jobTitle: (event!.target as HTMLInputElement).value
                })
              }
            />
          </Column>
          <Column>
            <Form.Input
              placeholder="City"
              label="City"
              value={this.state.city}
              onChange={() =>
                this.setState({
                  city: (event!.target as HTMLInputElement).value
                })
              }
            />
          </Column>
          <Column>
            <Form.Input
              placeholder="Country"
              label="Country"
              value={this.state.country}
              onChange={() => {
                this.setState({
                  country: (event!.target as HTMLInputElement).value
                });
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Form.TextArea
              placeholder="Describe the job. Talk about stuff like salary, class size, and whatnot"
              label="Job Description"
              value={this.state.jobDescription}
              onChange={() =>
                this.setState({
                  jobDescription: (event!.target as HTMLInputElement).value
                })
              }
            />
          </Column>
        </Row>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          {this.state.errors ? (
            <Message negative>All Fields Are Required</Message>
          ) : null}
          <Button primary onClick={() => this.props.handleSaveEdit(this.state)}>
            Save
          </Button>
          <Button color="red" onClick={this.props.handleCancelEdit}>
            Cancel
          </Button>
        </div>
      </Form>
    ) : (
      <Dimmer inverted active={this.state.loading}>
        <Loader content="Loading account" />
      </Dimmer>
    );
  }
}

export default EditJob;
