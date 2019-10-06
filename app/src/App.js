import React, {useState} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import Loader from 'react-loader-spinner';

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
          inputId="CSVstyling"
          inputStyle={{border: '1px solid blue', color: 'deeppink'}}
          inputType = "color"
          inputValue="#e66465"
        />
      </Container>

      <input type="color" id="head" name="head" readOnly value="#e66465"/>

      <div style = {{ border: '1px solid red', display: 'flex', width: '100%', justifyContent: 'center'}}>
      {infoCSV.length 
        ? 
        <Container>
          <p>length is {infoCSV.length}</p>
          {infoCSV.map(item => 
            <ul key = {item[0]}>
              <li>{item[0]}</li>
              <li>{item[1]}</li>
              <li>{item[2]}</li>
              <li>{item[3]}</li>
              <li>{item[4]}</li>
            
            </ul>
            )}
        </Container>
        : 
          <Loader width = {25} height= {25} type = 'Grid'/> 
          
      }
      </div>

    </div>
  );
}

export default App;
