import React, { Component } from "react";
import {
  Form,
  Button,
  Image,
  Icon,
  Message,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { Row, Column } from "../components/common/grid";
import Router from "next/router";
import Axios from "axios";
// @ts-ignore
import { withToastManager } from "react-toast-notifications";
import { JobType } from '../types/types';

interface IApplyProps {
  style: React.CSSProperties;
  toastManager: any;
}

interface IApplyState {
  name: string;
  email: string;
  nationality: string;
  degree: boolean | undefined;
  teachingExperience: boolean;
  currentLocation: string;
  message: string;
  job: JobType;
  loading: boolean;
  errors: boolean;
  errorMessage: string;
}

class Apply extends Component<IApplyProps, IApplyState> {
  state = {
    name: "",
    email: "",
    nationality: "",
    degree: false,
    teachingExperience: false,
    currentLocation: "",
    message: "",
    loading: false,
    errors: false,
    errorMessage: "",
    job: {
      jobTitle: "",
      name: "",
      city: "",
      country: ""
    }
  };

  componentDidMount = async () => {
    const id = Router.router!.query!.id;
    const res = await fetch("https://api.eslbot.com/job?jobId=" + id);
    const data = await res.json();
    this.setState({ job: data.job, loading: false });
  };

  handleApply = async () => {
    this.setState({ loading: true, errors: false, errorMessage: "" });

    const {
      name,
      email,
      nationality,
      degree,
      teachingExperience,
      currentLocation,
      message,
      job
    } = this.state;

    if (
      name.trim().length > 1 &&
      email.trim().length > 1 &&
      nationality.trim().length > 1 &&
      degree !== undefined &&
      currentLocation.trim().length > 1 &&
      message.trim().length > 1 &&
      teachingExperience !== undefined
    ) {
      const application = {
        name,
        email,
        nationality,
        degree,
        teachingExperience,
        currentLocation,
        message,
        job
      };
      Axios.post("https://api.eslbot.com/apply", application).then(response => {
        if (response.data.success) {
          this.props.toastManager.add(`Email sent!`, {
            appearance: "success",
            autoDismiss: true,
            placement: "bottom-left"
          });
          this.setState({ loading: false });
          Router.back()
        } else {
          this.props.toastManager.add(`Email send failure. Uh oh`, {
            appearance: "error",
            autoDismiss: true,
            placement: "bottom-left"
          });
          this.setState({ loading: false });
        }
      });
    } else {
      this.setState({
        errors: true,
        errorMessage: "Something broke",
        loading: false
      });
    }
  };

  render() {
    return this.state.job ? (
      <div className="container">
        <Row>
          <Column style={{ flex: 4 }}>
            <div style={{ textAlign: "center" }}>
              <Image
                wrapped
                size="small"
                src="https://upload.wikimedia.org/wikipedia/commons/3/38/Robot-clip-art-book-covers-feJCV3-clipart.png"
              />
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                marginRight: "50px"
              }}
            >
              <h4 style={{ marginBottom: "5px" }}>You're applying for</h4>
              <p>{this.state.job.jobTitle}</p>
              <p>
                <Icon name="building" />
                {this.state.job.name}
              </p>
              <p>
                <Icon name="globe" />
                {this.state.job.city}, {this.state.job.country}
              </p>
            </div>
          </Column>
          <Column style={{ flex: 8 }}>
            <Form>
              <Row>
                <Column>
                  <Form.Input
                    label="Your Name"
                    placeholder="Lloyd Bonafide"
                    onChange={() =>
                      this.setState({
                        name: (event!.target as HTMLInputElement).value
                      })
                    }
                  />
                </Column>
                <Column>
                  <Form.Input
                    label="Your Email Address"
                    placeholder="email@domain.com"
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
                    name="nationality"
                    placeholder="American"
                    label="What's your nationality?"
                    onChange={() =>
                      this.setState({
                        nationality: (event!.target as HTMLInputElement).value
                      })
                    }
                  />
                </Column>
                <Column>
                  <Form.Input
                    name="currentLocation"
                    placeholder="Japan"
                    label="Where do you currently live?"
                    onChange={() =>
                      this.setState({
                        currentLocation: (event!.target as HTMLInputElement)
                          .value
                      })
                    }
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Form.Select
                    label="Do you have a 4-year university degree?"
                    onChange={({}, { value }) => {
                      this.setState({ degree: value as boolean });
                    }}
                    options={[
                      {
                        key: "Yes",
                        value: true,
                        text: "Yes"
                      },
                      {
                        key: "No",
                        value: false,
                        text: "No"
                      }
                    ]}
                  />
                </Column>
                <Column>
                  <Form.Select
                    label="Do you have teaching experience??"
                    onChange={({}, { value }) => {
                      this.setState({ teachingExperience: value as boolean });
                    }}
                    options={[
                      {
                        key: "Yes",
                        value: true,
                        text: "Yes"
                      },
                      {
                        key: "No",
                        value: false,
                        text: "No"
                      }
                    ]}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Form.TextArea
                    name="message"
                    label="Write a message to the employer"
                    placeholder="Include information about your experience, education, nationality, and personality. Be careful about providing detailed personal information like identification numbers. Wait until you've received a response, at least."
                    onChange={() =>
                      this.setState({
                        message: (event!.target as HTMLInputElement).value
                      })
                    }
                  />
                </Column>
              </Row>
            </Form>
            <br />
            <div style={{ textAlign: "center" }}>
              {this.state.errors ? (
                <Message negative>All Fields Are Required</Message>
              ) : null}
              <Button primary onClick={this.handleApply}>
                Apply now
              </Button>
              <br />
              <br />
              <a>How does applying work?</a>
            </div>
          </Column>
        </Row>
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Posting job" />
        </Dimmer>
        <style jsx>{`
          .item-highlighted {
            font-weight: bold;
            font-size: 1.05em;
            cursor: pointer;
            padding: 2.5px 0;
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
          }
          ,
          .container {
            width: 100%;
            margin: 0 auto;
          }
          .image {
            margin-right: 100px;
            background-color: red;
            border: 1px solid black;
          }
        `}</style>
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}

export default withToastManager(Apply);
