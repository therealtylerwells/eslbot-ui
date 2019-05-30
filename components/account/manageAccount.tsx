import { Button } from "semantic-ui-react";
import ChangePassword from './changePassword';
import React, { Component } from 'react'

interface IManageAccountProps {
  handleLogout: () => void;
  handleChangePassword: () => void;
}

interface IManageAccountState {
  isChangePassword: boolean;
}

class manageAccount extends Component<IManageAccountProps, IManageAccountState> {
  state = {
    isChangePassword: false,
  }

  toggleChangePassword = () => {
    this.setState({ isChangePassword: !this.state.isChangePassword})
  }

  render(){
    return (
      <div>
        <Button style={{marginRight:'10'}} onClick={this.toggleChangePassword}>change my password</Button>
        <Button onClick={this.props.handleLogout}>logout</Button>
        {
          this.state.isChangePassword ? <ChangePassword handleChangePassword={this.props.handleChangePassword}/> : null
        }
      </div>
    )
  }
}

export default manageAccount