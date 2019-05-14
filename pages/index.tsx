import React from 'react'
import Search from '../components/common/search';
// @ts-ignore
import SearchResults from '../components/searchResults'
import fetch from 'isomorphic-unfetch'
import { Dimmer, Loader } from 'semantic-ui-react';
import { HTTPResponseType } from '../types/types';

type indexProps = {
  response: HTTPResponseType;
}

type indexState = {
  jobs: any;
  loading: boolean;
}

class Home extends React.Component<indexProps, indexState> {
  state = {
    loading: false,
    jobs: [],
  }

  componentDidMount() {
    this.setState({ jobs: this.props.response, loading: false})
  }

  onSearch = (event: any, query: string) => {
    event.preventDefault();
    if (query !== '') {
      this.setState({ loading: true, jobs: [] })
      fetch('https://api.eslbot.com/search?param=' + query, {
        headers: {
          Accept: 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.setState({ jobs: json, loading: false })
        })
        .catch(error => alert('Error: ' + error))
    } else {
      alert('derp')
    }
  }

  render() {
    return !this.state.loading ? (
      <div>
        {/* 
        // @ts-ignore */
        }
        <Search onSearch={this.onSearch} />
        <SearchResults results={this.state.jobs} />
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Finding jobs" />
        </Dimmer>
      </div>
    ) : null
  }
}

export default Home
