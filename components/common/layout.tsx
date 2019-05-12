import React from 'react';
import Nav from './nav';
import Head from './head';

interface layoutProps {
  children: unknown;
  title?: string;
}
const layout = (props: layoutProps) => {
  return (
    <div style={{'width':'90%', 'margin': '0 auto'}}>
      <Nav />
      {/* 
      // @ts-ignore */}
      <Head title={props.title}/>
      {props.children}
      <div style={{'marginTop':'500px'}}>
        <span>Footer</span>
      </div>
    </div>
  )
}

export default layout;