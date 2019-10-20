import React, {useState, useEffect} from 'react';
import {Button, Card, Container, Dropdown, Grid, Label} from 'semantic-ui-react';
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

  const [dropdownNames, setdropdownNames] = useState([]);
  const [dropdownSelected, addDropDownSelected] = useState([{key: '', text: '', value: ''}]);
  const [value, setValue] = useState(0);

  // fields that need to be gotten
  const USERschool_id = "4187269f-d1fa-41fe-ad34-2e7d74a9031a";
  const FOUNDparent_id = "8b4eb7b4-893c-4bb2-8bbe-b75c4223854e";

  // Default fields needed
  const [matchCSV, updateMatchCSV] = useState({
    index_student_first_name: '', // set this to CSV index that holds student first name
    index_student_last_name: '',
    index_parent_first_name: '', 
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
      setInfoCSV(data)  // MUST be here

    //   showData(infoCSV);
    //  scrubCSV(fieldsByIndex, infoCSV, fieldNames)
      setLoading(false); 
     // setFieldNames(data[0]); 
    }, 2000);
    
    // setInfoCSV(data)   // NOT here
    setFieldNames(data[0]); 
    // showData(infoCSV);
    // scrubCSV(fieldsByIndex, infoCSV, fieldNames)
  }

  const handleError = (err) => {
    console.log('Error msg is >>>>> ', err);
  }

  const createFieldTitle = (str) => {   
    return str.split('_')
    .splice(1, str.length-1).map( a => a.charAt(0).toUpperCase() + a.substr(1))
    .join(' ')
  };
  
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

    updateMatchCSV({
      ...matchCSV,
      [data.name]: data.value
    })
    
    // set index to Number just to be safe
    setdropdownNames([...dropdownNames], dropdownNames[Number(data.value)].disabled = true);

  }

  const scrubCSV = (fieldsByIndex, infoCSV, fieldNames ) => {
    // fieldNames.forEach( (element, index) => {
    //     if(infoCSV.length) {
    //      // console.log('current element is >> ', element);
    //      fieldsByIndex[`${element}`] = findFieldIndex(infoCSV, element, fieldNames); // works
    //      // setFieldsByIndex({...fieldsByIndex , [element]: findFieldIndex(infoCSV, element, fieldNames)  }) // nooo
    //      // setFieldsByIndex( fieldsByIndex[`${element}`] = findFieldIndex(infoCSV, element)  ) // error on second run
    //        console.log('Scrub FBI   ',fieldsByIndex);

    //     }
    
    // }); 
  
    setdropdownNames(
      fieldNames.map( (item, index) => {
       return {key: index, text: item, value: index, disabled: false}
      }))

  }

  useEffect(()=> {
    console.log('!!!!!!!!!!!!  showing dropdownNames ', dropdownNames);
    console.log('################  showing names ', matchCSV);
  }, [dropdownNames, matchCSV] )



  useEffect(() => {  
    console.log('scrubCSV called');

      scrubCSV(fieldsByIndex, infoCSV, fieldNames);       
      
  }, [infoCSV])

  const resetDropDown = () => {
    setdropdownNames([]);
    
  }


  const alignStyles = {width: '50%', margin: '5px auto', padding: '5px', display: 'flex'}                    
  const cardStyles = {border: '1px solid deeppink', color: 'dodgerblue', ...alignStyles}
  
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
      <Button  size = 'mini' color='red' onClick = {resetDropDown} > reset dropDowns </Button>
      </Container>
    
      
      <div>
      
        {loadingData 
          ? 
          <Loader style = {{border: '1px solid blue', display: 'flex', justifyContent: 'center'}}
          width = {25} height= {25} color = 'purple' type = 'TailSpin'/> 
          : null
        }
        
        {fieldNames.length 
          ? 
          <Container style = {{border: '1px solid green', display: 'flex', width: '60%', flexWrap: 'wrap'}}>
                  
            {Object.keys(matchCSV).map((item,id) => (
              <Card key = {id} style = {cardStyles}>
                <Label> {createFieldTitle(item)} </Label>
                  <Dropdown
                    options = {dropdownNames}
                    search
                    selection
                    name = {item}
                    onChange = {_handleDropDown}
                  />  
              </Card>
            ))}  

            </Container>
            : 
            null           
          }
        
        
        </div>
      
      </div>
      );
    }
    
    export default Hooks_CSVReader;
