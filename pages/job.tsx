import { Component } from "react";
import fetch from "isomorphic-unfetch";
import InternalJob from "../components/job/internalJob";
import Router from "next/router";
import { JobType } from "../types/types";
import { Dimmer, Loader } from "semantic-ui-react";
import { HTTPResponseType } from '../types/types'

type jobProps = {
  response: HTTPResponseType;
  data: JobType[];
};

type jobState = {
  job: JobType;
  loading: boolean;
};

class Job extends Component<jobProps, jobState> {
  state = {
    loading: true,
    job: undefined as any
  };
  componentDidMount = async () => {
    const id = Router.router!.query!.id;
    const res = await fetch("https://api.eslbot.com/job?jobId=" + id);
    const data = await res.json();
    this.setState({ job: data.job, loading: false });
  };
  render() {
    return this.state.job ? (
      <InternalJob job={this.state.job} />
    ) : (
      <Dimmer inverted active={this.state.loading}>
        <Loader content="Loading job" />
      </Dimmer>
    );
  }
}

export default Job;
