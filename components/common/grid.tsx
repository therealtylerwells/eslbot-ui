interface gridProps {
  children: unknown;
  style?: {};
}

const Row = (props: gridProps) => {
  return (
    <div className="row">
      {props.children}
    <style jsx>{`
      .row {
        display: flex;
        flex-direction: row;
        margin: 25px 0 0 0;
      }
      @media (max-width: 900px) { 
        .row {
          display: block;
          margin: 0px;
        }
       }
    `}</style>
    </div>
  )
}

const Column = (props: gridProps) => {
  return (
    <div {...props} className="column">
      {props.children}
      {/* 
      // @ts-ignore */}
    <style jsx>{`
      .column {
        flex: 1;
        margin: 0 5px 0 5px;
      }
      @media (max-width: 900px) { 
        .column {
          margin: 15px 5px 15px 0px;
        }
       }
    `}</style>  
    </div>
  )
}

export {
  Row,
  Column
}