import { Button, Form } from 'semantic-ui-react';
import React from 'react';

type searchProps = {
  onSearch: any;
}

type searchState = {
  query: string;
}

class Search extends React.Component<searchProps, searchState> {
  state = {
    query: '',
  }
  render() {
    return (
      <div className="main">
        <Form>
          <Form.Input
            style={{'width': '220px', 'marginRight': '5px', 'position': 'relative', 'top': '1px' }}
            icon="globe"
            iconPosition="left"
            placeholder="keyword, city, or country"
            onChange={() => this.setState({ query: event!.target as HTMLInputElement ? (event!.target as HTMLInputElement).value : ''})}
          />
          <Button onClick={(event) => this.props.onSearch(event, this.state.query)}>
            Search
        </Button>
        </Form>
      {/* 
      // @ts-ignore */}
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