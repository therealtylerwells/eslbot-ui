import React from 'react';
import Nav from './nav';
import Head from './head';

interface layoutProps {
  children: unknown;
  title?: string;
  userId?: string;
}
const layout = (props: layoutProps) => {
  return (
    <div style={{'width':'90%', 'margin': '0 auto'}}>
      <Nav userId={props.userId}/>
      {/* 
      // @ts-ignore */}
      <Head title={props.title}/>
      {props.children}
    </div>
  )
}

export default layout;