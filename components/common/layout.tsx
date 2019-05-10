import React from 'react';
import Nav from './nav';
import Head from './head';

interface layoutProps {
  children: unknown;
}
const layout = (props: layoutProps) => {
  return (
    <React.Fragment>
      <Nav />
            {/* 
      // @ts-ignore */}
      <Head />
      {props.children}
      <p>Footer</p>
    </React.Fragment>
  )
}

export default layout;