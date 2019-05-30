import React, { Component } from "react";
import { Button, Form, Message, Dimmer, Loader } from "semantic-ui-react";
import { Row, Column } from "../../components/common/grid";
// @ts-ignore
import { withToastManager } from "react-toast-notifications";

type IChangePasswordProps = {
  withToastManager: any;
  loading: boolean;
  handleChangePassword: any;
};

type IChangePasswordState = {
  oldPassword: string;
  newPassword: string;
  errors: boolean;
  errorMessage: string | null;
};

class ChangePassword extends Component<
  IChangePasswordProps,
  IChangePasswordState
> {
  state = {
    errors: false,
    errorMessage: null,
    oldPassword: "",
    newPassword: ""
  };

  validateForm = () => {
    if (
      this.state.oldPassword.trim().length > 0 &&
      this.state.newPassword.trim().length > 0
    ) {
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
      this.props.handleChangePassword(this.state.oldPassword, this.state.newPassword)
    } else {
      this.setState({ errors: true });
    }
  };

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
                  icon="lock"
                  type="password"
                  label="What's your current password?"
                  onChange={() =>
                    this.setState({
                      oldPassword: (event!.target as HTMLInputElement).value
                    })
                  }
                />
                <Form.Input
                  icon="lock"
                  type="password"
                  label="Input a new password"
                  onChange={() =>
                    this.setState({
                      newPassword: (event!.target as HTMLInputElement).value
                    })
                  }
                />
                <Button onClick={this.handleSubmit}>change now</Button>
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

export default withToastManager(ChangePassword);
