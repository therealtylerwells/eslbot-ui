import React, { Component } from 'react';
import { Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react';
import Link from 'next/link'
import { Row, Column } from '../components/common/grid'
// @ts-ignore
import { withToastManager } from 'react-toast-notifications';

type loginProps = {
  handleLogin: (user: {email: string, password: string}) => void;
  withToastManager: any;
  loading: boolean;
}

type loginState = {
  email: string;
  password: string;
  errors: boolean;
  errorMessage: string | null;
}

class Login extends Component<loginProps, loginState> {
  state = {
    email: '',
    password: '',
    errors: false,
    errorMessage: null,
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
    this.setState({ errorMessage: null, errors: false })
    const user = {
      "email": this.state.email,
      "password": this.state.password
    }
    if (this.validateForm()) {
      this.props.handleLogin(user);
    } else {
      this.setState({ errors: true })
    }
  }

  render() {
    return (
      <div>
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
        <Dimmer inverted active={this.props.loading}>
          <Loader content="Logging in" />
        </Dimmer>
      </div>
    )

  }

}

export default withToastManager(Login);