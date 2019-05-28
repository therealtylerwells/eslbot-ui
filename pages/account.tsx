import React, { Component } from "react";
import { Menu, Dimmer, Loader, Confirm } from "semantic-ui-react";
import Axios from "axios";
import { HTTPResponseType, JobType } from "../types/types";
import MyJobs from "../components/account/myJobs";
import ManageAccount from "../components/account/manageAccount";
import EditJob from "../components/job/editJob";
// @ts-ignore
import { withToastManager } from 'react-toast-notifications';

type accountProps = {
  handleLogout: any;
  toastManager?: any;
};

type accountState = {
  userId: string | undefined;
  activeItem: string;
  loading: boolean;
  userJobs: JobType[] | undefined;
  isConfirmOpen: boolean;
  handleCancel?: any;
  handleConfirm?: any;
  idToDelete?: any;
  isEditMode?: boolean;
  jobToEdit?: object;
};

class Account extends Component<accountProps, accountState> {
  state = {
    userId: undefined,
    activeItem: "myJobs",
    loading: true,
    userJobs: [],
    isConfirmOpen: false,
    idToDelete: undefined,
    isEditMode: false,
    jobToEdit: undefined
  };

  componentDidMount = () => {
    this.getMyJobs()
  };

  getMyJobs = async () => {
    const res = await fetch(
      "http://localhost:4000/jobs?jobPosterId=" + localStorage.getItem("userId")
    );
    const data: HTTPResponseType = await res.json();
    const newUserJobs = data.jobs;
    this.setState({ userJobs: newUserJobs, loading: false });
  }

  handleCancel = () => {
    this.setState({ isConfirmOpen: false, loading: false });
  };

  handleConfirm = () => {
    this.setState({ isConfirmOpen: false, loading: false });
    Axios.delete("http://localhost:4000/job?jobId=" + this.state.idToDelete)
      .then(response => {
        if (response.data.success) {
          const newJobs = this.state.userJobs.filter((el: any) => {
            return el._id !== this.state.idToDelete ? el : null;
          });
          this.setState({
            userJobs: newJobs,
            loading: false,
            idToDelete: undefined
          });
          this.props.toastManager.add(`Job deleted successfully`, {
            appearance: 'success',
            autoDismiss: true,
            placement:"bottom-left"
          });
        } else {
          alert("Error");
        }
      })
      .catch(error => alert("Error: " + error));
  };

  handleRenew = (jobId: string) => {
    Axios.put("http://localhost:4000/renew?jobId=" + jobId).then(response => {
      if (response.data.success) {
        this.props.toastManager.add(`Job renewed successfully`, {
          appearance: 'success',
          autoDismiss: true,
        });      
      } else {
        this.props.toastManager.add(`Something went wrong`, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    });
  };

  handleEdit = async (jobId: string) => {
    this.setState({ isEditMode: true, loading: true, jobToEdit: undefined });
    const res = await fetch("http://localhost:4000/job?jobId=" + jobId);
    const data = await res.json();
    this.setState({ loading: false, jobToEdit: data.job });
  };

  handleCancelEdit = () => {
    this.setState({ loading: false, isEditMode: false})
  }

  handleSaveEdit = (job: any) => {
    Axios.put('http://localhost:4000/job', job)
      .then(response => {
        if (response.data.success) {
          this.props.toastManager.add(`Job edited successfully`, {
            appearance: 'success',
            autoDismiss: true,
            placement:"bottom-left"
          });
          this.setState({ isEditMode: false })
          this.getMyJobs()
        } else {
          this.props.toastManager.add(`Something went wrong`, {
            appearance: 'error',
            autoDismiss: true,
            placement:"bottom-left"
          });
          this.setState({ isEditMode: false })
          this.getMyJobs()
        }
      })
  }

  handleDelete = (jobId: string) => {
    this.setState({ loading: true, idToDelete: jobId, isConfirmOpen: true });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        {/* 
        // @ts-ignore */}
        <Menu>
          <Menu.Item
            name="myJobs"
            active={activeItem === "myJobs"}
            onClick={() => this.setState({ activeItem: "myJobs" })}
          >
            My Jobs
          </Menu.Item>

          <Menu.Item
            name="manageAccount"
            active={activeItem === "manageAccount"}
            onClick={() => this.setState({ activeItem: "manageAccount" })}
          >
            Manage Account
          </Menu.Item>
        </Menu>
        {this.state.activeItem === "myJobs" ? (
          <div>
            <MyJobs
              handleDelete={this.handleDelete}
              handleRenew={this.handleRenew}
              handleEdit={this.handleEdit}
              jobs={this.state.userJobs}
            />
            <Confirm
              open={this.state.isConfirmOpen}
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              header="This will permanently delete this job posting"
              size="tiny"
              style={{ marginTop: "-150px" }}
            />
            {this.state.isEditMode && this.state.jobToEdit ? (
              <EditJob
                isEditMode={this.state.isEditMode}
                handleCancelEdit={this.handleCancelEdit}
                handleSaveEdit={this.handleSaveEdit}
                job={this.state.jobToEdit}
              />
            ) : null}
          </div>
        ) : null}
        {this.state.activeItem === "manageAccount" ? (
          <ManageAccount handleLogout={this.props.handleLogout} />
        ) : null}
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Loading account" />
        </Dimmer>
      </div>
    );
  }
}

export default withToastManager(Account);
