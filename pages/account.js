import React, { Component } from 'react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'
import Router from 'next/router'
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'


class Account extends Component {
  state = {
    userId: null,
  }

  componentDidMount() {
    this.setState({ userId: localStorage.getItem('userId') })
  }

  handleLogout = () => {
    console.log('logged out')
    localStorage.removeItem('userId');
    Router.push('/')
  }

  render() {
    return (
      <div>
        <Head title="eslbot" />
        <Nav />
        <p>Account</p>
        <Button onClick={this.handleLogout}>logout</Button>
      </div>
    )
  }
}

export default Account;