import React from 'react'
import Layout from '../components/common/layout'
import Search from '../components/common/search';
// @ts-ignore
import SearchResults from '../components/searchResults'
import fetch from 'isomorphic-unfetch'
import { Dimmer, Loader } from 'semantic-ui-react';
import { HTTPResponseType } from '../types/types';

type indexProps = {
  data: HTTPResponseType;
}

type indexState = {
  data: any;
  loading: boolean;
}

class Home extends React.Component<indexProps, indexState> {
  state = {
    loading: false,
    data: this.props.data,
  }

  onSearch = (event: any, query: string) => {
    event.preventDefault();
    if (query !== '') {
      this.setState({ loading: true, data: [] })
      fetch('https://api.eslbot.com/search?param=' + query, {
        headers: {
          Accept: 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.setState({ data: json, loading: false })
        })
        .catch(error => alert('Error: ' + error))
    } else {
      alert('derp')
    }
  }

  render() {
    return (
      <Layout title="eslbot">
        {/* 
        // @ts-ignore */
        }
        <Search onSearch={this.onSearch} />
        <SearchResults results={this.state.data} />
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Finding jobs" />
        </Dimmer>
      </Layout>
    )
  }
}

{/* 
  TODO: Figure out this typescript shit
// @ts-ignore */}
Home.getInitialProps = async function () {
  // const res = await fetch('http://144.202.96.77:3000/api/jobs?access_token=sGl3FrM4HkmKDzpAVdCwEqC5bjdNX7HfLJUbeq6G6sTvzwHG5wCDQojQyP7UV2XV')
  const res = await fetch('http://localhost:4000/search?param="China"')
  const data = await res.json()

  return {
    data: data,
  }
}

export default Home
