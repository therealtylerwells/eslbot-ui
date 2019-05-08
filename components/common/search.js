import { Button, Input, Form } from 'semantic-ui-react';
import React, { Component } from 'react';

class Search extends Component {
  state = {
    query: '',
  }
  render() {
    return (
      <div className="main">
        <Form>
          <Form.Input
            style={{ 'width': '220px', 'marginRight': '5px', 'position': 'relative', 'top': '1px' }}
            icon="globe"
            placeholder="keyword, city, or country"
            onChange={() => this.setState({ query: event.target.value })}
          />
          <Button onClick={(event) => this.props.onSearch(event, this.state.query)}>
            Search
        </Button>
        </Form>
        <style jsx>{`
        .main {
          text-align: center;
        }
      `}</style>
      </div>
    )
  }
}

export default Search;