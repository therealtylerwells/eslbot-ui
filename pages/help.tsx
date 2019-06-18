import React, { Component } from 'react';
import { Accordion, Icon, AccordionTitleProps } from 'semantic-ui-react'
import Link from 'next/link'

class Help extends Component {
  state = {
    activeIndex: -1
  }

  handleClick = (e: React.SyntheticEvent, titleProps: AccordionTitleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    typeof e
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        {/* 
      // @ts-ignore */}
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              what is eslbot?
            </strong>
          </Accordion.Title>
          <Accordion.Content style={styles.content} active={activeIndex === 0}>
            <p>
              We exist so users can search, post, and apply for ESL and TEFL jobs worldwide, as well as use forums and find aggregated job listings from around the internet.<br/>
              We opened in 2019 because there was a lack of modern TEFL and ESL job search websites.<br/>
            </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I contact eslbot?
            </strong>
          </Accordion.Title>
          <Accordion.Content style={styles.content} active={activeIndex === 1}>
            email <a href="mailto:admin@eslbot.com">admin@eslbot.com</a>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I delete, edit, or view a list of my job postings?
            </strong>
          </Accordion.Title>
          <Accordion.Content style={styles.content} active={activeIndex === 2}>
            <p>
              account > my jobs
          </p>
          </Accordion.Content>
          <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I change my password?
            </strong>
          </Accordion.Title>
          <Accordion.Content style={styles.content} active={activeIndex === 3}>
            <p>
              account > manage my account
          </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I post a job?
            </strong>
          </Accordion.Title>
          <Accordion.Content style={styles.content} active={activeIndex === 4}>
            <Link href="/post"><a>You can post jobs at this link</a></Link>
            <br/><br/><p>posting jobs is free and you can post as many as you want</p>
            <p>Unregistered users job posts are posted within 24 hours, pending approval. They cannot be deleted or edited and will expire in 60 days.</p>
            <p>Registered users job posts are posted immediately. They can be edited, deleted, or renewed. Registering is quick and easy (we don't even ask you to verify your email).</p>

          </Accordion.Content>

          <Accordion.Title active={activeIndex === 5} index={5} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I advertise on eslbot?
            </strong>
          </Accordion.Title>
          <Accordion.Content style={styles.content} active={activeIndex === 5}>
            email <a href="mailto:admin@eslbot.com">admin@eslbot.com</a>
          </Accordion.Content>
        </Accordion>
        </div>
    )
  }
}

const styles = {
  content: {
    marginLeft: '20px',
  }
}

export default Help;