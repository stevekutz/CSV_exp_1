import React, {useState} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import Loader from 'react-loader-spinner';
import Hooks_CSVReader from './hooks_CSVReader';
// import State_CSVReader from './state_CSVReader';
// import DropDownTest from './DropDownTest';

function App() {
 
  
  return (
    <div style = {{border: '4px solid purple', display: 'flex', flexDirection: 'column'}}>
      <div style = {{border: '1px solid seagreen', width: '80%', margin: '0 auto'}}>
        <Hooks_CSVReader />
        
      </div>


      

    </div>
  );
}

export default App;
