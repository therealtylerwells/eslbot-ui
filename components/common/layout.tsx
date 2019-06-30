import React from 'react';
import Nav from './nav';
import Head from './head';
import { Component } from 'react';
import { initGA, logPageView } from '../../utils/analytics'


interface ILayoutProps {
  children: unknown;
  title?: string;
  userId?: string;
}

interface ILayoutState {}
class layout extends Component<ILayoutProps, ILayoutState> {
  componentDidMount() {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA()
      // @ts-ignore
      window!.GA_INITIALIZED! = true
    }
    logPageView()
  }
  render() {
    return (
      <div style={{'width':'90%', 'margin': '0 auto'}}>
        <Nav userId={this.props.userId!}/>
        {/* 
        // @ts-ignore */}
        <Head title={this.props.title}/>
        {this.props.children}
      </div>
    )  
  }
}

export default layout;