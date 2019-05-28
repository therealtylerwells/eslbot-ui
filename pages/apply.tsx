import React, { Component } from "react";
import { Form, Button, Image, Flag, Icon } from "semantic-ui-react";
import { Row, Column } from "../components/common/grid";
import Autocomplete from "react-autocomplete";
import { matchStateToTerm, getStates } from "../utils/countrySelect";
import Router from "next/router";

interface applyProps {
  style: any;
}

interface applyState {
  name: string;
  email: string;
  nationality: string;
  degree: boolean;
  currentLocation: string;
  message: string;
  job: any;
  loading: boolean;
}

class Apply extends Component<applyProps, applyState> {
  state = {
    name: "",
    email: "",
    nationality: "",
    degree: false,
    currentLocation: "",
    message: "",
    loading: false,
    job: {
      jobTitle: "",
      name: "",
      city: "",
      country: ""
    }
  };

  componentDidMount = async () => {
    const id = Router.router!.query!.id;
    const res = await fetch("http://localhost:4000/job?jobId=" + id);
    const data = await res.json();
    this.setState({ job: data.job, loading: false });
  };

  render() {
    return this.state.job ? (
      <div className="container">
        <Row>
          <Column style={{ flex: 4 }}>
            <div style={{ textAlign: "center" }}>
              <Image
                wrapped
                size="small"
                src="https://upload.wikimedia.org/wikipedia/commons/3/38/Robot-clip-art-book-covers-feJCV3-clipart.png"
              />
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                marginRight: "50px"
              }}
            >
              <h4 style={{ marginBottom: "5px" }}>You're applying for</h4>
              <p>{this.state.job.jobTitle}</p>
              <p>
                <Icon name="building" />
                {this.state.job.name}
              </p>
              <p>
                <Icon name="globe" />
                {this.state.job.city}, {this.state.job.country}
              </p>
            </div>
          </Column>
          <Column style={{ flex: 8 }}>
            <Form>
              <Row>
                <Column>
                  <Form.Input
                    label="Your Name"
                    onChange={() =>
                      this.setState({
                        name: (event!.target as HTMLInputElement).value
                      })
                    }
                  />
                </Column>
                <Column>
                  <Form.Input
                    label="Your Email Address"
                    onChange={() =>
                      this.setState({
                        email: (event!.target as HTMLInputElement).value
                      })
                    }
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <span
                    style={{
                      color: "rgba(0,0,0,.87)",
                      fontSize: ".92857143em",
                      fontWeight: "bold"
                    }}
                  >
                    What's your nationality?
                  </span>
                  <br />
                  <Autocomplete
                    value={this.state.nationality}
                    inputProps={{ id: "adsfasdf" }}
                    wrapperStyle={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                      marginTop: "3px"
                    }}
                    items={getStates()}
                    autoHighlight
                    getItemValue={item => item.name}
                    shouldItemRender={matchStateToTerm}
                    onChange={(event, nationality) => {
                      // using event so typescript will leave me alone wtf typescript
                      typeof event;
                      this.setState({ nationality });
                    }}
                    onSelect={nationality => this.setState({ nationality })}
                    renderMenu={children => (
                      <div className="menu">{children}</div>
                    )}
                    renderItem={(item, isHighlighted) => (
                      <div
                        className={`item ${
                          isHighlighted ? "item-highlighted" : ""
                        }`}
                        key={item.abbr}
                      >
                        <Flag name={item.abbr} />
                        {item.name}
                      </div>
                    )}
                  />
                </Column>
                <Column>
                  <Form.Input
                    name="currentLocation"
                    label="Where do you currently live?"
                    onChange={() =>
                      this.setState({
                        currentLocation: (event!.target as HTMLInputElement)
                          .value
                      })
                    }
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Form.TextArea
                    name="message"
                    label="Write a message to the employer"
                    placeholder="Include information about your experience, education, nationality, and personality. Be careful about providing detailed personal information like identification numbers. Wait until you've received a response, at least."
                    onChange={() =>
                      this.setState({
                        message: (event!.target as HTMLInputElement).value
                      })
                    }
                  />
                </Column>
              </Row>
            </Form>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button primary>Apply now</Button>
              <br />
              <br />
              <a>How does applying work?</a>
            </div>
          </Column>
        </Row>
        <style jsx>{`
          .item-highlighted {
            font-weight: bold;
            font-size: 1.05em;
            cursor: pointer;
            padding: 2.5px 0;
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
          }
          ,
          .container {
            width: 100%;
            margin: 0 auto;
          }
          .image {
            margin-right: 100px;
            background-color: red;
            border: 1px solid black;
          }
        `}</style>
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}

export default Apply;
