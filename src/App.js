import React from "react";
import './App.css';
import Banner from './Banner';
import Bento from './Bento';

function App() {
  return (
    <div className="App">
      <Banner
        text={'Brandon Sabino'}
        subtext={'Frontend Developer'}
        employer={''}
        employerURL={''}
        prompt={'Get to know me?'}
      />
      <Bento />
    </div>
  );
}

export default App;
