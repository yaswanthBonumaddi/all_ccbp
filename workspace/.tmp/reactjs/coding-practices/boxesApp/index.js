const Box = props => {
  //  Write your code here.
  {className,message}=props;
  return (
      <div className = `box {className}`>
          <h1 className="title">{message}</h1>
      </div>
  );
}

const element = (
  //  Write your code here. 
  <div className="main-container">
      <h1 className="heading">Boxes</h1>
      <div className="container">
         <Box className = "box1" message = "Small"/>
         <Box className = "box2" message = "Medium"/>
         <Box className = "box2" message = "Large"/>
      </div>
  </div>
)

ReactDOM.render(element, document.getElementById("root"));