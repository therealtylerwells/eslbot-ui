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
            <Link href="/post"><a>eslbot.com/post</a></Link>
            <br/><br/><p>posting jobs is free and you can post as many as you want</p>
            <p>Unregistered users cannot edit or delete their job postings. The job postings will expire in 60 days.</p>
            <p>Registered users can edit, delete, and renew job postings. Registering is quick and easy (we don't even ask you to verify your email).</p>
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