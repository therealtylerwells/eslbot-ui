import React, { Component } from "react";
import { Button, Form, Message, Dimmer, Loader } from "semantic-ui-react";
import { Row, Column } from "../components/common/grid";
// @ts-ignore
import { withToastManager } from "react-toast-notifications";
import Head from "../components/common/head";

type IResetPasswordProps = {
  withToastManager: any;
  loading: boolean;
  handleResetPassword: (email: string) => void;
};

type IResetPasswordState = {};

class ResetPassword extends Component<
  IResetPasswordProps,
  IResetPasswordState
> {
  state = {
    email: "",
    errors: false,
    errorMessage: null
  };

  validateForm = () => {
    if (this.state.email.trim().length > 0) {
      this.setState({ errors: false });
      return true;
    } else {
      this.setState({ errors: true });
      return false;
    }
  };

  handleSubmit = () => {
    this.setState({ errorMessage: null, errors: false });
    if (this.validateForm()) {
      this.props.handleResetPassword(this.state.email);
    } else {
      this.setState({ errors: true });
    }
  };

  render() {
    return (
      <div>
        <Head title="eslbot | reset password" description={"reset your password"}/>
        {/* 
        // @ts-ignore */}
        <Row>
          <Column>
            <Form>
              <Column>
                <Form.Input
                  icon="envelope"
                  placeholder="chewy@kashyyyk.com"
                  label="What's your email address?"
                  onChange={() =>
                    this.setState({
                      email: (event!.target as HTMLInputElement).value
                    })
                  }
                />
                <Button onClick={this.handleSubmit}>Reset Password</Button>
                {this.state.errors ? (
                  <Message>Enter an email address</Message>
                ) : null}
                {this.state.errorMessage ? (
                  <Message>{this.state.errorMessage}</Message>
                ) : null}
              </Column>
            </Form>
          </Column>
          {/* 
          // @ts-ignore */}
          <Column />
        </Row>
        <Dimmer inverted active={this.props.loading}>
          <Loader content="Sending email" />
        </Dimmer>
      </div>
    );
  }
}

export default withToastManager(ResetPassword);
