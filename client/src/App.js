import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedin, setLoggedin] = useState(false);

  return (
    <div>
      {
        !loggedin ? 
          <Login setLoggedin={setLoggedin} /> :
          <Dashboard />
      }
    </div>
  );
}

export default App;
