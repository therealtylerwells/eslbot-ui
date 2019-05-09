import React, { Component } from 'react';
import { Form, Button, Message, Label, Dimmer, Loader } from 'semantic-ui-react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'
import { Row, Column } from '../components/common/grid';
import countryOptions from '../constants/countryOptions';
import Autocomplete from 'react-autocomplete';
import Axios from 'axios';
import Router from 'next/router'

class PostJob extends Component {
  state = {
    errors: false,
    schoolName: '',
    email: '',
    jobTitle: '',
    city: '',
    country: '',
    jobDescription: '',
    jobPosterId: undefined,
    externalPosting: false,
    postingApproved: false,
    loading: false,
  }

  componentDidMount() {
    if (localStorage.getItem('userId')) {
      this.setState({ postingApproved: true, jobPosterId: localStorage.getItem('userId') })
    }
  }

  handlePostJob = () => {
    this.setState({ loading: true, errors: false, errorMessage: '' })
        const { schoolName, email, jobTitle, city, country, jobDescription, jobPosterId, externalPosting, postingApproved } = this.state;
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
        postingApproved
      }
      Axios.post('http://localhost:4000/jobs', job)
        .then(response => {
          if (response.data.success) {
            this.setState({ loading: false })
            alert('Succcessssss')
            Router.push({
              pathname: '/job' + response.data.jobId,
              query: response.data.jobId,
            })
          } else {
            this.setState({ loading: false, errorMessage: response.data.message })
          }
        })
      this.setState({ errors: false })
    } else {
      this.setState({ errors: true, errorMessage: 'Something broke' })
    }
  }

  testNav = () => {
    Router.push('/job/' + '5cd396143a194a61d3200458')
  }
  render() {
    return (
      <div>
        <Head title="eslbot" />
        <Nav />
        <Button onClick={this.testNav}>Test Nav</Button>
        <div>
          <p>Posting jobs is free.</p>
          <p>If you're not registered, then your job posting will go live within 24 hours pending approval. You will not be able to delete your job posting. It will expire in 60 days.</p>
          <p>If you're registered (it's fast and doesn't even require email verification!), then your posting will go live immediately. You can also view, edit, and delete your job postings at any time.</p>
        </div>
        <div>
          <Form>
            <Row>
              <Column>
                <Form.Input
                  placeholder="School or Company Name"
                  label="School or Company Name"
                  onChange={(e) => this.setState({ schoolName: event.target.value })}
                />
              </Column>
              <Column>
                <Form.Input
                  placeholder="Your Email Address"
                  label="Your Email Address"
                  onChange={(e) => this.setState({ email: event.target.value })}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <Form.Input
                  placeholder="Job Title"
                  label="Job Title"
                  onChange={(e) => this.setState({ jobTitle: event.target.value })}
                />
              </Column>
              <Column>
                <Form.Input
                  placeholder="City"
                  label="City"
                  onChange={(e) => this.setState({ city: event.target.value })}
                />
              </Column>
              <Column>
                <span style={{ 'color': 'rgba(0,0,0,.87)', 'fontSize': '.92857143em', 'fontWeight': '700' }}>Country</span>
                <br />
                <Autocomplete
                  autocomplete="off"
                  getItemValue={(item) => item.label}
                  items={countryOptions}
                  renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                      {item.label}
                    </div>
                  }
                  value={this.state.country}
                  onChange={(e) => this.setState({ country: e.value })}
                  onSelect={(val) => this.setState({ country: val })}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <Form.TextArea
                  style={{ 'width': '100%' }}
                  placeholder="Describe the job. Talk about stuff like salary, class size, and whatnot"
                  label="Job Description"
                  onChange={(e) => this.setState({ jobDescription: event.target.value })}
                />
              </Column>
            </Row>
            <div style={{ 'marginTop': '10px', 'textAlign': 'center' }}>
              {this.state.errors ? <Message negative>All Fields Are Required</Message> : null}
              <Button onClick={this.handlePostJob}>Post Job</Button>
            </div>
          </Form>
        </div>
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Finding jobs" />
        </Dimmer>
      </div>
    )
  }
}

export default PostJob;