import React, { Component } from "react";
import { Menu, Dimmer, Loader, Confirm } from "semantic-ui-react";
import Axios from "axios";
import { HTTPResponseType, JobType } from "../types/types";
import MyJobs from "../components/account/myJobs";
import ManageAccount from "../components/account/manageAccount";
import EditJob from "../components/job/editJob";
// @ts-ignore
import { withToastManager } from 'react-toast-notifications';
import Head from "../components/common/head";

type accountProps = {
  handleLogout: () => void;
  toastManager?: any;
  handleChangePassword: () => void;
};

type accountState = {
  userId: string | undefined;
  activeItem: string;
  loading: boolean;
  userJobs: JobType[] | undefined;
  isConfirmOpen: boolean;
  handleCancel?: () => void;
  handleConfirm?: () => void;
  idToDelete?: string;
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
    jobToEdit: undefined,
  };

  componentDidMount = () => {
    this.getMyJobs()
  };

  getMyJobs = async () => {
    const res = await fetch(
      "https://api.eslbot.com/jobs?jobPosterId=" + localStorage.getItem("userId")
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
    Axios.delete("https://api.eslbot.com/job?jobId=" + this.state.idToDelete)
      .then(response => {
        if (response.data.success) {
          const newJobs = this.state.userJobs.filter((el: JobType) => {
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
    Axios.put("https://api.eslbot.com/renew?jobId=" + jobId).then(response => {
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
    const res = await fetch("https://api.eslbot.com/job?jobId=" + jobId);
    const data = await res.json();
    this.setState({ loading: false, jobToEdit: data.job });
  };

  handleCancelEdit = () => {
    this.setState({ loading: false, isEditMode: false})
  }

  handleSaveEdit = (job: JobType) => {
    Axios.put('https://api.eslbot.com/job', job)
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
        <Head title="eslbot | account" description={"Manage your account. Renew, delete, or edit your posted jobs. Change your password. Log out."}/>
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
                job={this.state.jobToEdit!}
              />
            ) : null}
          </div>
        ) : null}
        {this.state.activeItem === "manageAccount" ? (
          <ManageAccount handleLogout={this.props.handleLogout} handleChangePassword={this.props.handleChangePassword}/>
        ) : null}
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Loading account" />
        </Dimmer>
      </div>
    );
  }
}

export default withToastManager(Account);
