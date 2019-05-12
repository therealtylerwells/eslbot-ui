import React, { Component } from 'react';
import Head from '../components/common/head'
import Nav from '../components/common/nav'
import { Accordion, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import Layout from '../components/common/layout';

class Help extends Component {
  state = {
    activeIndex: -1
  }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    typeof e
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Layout title="help">
        {/* 
      // @ts-ignore */}
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              what is eslbot?
            </strong>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>eslbot is a website to search for ESL, TEFL, and English teaching jobs overseas</p>
            <p>you can search jobs, post jobs, and find other jobs from around the internet</p>
            <p>there are forums to post about teaching and leave school reviews</p>
            <p>employers can sign up for a streamlined job posting experience</p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I contact eslbot?
            </strong>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              email admin@eslbot.com
          </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I delete, edit, or view a list of my job postings?
            </strong>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              account > my jobs
          </p>
          </Accordion.Content>
          <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how do I change my password, recover my password, update my email address, or delete my account?
            </strong>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
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
          <Accordion.Content active={activeIndex === 4}>
            <Link href="/post"><a>You can post jobs at this link</a></Link>
            <br/><br/><p>posting jobs is free and you can post as many as you want</p>
            <p>Unregistered users job posts are posted within 24 hours, pending approval. They cannot be deleted or edited and will expire in 60 days.</p>
            <p>Registered users job posts are posted immediately. They can be edited, deleted, or renewed. Registering is quick and easy (we don't even ask you to verify your email).</p>

          </Accordion.Content>

          <Accordion.Title active={activeIndex === 5} index={5} onClick={this.handleClick}>
            <Icon name='dropdown' />
            <strong>
              how can I advertise on eslbot?
            </strong>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 5}>
            <p>
              email admin@eslbot.com
          </p>
          </Accordion.Content>

        </Accordion>
        </Layout>
    )
  }
}

export default Help;