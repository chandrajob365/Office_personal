import React from "react";
import { render } from "react-dom";
const seatNoGenerator = require("./seat-no-generator");

const App = () => {
  const [num, setNumber] = React.useState("XXXXX");

  function onClick() {
    const num = seatNoGenerator();
    setNumber(num);
  }

  return (
    <div className="container">
      <h2>Seat Number: {num}</h2>
      <button onClick={onClick}>Generate Number</button>
    </div>
  );
};

render(<App />, document.getElementById("app"));
