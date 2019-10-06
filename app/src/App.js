import React, {useState} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import 'react-loader-spinner';

function App() {
 const [infoCSV, setInfoCSV] = useState([ ]);

  const handleData = data => {
    console.log('data is ', data);
    setInfoCSV(data);
  }

  const handleError = (err) => {
    console.log('Error msg is >>>>> ', err);
  }

  console.log('CSV info >>> ', infoCSV);
  
  return (
    <div >
      <Container  >
        <CSVReader
          label = 'Choose your CSV file'
          onFileLoaded = {handleData}
          onError = {handleError}
          inputId="ObiWan"
          inputStyle={{border: '1px solid blue', color: 'deeppink'}}
          inputType = "color"
          inputValue="#e66465"
        />
      </Container>

      <input type="color" id="head" name="head" readOnly value="#e66465"
   />


    </div>
  );
}

export default App;
