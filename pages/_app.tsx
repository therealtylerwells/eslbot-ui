// This _app.tsx thing is built into next.js and lets us use a universal layout to wrap our app

import React from "react";
import App, { Container } from "next/app";
import Router from "next/router";
import Layout from "../components/common/layout";
import Axios from "axios";
import fetch from "isomorphic-unfetch";
// @ts-ignore
import { ToastProvider } from "react-toast-notifications";

class MyApp extends App {
  state = {
    userId: undefined
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.setState({ userId });
  }

  handleLogout = () => {
    localStorage.removeItem("userId");
    this.setState({ userId: undefined });
    Router.push("/");
  };

  handleLogin = (user: { username: string; password: string }) => {
    this.setState({ loading: true });
    Axios.post("https://api.eslbot.com/login", user).then(response => {
      if (response.data.success) {
        localStorage.setItem("userId", response.data.id);
        this.setState({ userId: response.data.id, loading: false });
        Router.push("/account");
      } else {
        alert("Error: " + response.data.message);
        this.setState({ loading: false });
      }
    });
  };

  handleChangePassword = (oldPassword: string, newPassword: string) => {
    console.log(this.state.userId, oldPassword, newPassword);
    const data = {
      id: this.state.userId,
      oldPassword,
      newPassword
    };
    Axios.post("https://api.eslbot.com/change-password", data)
      .then(response => {
        if (response.data.success) {
          this.handleLogout();
          alert('Your password is changed. Please sign in again');
        } else {
          alert('Error: ' + response.data.message);
        }
      })
  };

  handleResetPassword = (email: string) => {
    this.setState({ loading: true });
    Axios.post("https://api.eslbot.com/reset-password-email", {
      email: email
    }).then(response => {
      console.log(response);
      if (response.data.success) {
        this.setState({ loading: false });
        alert("Check your email for instructions");
      } else {
        alert("Error: " + response.data.message);
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { Component, pageProps } = this.props;
    const newProps = {
      ...pageProps,
      handleLogout: this.handleLogout,
      handleLogin: this.handleLogin,
      handleResetPassword: this.handleResetPassword,
      handleChangePassword: this.handleChangePassword,
      userId: this.state.userId
    };
    return (
      <Container>
        <Layout userId={this.state.userId}>
          <ToastProvider>
            <Component {...newProps} />
          </ToastProvider>
        </Layout>
      </Container>
    );
  }
}

MyApp.getInitialProps = async function() {
  const res = await fetch("https://api.eslbot.com/get-recent-jobs");
  const data = await res.json();

  return {
    pageProps: data
  };
};

export default MyApp;
