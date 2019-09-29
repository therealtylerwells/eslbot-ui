import React from "react";
import Search from "../components/common/search";
// @ts-ignore
import SearchResults from "../components/searchResults";
import { Dimmer, Loader, Image } from "semantic-ui-react";
import { HTTPResponseType } from "../types/types";
import Axios from "axios";
// @ts-ignore
import { withToastManager } from "react-toast-notifications";
import { JobType } from "../types/types";
import Head from "../components/common/head";

type indexProps = {
  response: HTTPResponseType;
  docCount: number | undefined;
};

type indexState = {
  jobs: JobType[];
  loading: boolean;
  docCount: number | undefined;
};

class Home extends React.Component<indexProps, indexState> {
  state = {
    loading: true,
    jobs: [],
    docCount: undefined
  };

  componentDidMount() {
    this.setState({ jobs: this.props.response as any, docCount: this.props.docCount, loading: false });
  }

  onSearch = (event: React.SyntheticEvent, query: string) => {
    this.setState({ loading: true });
    event.preventDefault();
    if (query !== "") {
      this.setState({ loading: true, jobs: [] });
      Axios.get("https://api.eslbot.com/api/search?param=" + query).then((response) => {
        if (response.data.success) {
          this.setState({ jobs: response.data.response, docCount: response.data.docCount, loading: false });
        } else {
          this.setState({ loading: false });
        }
      });
    } else {
      alert("derp");
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div>
        <Head
          title="eslbot | esl jobs worldwide"
          description={"Search, post, and apply for ESL, TEFL, and English teaching jobs in China, Korea, Thailand, Japan, and worldwide."}
        />
        <div style={{ textAlign: "center" }}>
          <Image wrapped size="tiny" src="https://image.freepik.com/free-vector/illustration-robot_53876-5576.jpg" />
        </div>
        <p style={{ textAlign: "center" }}>
          Search, post, and apply for overseas English, ESL, and TEFL teaching jobs in Japan, South Korea, China, Thailand, and everywhere else
          <br />
        </p>
        {/* 
        // @ts-ignore */}
        <p style={{ fontSize: "8px", textAlign: "center" }}>{this.state.docCount} jobs posted in the last 90 days</p>
        <Search onSearch={this.onSearch} />
        {!this.state.loading ? <SearchResults results={this.state.jobs} docCount={this.state.docCount} /> : null}
        <Dimmer inverted active={this.state.loading}>
          <Loader content="loading jobs" />
        </Dimmer>
      </div>
    );
  }
}

export default withToastManager(Home);
