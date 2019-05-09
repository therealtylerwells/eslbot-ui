import React, { Component } from 'react'
import Head from '../components/common/head'
import Nav from '../components/common/nav'
import Search from '../components/common/search';
import SearchResults from '../components/searchResults'
import fetch from 'isomorphic-unfetch'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

class Home extends Component {
  state = {
    loading: false,
    data: this.props.jobs,
  }

  onSearch = (event, query) => {
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
        .catch(error => console.log(error))
    } else {
      alert('derp')
    }
  }

  render() {
    return (
      <div className="shared">
        <Head title="eslbot" />
        <Nav />
        <Search onSearch={this.onSearch} />
        <SearchResults results={this.state.data} />
        <Dimmer inverted active={this.state.loading}>
          <Loader content="Finding jobs" />
        </Dimmer>
      </div>
    )
  }
}

Home.getInitialProps = async function () {
  const res = await fetch('http://144.202.96.77:3000/api/jobs?access_token=sGl3FrM4HkmKDzpAVdCwEqC5bjdNX7HfLJUbeq6G6sTvzwHG5wCDQojQyP7UV2XV')
  const data = await res.json()
  const jobs = data.splice(0, 5)

  return {
    jobs: jobs,
  }
}

export default Home
