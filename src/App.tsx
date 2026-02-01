import React from "react";
import './App.css';
import WelcomeSection from './components/WelcomeSection';
import HexMap from './components/HexMap';
import './components/HexMap.css';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <WelcomeSection />
      <section className="honeycomb-section">
        <HexMap />
      </section>
    </div>
  );
}

export default App;
