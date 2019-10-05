import React, {useState} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';


function App() {
 const [infoCSV, setInfoCSV] = useState([ ]);

  const handleData = data => {
    console.log('data is ', data);
    setInfoCSV(data);
  }

  console.log('CSV info >>> ', infoCSV);
  // console.log('CSV info >>> ', infoCSV);
  return (
    <div >
      <Container>
        <CSVReader
          label = 'Choose your CSV file'
          onFileLoaded = {handleData}
        />
      
      </Container>


    </div>
  );
}

export default App;
