import React, { Component } from 'react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'

class Account extends Component {
  render() {
    return (
      <div>
        <Head title="eslbot" />
        <Nav />
        <p>Account</p>
      </div>
    )
  }
}

export default Account;