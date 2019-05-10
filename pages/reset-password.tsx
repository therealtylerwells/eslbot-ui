import React, { Component } from 'react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'

class ResetPassword extends Component {
  render() {
    return (
      <div>
        {/* 
        // @ts-ignore */}
        <Head title="eslbot" />
        <Nav />
        <p>Reset Password</p>
      </div>
    )
  }
}

export default ResetPassword;