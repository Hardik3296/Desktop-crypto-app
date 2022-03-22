import React from 'react';
import {Route, HashRouter, Routes} from "react-router-dom";
import Home from "./screens/Home";

const App = (): React.ReactElement=> {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
