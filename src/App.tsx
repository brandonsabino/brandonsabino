import React from "react";
import './App.css';
import WelcomeSection from './components/WelcomeSection';
import ContentSection from './components/ContentSection';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <WelcomeSection />
      <ContentSection />
    </div>
  );
}

export default App;
