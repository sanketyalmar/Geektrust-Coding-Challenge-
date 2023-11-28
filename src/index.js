import * as React from "react";
import * as ReactDOM from "react-dom";
import Demo from "./App";

function App() {
  return (
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
