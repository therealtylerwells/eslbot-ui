import React, { Component } from "react";
import { Form, Button, Flag, Message, Dimmer, Loader } from "semantic-ui-react";
import { Row, Column } from "../common/grid";
import { matchStateToTerm, getStates } from "../../utils/countrySelect";
import Autocomplete from "react-autocomplete";

interface editJobProps {
  job: any;
  isEditMode: any;
  handleCancelEdit: any;
  handleSaveEdit: any;
}

interface editJobState {}

class EditJob extends Component<editJobProps, editJobState> {
  state = {
    schoolName: "",
    email: "",
    country: "",
    city: "",
    jobDescription: '',
    errors: false,
    loading: false,
    jobTitle: '',
  };

  componentDidMount = async() => {
    const { city, country, email, jobTitle, jobDescription, name, _id } = this.props.job;
    this.setState({
      _id,
      city,
      country,
      email,
      jobTitle,
      jobDescription,
      schoolName: name,
    })
  }

  render() {
    return this.props.isEditMode ? (
      <Form>
        <Row>
          <Column>
            <Form.Input
              placeholder="School or Company Name"
              value={this.state.schoolName}
              label="School or Company Name"
              onChange={() =>
                this.setState({
                  schoolName: (event!.target as HTMLInputElement).value
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
            <span
              style={{
                color: "rgba(0,0,0,.87)",
                fontSize: ".92857143em",
                fontWeight: "bold"
              }}
            >
              Country
            </span>
            <br />
            {/* 
                // @ts-ignore */}
            <Autocomplete
              value={this.state.country}
              inputProps={{ id: "states-autocomplete" }}
              wrapperStyle={{ position: "relative", display: "inline-block" }}
              items={getStates()}
              autoHighlight
              getItemValue={(item: any) => item.name}
              shouldItemRender={matchStateToTerm}
              onChange={(event: any, country: any) => {
                // using event so typescript will leave me alone wtf typescript
                typeof event;
                this.setState({ country });
              }}
              onSelect={(country: string) => this.setState({ country })}
              renderMenu={(children: any) => (
                <div className="menu">{children}</div>
              )}
              renderItem={(item: any, isHighlighted: any) => (
                <div
                  className={`item ${isHighlighted ? "item-highlighted" : ""}`}
                  key={item.abbr}
                >
                  <Flag name={item.abbr} />
                  {item.name}
                </div>
              )}
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
          <Button onClick={() => this.props.handleSaveEdit(this.state)}>Save</Button>
          <Button onClick={this.props.handleCancelEdit}>Cancel</Button>
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
