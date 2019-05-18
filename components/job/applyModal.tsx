import React, { Component } from "react";
import { Form, Modal, Button, Image, Header, Flag } from "semantic-ui-react";
import { Row, Column } from "../common/grid";
import Autocomplete from "react-autocomplete";
import { matchStateToTerm, getStates } from "../../utils/countrySelect";

interface applyModalProps {
  style: any;
}

interface applyModalState {
  name: string;
  email: string;
  nationality: string;
  degree: boolean;
  currentLocation: string;
  message: string;
}

class ApplyModal extends Component<applyModalProps, applyModalState> {
  state = {
    name: "",
    email: "",
    nationality: "",
    degree: false,
    currentLocation: "",
    message: ""
  };
  render() {
    return (
      <Modal
        trigger={<Button primary>Apply Now</Button>}
        style={this.props.style}
      >
        <Modal.Header>Contact this employer</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="small"
            src="https://cdn.pixabay.com/photo/2013/07/13/13/41/balloon-161384_960_720.png"
          />
          <Modal.Description style={{ width: "100%" }}>
            <Header>We'll send an email to the employer on your behalf. You just fill out the info!</Header>
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
                      fontWeight: "bold",
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
                      width: '100%',
                      marginTop: '3px',
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
            <br/>
            <Button primary>Send now</Button>
          </Modal.Description>
        </Modal.Content>
        <style jsx>{`
          .item-highlighted {
            font-weight: bold;
            font-size: 1.05em;
            cursor: pointer;
            padding: 2.5px 0;
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
          }
        `}</style>
      </Modal>
    );
  }
}

export default ApplyModal;
