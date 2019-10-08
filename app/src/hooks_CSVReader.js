import React, {useState} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import Loader from 'react-loader-spinner';

function Hooks_CSVReader() {
 const [infoCSV, setInfoCSV] = useState([]);
 const [loadingData, setLoading] = useState(false);

  const handleData = (data) => {

    setLoading(true);    
    setTimeout( ()=> {
      console.log('inside setTimeout');
      console.log('inside setTimeout infoCSV >>> ', infoCSV);
      setInfoCSV(data)
      showData(infoCSV); // Renders immediat
      setLoading(false);  
    }, 2000);
    
  }

  const handleError = (err) => {
    console.log('Error msg is >>>>> ', err);
  }

  const showData = info => {
    console.log('showData info >>> ', info);
  }

  console.log('CSV info >>> ', infoCSV);
  
  return (
    <div >


      <Container  >
        <CSVReader
          label = 'Hooks-Choose your CSV file'
          // onFileLoaded = {handleData}  doesnot immediately update state
            onFileLoaded = { (data) => {
           // setInfoCSV(data)
            console.log('anonymous func set infoCSV >>> ', infoCSV);
            // at timeout here ?
            handleData(data);
       
          } }
          onError = {handleError}
          inputId="CSVstyling"
          inputStyle={{border: '1px solid blue', color: 'deeppink'}}
          inputType = "color"
          inputValue="#e66465"
        />
      </Container>

      <input type="color" id="head" name="head" readOnly value="#e66465"/>

      <div style = {{ border: '1px solid red', display: 'flex', width: '100%', justifyContent: 'center'}}>
      
      {loadingData 
        ? 
            <Loader style = {{border: '1px solid blue', display: 'flex', justifyContent: 'center'}}
                    width = {25} height= {25} color = 'purple' type = 'TailSpin'/> 
        : null
    }
      
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
          null 
          
      }
      </div>

    </div>
  );
}

export default Hooks_CSVReader;