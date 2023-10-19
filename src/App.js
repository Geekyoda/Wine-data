

import React from 'react';
import FlavanoidsStatistics from './componenets/FlavanoidsStatistics'; // Import FlavanoidsStatistics component
import GammaStatistics from './componenets/GammaStatistics'; // Import GammaStatistics component

function App() {
  return (
    <div>
      <h1>Flavanoids Statistics</h1>
      <FlavanoidsStatistics /> {/* Render FlavanoidsStatistics component */}
      <h1>Gamma Statistics</h1>
      <GammaStatistics /> {/* Render GammaStatistics component */}
    </div>
  );
}

export default App;



