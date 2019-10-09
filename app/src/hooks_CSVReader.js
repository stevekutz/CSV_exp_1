import React, {useState, useEffect} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import Loader from 'react-loader-spinner';

const fieldsByIndex = {};
const fieldNames = ['label', 'country'];   

function Hooks_CSVReader() {
 const [infoCSV, setInfoCSV] = useState([]);
 const [loadingData, setLoading] = useState(false);



  const handleData = (data) => {

    setLoading(true);    
    setTimeout( ()=> {
      console.log('inside setTimeout');
      console.log('inside setTimeout infoCSV >>> ', infoCSV);
      setInfoCSV(data)
    //   showData(infoCSV);
    //   scrubCSV(fieldsByIndex, infoCSV, fieldNames)
      setLoading(false);  
    }, 2000);
    
    // showData(infoCSV);
    // scrubCSV(fieldsByIndex, infoCSV, fieldNames)
  }

  const handleError = (err) => {
    console.log('Error msg is >>>>> ', err);
  }

  useEffect(() => {
    const showData = info => {
        console.log('showData info >>> ', info);
      }
    
      const findFieldIndex = (arr, fieldName) => {
                if(infoCSV.length) {
                    //let titleBar = ["label", "population", "country", "x", "y"];
                    let titleBar = arr[0];
                    console.log('titleBar is ', titleBar );
                    let currentIndex = null;
                    console.log('current fieldName', fieldName);
                    currentIndex = titleBar.indexOf(`${fieldName}`);
                    console.log('curentIndex ', currentIndex);
                    return currentIndex;
                }
                return -1;
            
      }
    
      const scrubCSV = (fieldsByIndex ,infoCSV, fieldNames ) => {
        fieldNames.forEach(element => {
            // console.log('current element is >> ', element);
            fieldsByIndex[`${element}`] = findFieldIndex(infoCSV, element);
            // console.log('Scrub FBI   ',fieldsByIndex);
        }); 
    
      }
      showData(infoCSV);
      scrubCSV(fieldsByIndex, infoCSV, fieldNames)
      console.log('>> FBI >> ', fieldsByIndex);
    // return () => {
    //   effect
    // };
  }, [infoCSV])

//   const showData = info => {
//     console.log('showData info >>> ', info);
//   }

//   const findFieldIndex = (arr, fieldName) => {
//             if(infoCSV.length) {
//                 //let titleBar = ["label", "population", "country", "x", "y"];
//                 let titleBar = arr[0];
//                 console.log('titleBar is ', titleBar );
//                 let currentIndex = null;
//                 console.log('current fieldName', fieldName);
//                 currentIndex = titleBar.indexOf(`${fieldName}`);
//                 console.log('curentIndex ', currentIndex);
//                 return currentIndex;
//             }
//             return -1;
        
//   }

//   const scrubCSV = (fieldsByIndex ,infoCSV, fieldNames ) => {
//     fieldNames.forEach(element => {
//         // console.log('current element is >> ', element);
//         fieldsByIndex[`${element}`] = findFieldIndex(infoCSV, element);
//         // console.log('Scrub FBI   ',fieldsByIndex);
//     }); 

//   }

  console.log('CSV info >>> ', infoCSV);
  
  /////
//   if(infoCSV) {
//       console.log('index is ', findFieldIndex(infoCSV, 'label'));
//       //fieldsByIndex["label"] = findFieldIndex(infoCSV, 'label')
//   }

//   console.log('fieldsByIndex', fieldsByIndex);
//   scrubCSV(fieldsByIndex, infoCSV, fieldNames);

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
        
          {infoCSV.map((item,id) => (
              <div key = {id}>
                {item}  
              </div>
          )
          
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

/*
            {infoCSV.map(item => 
            <ul key = {item[0]}>
              <li>{item[0]}</li>
              <li>{item[1]}</li>
              <li>{item[2]}</li>
              <li>{item[3]}</li>
              <li>{item[4]}</li>
            
            </ul>
            )}
*/