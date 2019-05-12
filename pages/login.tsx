import React, { Component } from 'react';
import { Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react';
import Link from 'next/link'
import { Row, Column } from '../components/common/grid'
import Axios from 'axios';
import Router from 'next/router'
import Layout from '../components/common/layout';

type loginProps = {

}

type loginState = {

}

class Login extends Component<loginProps, loginState> {
  state = {
    email: '',
    password: '',
    errors: false,
    errorMessage: null,
    loading: false,
  }

  validateForm = () => {
    if (
      this.state.email.trim().length > 0 &&
      this.state.password.trim().length > 0
    ) {
      this.setState({ errors: false })
      return true;
    } else {
      this.setState({ errors: true })
      return false;
    }
  }

  handleSubmit = () => {
    this.setState({ errorMessage: null, errors: false, loading: true })
    const user = {
      "email": this.state.email,
      "password": this.state.password
    }
    if (this.validateForm()) {
      Axios.post('http://localhost:4000/login', user)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem('userId', response.data.id)
            Router.push('/account')
          } else {
            this.setState({ errorMessage: response.data.message, loading: false })
          }
        })
    } else {
      this.setState({ errors: true, loading: false })
    }
  }

  render() {
    return (
      <Layout title="login">
        {/* 
        // @ts-ignore */}
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
                <Button onClick={this.handleSubmit}>
                  Login
              </Button>
                {this.state.errors ? <Message>All fields are required</Message> : null}
                {this.state.errorMessage ? <Message>{this.state.errorMessage}</Message> : null}
              </Column>
            </Form>
          </Column>
          {/* 
          // @ts-ignore */}
          <Column />
        </Row>
        <Row>
          <Column>
            <p>Forgot your password?  <Link href="/reset-password"><a>Reset it</a></Link></p>
            <p>Not signed up?  <Link href="/register"><a>Register</a></Link></p>
          </Column>
        </Row>
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Logging in" />
        </Dimmer>
      </Layout>
    )

  }

}

export default Login;