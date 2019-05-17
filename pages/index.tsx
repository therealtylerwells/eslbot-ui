import React from 'react'
import Search from '../components/common/search';
// @ts-ignore
import SearchResults from '../components/searchResults'
import { Dimmer, Loader } from 'semantic-ui-react';
import { HTTPResponseType } from '../types/types';
import Axios from 'axios';

type indexProps = {
  response: HTTPResponseType;
}

type indexState = {
  jobs: any;
  loading: boolean;
}

class Home extends React.Component<indexProps, indexState> {
  state = {
    loading: true,
    jobs: [],
  }

  componentDidMount() {
    this.setState({ jobs: this.props.response, loading: false})
  }

  onSearch = (event: any, query: string) => {
    this.setState({loading: true})
    event.preventDefault();
    if (query !== '') {
      this.setState({ loading: true, jobs: [] })
      Axios.get('http://localhost:4000/search?param=' + query)
        .then(response => {
          if (response.data.success) {
            this.setState({ jobs: response.data.response, loading: false })
          } else {
            this.setState({ loading: false })
          }
        })
    } else {
      alert('derp')
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <div>
        {/* 
        // @ts-ignore */
        }
        <Search onSearch={this.onSearch} />
        {!this.state.loading ? <SearchResults results={this.state.jobs} /> : null}
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Doing robot things" />
        </Dimmer>
      </div>
    )
  }
}

export default Home
