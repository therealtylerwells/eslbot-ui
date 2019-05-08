import React, { Component } from 'react';
import { Button, Input, Form, Message } from 'semantic-ui-react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'
import Link from 'next/link'
import { Row, Column } from '../components/common/grid'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: false,
  }

  validateForm = () => {
    if (
      this.state.email.trim().length > 0 &&
      this.state.password.trim().length > 0
    ) {
      console.log('Good submit')
      this.setState({ errors: false })
      return true;
    } else {
      this.setState({ errors: true})
      return false;
    }
  }

  handleSubmit = () => {
    if (this.validateForm()) {
      // Submit
    } else {
      this.setState({ errors: true })
    }
  }

  render() {
    return (
      <div>
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
                  onChange={() => this.setState({ email: event.target.value })}
                />
                <Form.Input
                  icon="lock"
                  placeholder="password"
                  label="Password"
                  type="password"
                  onChange={() => this.setState({ password: event.target.value })}
                />
                <Button onClick={this.handleSubmit}>
                  Login
              </Button>
              {this.state.errors ? <Message>ERrors yo</Message> : null}
              </Column>
            </Form>
          </Column>
          <Column />
        </Row>
        <Row>
          <Column>
            <p>Forgot your password?  <Link href="/"><a>Reset it</a></Link></p>
            <p>Not signed up?  <Link href="/"><a>Register</a></Link></p>
          </Column>
        </Row>
      </div>
    )

  }

}

export default Login;