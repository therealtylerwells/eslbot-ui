const Row = (props) => {
  return (
    <div className="row">
      {props.children}
    <style jsx>{`
      .row {
        display: flex;
        flex-direction: row;
        margin: 25px 0 0 0;
      }
    `}</style>  
    </div>
  )
}

const Column = (props) => {
  return (
    <div className="column">
      {props.children}
    <style jsx>{`
      .column {
        flex: 1;
        margin: 0 5px 0 5px;
      }
    `}</style>  
    </div>
  )
}

export {
  Row,
  Column
}