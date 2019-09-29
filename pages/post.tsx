import React, { Component } from "react";
import { Form, Button, Message, Dimmer, Loader } from "semantic-ui-react";
import { Row, Column } from "../components/common/grid";
import Axios from "axios";
import Router from "next/router";
import InternalResult from "../components/searchResults/internalResult";
// @ts-ignore
import { withToastManager } from "react-toast-notifications";
import Head from "../components/common/head";

interface postJobProps {
  toastManager: any;
}

interface postJobState {}

class PostJob extends Component<postJobProps, postJobState> {
  state = {
    errors: false,
    schoolName: "",
    email: "",
    jobTitle: "",
    city: "Anywhere",
    country: "Anyplace",
    jobDescription: "",
    jobPosterId: undefined,
    externalPosting: false,
    postingApproved: false,
    loading: true,
    link: undefined,
    dateAdded: new Date()
  };

  async componentDidMount() {
    const jobPosterId = await localStorage.getItem("userId");
    if (jobPosterId) {
      this.setState({
        postingApproved: true,
        loading: false,
        jobPosterId: jobPosterId
      });
    } else {
      this.setState({ loading: false, externalPosting: true });
    }
  }

  handlePostJob = () => {
    this.setState({ loading: true, errors: false, errorMessage: "" });
    const { schoolName, email, jobTitle, city, country, jobDescription, jobPosterId, externalPosting, dateAdded, postingApproved } = this.state;

    // Hacky way to assign unique link so MongoDB doesn't remove these as duplicates
    const link = Math.random() * (1 - 100000000000) + 1;

    if (
      this.state.schoolName.trim().length > 1 &&
      this.state.email.trim().length > 1 &&
      this.state.jobTitle.trim().length > 1 &&
      this.state.city.trim().length > 1 &&
      this.state.country.trim().length > 1 &&
      this.state.jobDescription.trim().length > 1
    ) {
      const job = {
        name: schoolName, // TODO: Rename this field to '________????????' everywhere
        email,
        jobTitle,
        city,
        country,
        jobDescription,
        jobPosterId,
        externalPosting,
        postingApproved,
        dateAdded,
        link
      };
      Axios.post("https://api.eslbot.com/api/job", job).then((response) => {
        if (response.data.success) {
          this.props.toastManager.add(`Job saved`, {
            appearance: "success",
            autoDismiss: true,
            placement: "bottom-left"
          });
          if (localStorage.getItem("userId")) {
            setTimeout(() => {
              this.setState({ loading: false });
              Router.push("/account");
            }, 500);
          } else {
            Router.push("/");
            this.setState({ loading: false });
          }
        } else {
          this.setState({
            loading: false,
            errorMessage: response.data.message
          });
          this.props.toastManager.add(`Something went wrong`, {
            appearance: "error",
            autoDismiss: true,
            placement: "bottom-left"
          });
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
    return !this.state.loading ? (
      <div>
        <Head title="eslbot | post a job" description={"Post a job. You can post as many jobs as you want, for free."} />
        {/* 
        // @ts-ignore */}
        <div>
          {!this.state.jobPosterId ? (
            <div>
              <p>Posting jobs is free.</p>
              <p>
                If you're not registered, then your job posting will go live within 24 hours pending approval. You will not be able to delete your job posting.
                It will expire in 60 days.
              </p>
              <p>
                If you're registered (it's fast and doesn't even require email verification!), then your posting will go live immediately. You can also view,
                edit, and delete your job postings at any time.
              </p>
            </div>
          ) : null}
        </div>
        <div>
          <Form>
            <Row>
              <Column>
                <Form.Input
                  placeholder="School or Company Name"
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
                  placeholder="Your Email Address"
                  label="Your Email Address"
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
                  onChange={() => {
                    this.setState({
                      city: (event!.target as HTMLInputElement).value
                    });
                    if (this.state.country === "Anyplace") {
                      this.setState({ country: "" });
                    }
                  }}
                />
              </Column>
              <Column>
                <Form.Input
                  placeholder="Country"
                  label="Country"
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
                  onChange={() =>
                    this.setState({
                      jobDescription: (event!.target as HTMLInputElement).value
                    })
                  }
                />
              </Column>
            </Row>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              {this.state.errors ? <Message negative>All Fields Are Required</Message> : null}
              <Button onClick={this.handlePostJob}>Post Job</Button>
            </div>
          </Form>
        </div>
        {this.state.schoolName.length > 0 ? (
          <div>
            <h3>Search Result Preview</h3>

            <InternalResult
              job={{
                _id: "like anyone will ever see this",
                link: undefined,
                country: this.state.country,
                city: this.state.city,
                jobTitle: this.state.jobTitle,
                name: this.state.schoolName,
                updatedAt: new Date()
              }}
            />
          </div>
        ) : null}
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
        `}</style>
      </div>
    ) : (
      <Dimmer inverted active>
        <Loader content="Loading..." />
      </Dimmer>
    );
  }
}

export default withToastManager(PostJob);
