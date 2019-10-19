import React, {useState, useEffect} from 'react';
import {Container, Dropdown, Grid, Label} from 'semantic-ui-react';
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
  const [fieldNames, setFieldNames] = useState([]);

  const [dropdownNames, setdropdownNames] = useState([{key: '', text: '', value: ''}]);
  const [dropdownSelected, addDropDownSelected] = useState(['default']);
  const [value, setValue] = useState(0);

  // fields that need to be gotten
  const USERschool_id = "4187269f-d1fa-41fe-ad34-2e7d74a9031a";
  const FOUNDparent_id = "8b4eb7b4-893c-4bb2-8bbe-b75c4223854e";

  // Default fields needed
  const [matchCSV, updatematchCSV] = useState({
    index_student_first_name: '', // set this to CSV index that holds student first name
    index_student_last_name: '',
    index_parent_first_name: '', // set this to CSV index that holds student first name
    index_parent_last_name: '',
    index_parent_email: '',
    index_parent_phone: '',
  });

  // 
  const [newDataRow, updateNewDataRow] = useState({
    student_first_name: '', 
    student_last_name: '',
    parent_first_name: '', 
    parent_last_name: '',
    parent_email: '',
    parent_phone: '',
    school_id: USERschool_id,
    parent_id: FOUNDparent_id,
  });


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
    //  scrubCSV(fieldsByIndex, infoCSV, fieldNames)
      setLoading(false); 
     // setFieldNames(data[0]); 
    }, 2000);
    
    setFieldNames(data[0]); 
    // showData(infoCSV);
    // scrubCSV(fieldsByIndex, infoCSV, fieldNames)
  }

  const handleError = (err) => {
    console.log('Error msg is >>>>> ', err);
  }

  
  
  const findFieldIndex = (arr, fieldName, fieldNames) => {
    if(arr.length) {
      console.log('fieldnames in CSV are: ', fieldNames);
      let currentIndex = null;
      console.log('current fieldName', fieldName);
   //   currentIndex = titleBar.indexOf(`${fieldName}`);
      currentIndex = fieldNames.indexOf(`${fieldName}`);
      console.log('curentIndex ', currentIndex);
      return currentIndex;
      }
    return -1;
        
  }

  const _handleDropDown = (e, data) => {
    console.log(' $$$$$$ current dropdown data  is ', data);
    console.log(' $$$$$$ curent key is at ', data.value)
    setValue(data.value);

  }

  const scrubCSV = (fieldsByIndex, infoCSV, fieldNames ) => {
    fieldNames.forEach( (element, index) => {
        if(infoCSV.length) {
         // console.log('current element is >> ', element);
         fieldsByIndex[`${element}`] = findFieldIndex(infoCSV, element, fieldNames); // works
         // setFieldsByIndex({...fieldsByIndex , [element]: findFieldIndex(infoCSV, element, fieldNames)  }) // nooo
         // setFieldsByIndex( fieldsByIndex[`${element}`] = findFieldIndex(infoCSV, element)  ) // error on second run
           console.log('Scrub FBI   ',fieldsByIndex);

        }
    
    }); 
  
    setdropdownNames(
      fieldNames.map( (item, index) => {
       return {key: index, text: item, value: index}
      }))

  }

  const addFieldName = info => {
       console.log('showData info >>> ', info);
  }

  useEffect(()=> {
    console.log('!!!!!!!!!!!!  showing dropdownNames ', dropdownNames);
    // console.log('!!!!!!!!!!!!  showing names ', names);
  }, [dropdownNames] )



  useEffect(() => {  
    console.log('scrubCSV called');
    // console.log('getCSVfieldNames shows', fieldNames); 
      scrubCSV(fieldsByIndex, infoCSV, fieldNames);       
      
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
    
    
    
    {fieldNames.length 
      ? 
      <Container>
      <p>length is {fieldNames.length}</p>
      
      
      {fieldNames.map((item,id) => (
        <li key = {id}>
        {item}  
        </li>
        )          
        )}
        
       
        <Grid columns = {2} divided style = {{width: '50%'}}>
          <Grid.Column>
            <Label> Student First Name: {value}</Label>
            <Dropdown
            text = "Student first name"
            options = {dropdownNames}
            fluid
            selection
            value = {value}
            onChange = {_handleDropDown}
            />
          </Grid.Column>
          <Grid.Column>
            <Label> Student Last Name {value}</Label>
            <Dropdown
            text = "Student first name"
            options = {dropdownNames}
            fluid
            selection
            value = {value}
            onChange = {_handleDropDown}
            />
          </Grid.Column>
        
        
        </Grid>  
        
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
    
    // const newStudentPayload = {
      //   ...studentInfo,
      //   field_trip_id: match.params.id,
      //   school_id: user.school_id
      // };
      
      // const { first_name, last_name, field_trip_id, school_id, parent_id } = req.body;  
      // const [newDataRow, updateNewDataRow] 
      
      
      // // const [newData, addNewData] = useState({});
      
      // const _handle_CSV_Row = (fieldsByIndex, infoCSV) => {
        //   for(let i = 1; i < infoCSV.length; i++) {
          //     infoCSV[i]
          
          //   }
          
          
          // }
          
          //showData(infoCSV);
          
          */


            // const options = [
            //   { key: 1, text: 'One', value: 1 },
            //   { key: 2, text: 'Two', value: 2 },
            //   { key: 3, text: 'Three', value: 3 },
            // ]
          
            // const options2 = [
            //   { key: 0, text: 'First', value: 'firsty' },
            //   { key: 1, text: 'Second', value: 'secondy'},
            //   { key: 2, text: 'Last', value: 'thirdy' },
            // ]
