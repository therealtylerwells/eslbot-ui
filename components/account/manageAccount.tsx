import { Button } from "semantic-ui-react";

const manageAccount = (props: any) => {
  return (
    <div>
      <Button secondary onClick={props.handleLogout}>update email address</Button>
      <Button secondary onClick={props.handleLogout}>change password</Button>
      <Button secondary onClick={props.handleLogout}>logout</Button>
      <Button secondary onClick={props.handleLogout}>delete account (and all associated jobs)</Button>
    </div>
  )
}

export default manageAccount