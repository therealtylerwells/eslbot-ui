import React, { Component } from 'react';
import { Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react';
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
      Axios.post('http://localhost:4000/job', job)
        .then(response => {
          if (response.data.success) {
            if (localStorage.getItem('userId')) {
              setTimeout(() => {
                this.setState({ loading: false })
                Router.push('/account')
              }, 1000)
            } else {
              Router.push('/')
              this.setState({ loading: false })
            }
          } else {
            this.setState({ loading: false, errorMessage: response.data.message })
          }
        })
    } else {
      this.setState({ errors: true, errorMessage: 'Something broke', loading: false })
    }
  }

  render() {
    return (
      <div>
        {/* 
        // @ts-ignore */}
        <Head title="eslbot" />
        <Nav />
        <div>
          {
            !localStorage.getItem('userId') ? (
              <div>
              <p>Posting jobs is free.</p>
              <p>If you're not registered, then your job posting will go live within 24 hours pending approval. You will not be able to delete your job posting. It will expire in 60 days.</p>
              <p>If you're registered (it's fast and doesn't even require email verification!), then your posting will go live immediately. You can also view, edit, and delete your job postings at any time.</p>
              </div>
            ) : <p>Please feed me jobs</p>
          }
        </div>
        <div>
          <Form>
            <Row>
              <Column>
                <Form.Input
                  placeholder="School or Company Name"
                  label="School or Company Name"
                  onChange={() => this.setState({ schoolName: (event!.target as HTMLInputElement).value })}
                />
              </Column>
              <Column>
                <Form.Input
                  placeholder="Your Email Address"
                  label="Your Email Address"
                  onChange={() => this.setState({ email: (event!.target as HTMLInputElement).value })}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <Form.Input
                  placeholder="Job Title"
                  label="Job Title"
                  onChange={() => this.setState({ jobTitle: (event!.target as HTMLInputElement).value })}
                />
              </Column>
              <Column>
                <Form.Input
                  placeholder="City"
                  label="City"
                  onChange={() => this.setState({ city: (event!.target as HTMLInputElement).value })}
                />
              </Column>
              <Column>
                <span style={{ 'color': 'rgba(0,0,0,.87)', 'fontSize': '.92857143em', 'fontWeight': 'bold' }}>Country</span>
                <br />
                {/* 
                // @ts-ignore */}
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
                  onChange={(e) => this.setState({ country: (e as any).value })}
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
                  onChange={() => this.setState({ jobDescription: (event!.target as HTMLInputElement).value })}
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
          <Loader content="Posting job" />
        </Dimmer>
      </div>
    )
  }
}

export default PostJob;