import React, { Component } from 'react';
import { Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'
import Link from 'next/link'
import { Row, Column } from '../components/common/grid'
import Axios from 'axios';
import Router from 'next/router'
class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    errors: false,
    errorMessage: '',
    loading: false,
  }

  validateForm = () => {
    if (
      this.state.email.trim().length > 0 &&
      this.state.password.trim().length > 0 &&
      this.state.password.trim().length > 0 &&
      this.state.password.trim() === this.state.password2.trim()
    ) {
      console.log('Good submit')
      this.setState({ errors: false })
      return true;
    } else {
      this.setState({ errors: true, errorMessage: 'All fields are required' })
      return false;
    }
  }

  handleSubmit = () => {
    this.setState({ errors: false, errorMessage: '', loading: true})
    const user = {
      "email": this.state.email,
      "password": this.state.password,
    }
    if (this.validateForm()) {
      Axios.post('http://localhost:4000/user', user)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem('userId', (response as any).id)
            Router.push('/account')
          } else {
            this.setState({ errors: true, errorMessage: response.data.message, loading: false})
          }
        })
        .catch(error => {
          console.log(error)
          this.setState({loading: false})
        })
    } else {
      this.setState({ errors: true, loading: false })
    }
  }

  render() {
    return (
      <div>
        {/* 
        // @ts-ignore */}
        <Head title="login" />
        <Nav />
        <Row>
          <Column>
            <Form>
              <Column>
                <Form.Input
                  icon="envelope"
                  placeholder="email"
                  label="Email"
                  onChange={() => this.setState({ email: (event!.target as HTMLInputElement).value })}
                />
                <Form.Input
                  icon="lock"
                  placeholder="password"
                  label="Password"
                  type="password"
                  onChange={() => this.setState({ password: (event!.target as HTMLInputElement).value })}
                />
                <Form.Input
                  icon="lock"
                  placeholder="Confirm password"
                  label="Confirm Password"
                  type="password"
                  onChange={() => this.setState({ password2: (event!.target as HTMLInputElement).value })}
                />
                <Button onClick={this.handleSubmit}>
                  Register
              </Button>
                {this.state.errors ? <Message>{this.state.errorMessage}</Message> : null}
                {(this.state.password !== this.state.password2) && this.state.password.trim().length > 5 && this.state.password2.trim().length > 5 ? <Message>Password mismatch</Message> : null}
              </Column>
            </Form>
          </Column>
          {/* 
          // @ts-ignore */}
          <Column />
        </Row>
        <Row>
          <Column>
            <p>Already registered?  <Link href="/"><a>Login</a></Link></p>
          </Column>
        </Row>
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Finding jobs" />
        </Dimmer>
      </div>
    )

  }

}

export default Register;