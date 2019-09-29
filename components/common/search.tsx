import { Button, Form } from "semantic-ui-react";
import React from "react";

type searchProps = {
  onSearch: (event: React.SyntheticEvent, query: string) => void;
};

type searchState = {
  query: string;
};

class Search extends React.Component<searchProps, searchState> {
  state = {
    query: ""
  };
  render() {
    return (
      <div className="main">
        <Form style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Form.Input
            style={{ display: "flex", width: "220px", marginRight: "5px", position: "relative", top: "1px" }}
            icon="globe"
            iconPosition="left"
            placeholder="keyword, city, or country"
            onChange={() => this.setState({ query: (event!.target as HTMLInputElement) ? (event!.target as HTMLInputElement).value : "" })}
          />
          <Button style={{ position: "relative", top: "-6px", height: "38px" }} onClick={(event) => this.props.onSearch(event, this.state.query)}>
            search
          </Button>
        </Form>
        {/* 
      // @ts-ignore */}
        <style jsx>{`
          .main {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Search;
