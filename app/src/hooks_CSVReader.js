import React, {useState, useEffect} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import Loader from 'react-loader-spinner';



 // const fieldsByIndex = {};
 // const fieldNames = ['label', 'country'];   
 //    const [fieldNames, setFieldNames] = useState(['StudentLastName',	'StudentFirstName',	
 // 'Studentemail', 'ParentLastName',	'ParentFirstName', 'ParentPhone',	'Parentemail']);

function Hooks_CSVReader() {
  const [infoCSV, setInfoCSV] = useState([]);
  const [loadingData, setLoading] = useState(false);
  const [fieldsByIndex, setFieldsByIndex] = useState({});
  // const [fieldNames, setFieldNames] = useState(['label', 'country']);
  const [fieldNames, setFieldNames] = useState(['StudentLastName',	'StudentFirstName']);
  const [newData, addNewData] = useState({});

  const school_id = "4187269f-d1fa-41fe-ad34-2e7d74a9031a";
  const parent_id = "8b4eb7b4-893c-4bb2-8bbe-b75c4223854e";


 const handleData = (data) => {

    setInfoCSV([]);
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

  
  const findFieldIndex = (arr, fieldName) => {
    if(arr.length) {
     
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
        if(infoCSV.length) {
         // console.log('current element is >> ', element);
           fieldsByIndex[`${element}`] = findFieldIndex(infoCSV, element);
         
          //setFieldsByIndex({...fieldsByIndex , [element] : findFieldIndex(infoCSV, element)  })
          
           console.log('Scrub FBI   ',fieldsByIndex);
        }
    }); 
  }



  useEffect(() => {
       const showData = info => {
            console.log('showData info >>> ', info);
       }
    
      scrubCSV(fieldsByIndex, infoCSV, fieldNames);
      
      
      
      // const newStudentPayload = {
      //   ...studentInfo,
      //   field_trip_id: match.params.id,
      //   school_id: user.school_id
      // };

        //  // Emulation
        //  const [studentInfo, setStudentInfo] = useState({
        //   first_name: "",
        //   last_name: "",
        //   parent_id: ""
        // });
      // const { first_name, last_name, field_trip_id, school_id, parent_id } = req.body;  

      // // const [newData, addNewData] = useState({});
      // const _handle_CSV_Row = (fieldsByIndex, infoCSV) => {
      //   for(let i = 1; i < infoCSV.length; i++) {
      //     infoCSV[i]

      //   }


      // }

      //showData(infoCSV);
      

  }, [infoCSV])

  return (
    <div >
      <Container  >
        <CSVReader
          label = 'Hooks-Choose your CSV file'
          onFileLoaded = { (data) => handleData(data)}
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
