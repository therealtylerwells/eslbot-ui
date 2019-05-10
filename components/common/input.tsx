import React from 'react';
import { Form } from 'semantic-ui-react';
{/* 
// @ts-ignore */}
import { string } from 'prop-types';

interface headProps {
  placeholder: string;
  label: string;
}

const input = (props: headProps) => {
  return (
    <React.Fragment>
      <Form>
        <Form.Field>
          <label>{props.label}</label>
          <input
            placeholder={props.placeholder}
          />
        </Form.Field>
      </Form>
    </React.Fragment>
  )
}

export default input;