// This _app.tsx thing is built into next.js and lets us use a universal layout to wrap our app

import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import Layout from '../components/common/layout'
import Axios from 'axios';

class MyApp extends App {
  state = {
    userId: undefined,
  }
  componentDidMount() {
    const userId = localStorage.getItem('userId');
    this.setState({userId});
  }

  handleLogout = () => {
    localStorage.removeItem('userId');
    this.setState({userId: undefined})
    Router.push('/')
  }

  handleLogin = (user: { username: string, password: string}) => {
    Axios.post('http://localhost:4000/login', user)
    .then(response => {
      if (response.data.success) {
        localStorage.setItem('userId', response.data.id)
        this.setState({userId: response.data.id})
        Router.push('/account')
      } else {
        alert('uh oh this bad')
      }
    })
  }

  render() {
    const { Component, pageProps } = this.props
    const newProps = {
      ...pageProps,
      handleLogout: this.handleLogout,
      handleLogin: this.handleLogin,
      userId: this.state.userId
    }
    return (
      <Container>
        <Layout userId={this.state.userId}>
          <Component {...newProps} />
        </Layout>
      </Container>
    )
  }
}

MyApp.getInitialProps = async function () {
  const res = await fetch('http://localhost:4000/search?param="China"')
  const data = await res.json()

  return {
    pageProps: data,
  }
}

export default MyApp