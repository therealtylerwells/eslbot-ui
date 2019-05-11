import React, { Component } from 'react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'
import Router from 'next/router'
import { Menu, Dimmer, Loader, Confirm } from 'semantic-ui-react'
import Axios from 'axios';
import { HTTPResponseType, JobType } from '../types/types';
import MyJobs from '../components/account/myJobs';
import ManageAccount from '../components/account/manageAccount';

type accountProps = {

}

type accountState = {
  userId: string | undefined,
  activeItem: string,
  loading: boolean,
  userJobs: JobType[] | undefined,
  isConfirmOpen: boolean;
  handleCancel?: any;
  handleConfirm?: any;
  idToDelete?: any;
}

class Account extends Component<accountProps, accountState> {
  state = {
    userId: undefined,
    activeItem: 'myJobs',
    loading: true,
    userJobs: [],
    isConfirmOpen: false,
    idToDelete: undefined,
  }

  componentDidMount = async () => {
    const res = await fetch('http://localhost:4000/jobs?jobPosterId=' + localStorage.getItem('userId'));
    const data: HTTPResponseType = await res.json()
    const newUserJobs = data.jobs;
    this.setState({ userJobs: newUserJobs, loading: false })
  }

  handleCancel = () => {
    this.setState({isConfirmOpen: false, loading: false})
  }

  handleConfirm = () => {
    this.setState({isConfirmOpen: false, loading: false})
    Axios.delete('http://localhost:4000/job?jobId=' + this.state.idToDelete)
      .then(response => {
        if (response.data.success) {
          const newJobs = this.state.userJobs.filter((el: any) => {
            return el._id !== this.state.idToDelete ? el : null;
          })
          this.setState({ userJobs: newJobs, loading: false, idToDelete: undefined })
        } else {
          alert('Error')
        }
      })
      .catch(error => alert('Error: ' + error))
  }

  handleLogout = () => {
    localStorage.removeItem('userId');
    Router.push('/')
  }

  handleRenew = () => {
    alert('renew')
  }

  handleDelete = (jobId: string) => {
    this.setState({ loading: true, idToDelete: jobId, isConfirmOpen: true })
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        {/* 
        // @ts-ignore */}
        <Head title="eslbot" />
        <Nav />
        <Confirm 
          open={this.state.isConfirmOpen} 
          onCancel={this.handleCancel} 
          onConfirm={this.handleConfirm} 
          header="This will permanently delete this job posting"
          size='tiny'
          />
        <Menu>

          <Menu.Item
            name='myJobs'
            active={activeItem === 'myJobs'}
            onClick={() => this.setState({ activeItem: 'myJobs' })}
          >
            My Jobs
        </Menu.Item>

          <Menu.Item
            name='manageAccount'
            active={activeItem === 'manageAccount'}
            onClick={() => this.setState({ activeItem: 'manageAccount' })}
          >
            Manage Account
        </Menu.Item>
        </Menu>
        {this.state.activeItem === 'myJobs' ? (
          <MyJobs
            handleDelete={this.handleDelete}
            handleRenew={this.handleRenew}
            jobs={this.state.userJobs}
          />
        ) : null}
        {this.state.activeItem === 'manageAccount' ? (
          <ManageAccount handleLogout={this.handleLogout}/>
        ) : null}
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Loading account" />
        </Dimmer>
      </div>
    )
  }
}

export default Account;