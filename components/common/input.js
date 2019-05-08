import { Form } from 'semantic-ui-react';

const input = (props) => {
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