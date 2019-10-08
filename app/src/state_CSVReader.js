import React, {useState} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import Loader from 'react-loader-spinner';

class State_CSVReader extends React.Component {
    state = {
        dataCSV: [],
    }

    handleData = (data) => {
        this.setState(prevState => {
            return {dataCSV: data}
        })
    
        console.log('inside handler infoCSV >>> ', this.state.dataCSV);

        // setTimeout( ()=> {
        //     console.log('inside setTimeout');
        //     console.log('inside setTimeout infoCSV >>> ', this.state.dataCSV);
        //     }, 2000);
        this.showData(this.state.dataCSV); // does not
         console.log('inside handler infoCSV >>> ', this.state.dataCSV);
    }

    handleError = (err) => {
        console.log('Error msg is >>>>> ', err);
    }

    showData = info => {
        console.log('showData info >>> ', info);
    }
    render() {
      
        return (
            <div >
            {this.state.dataCSV.length ? <p> Length is {this.state.dataCSV.length} </p> : <p> No data yet </p> }
            <Container  >
              <CSVReader
                label = 'Stateful-Choose your CSV file'
                //    onFileLoaded = {this.handleData(data)}  NOT working

                onFileLoaded = { (data) => {
                    this.handleData(data)
                    console.log('anonymous func set infoCSV >>> ', this.state.dataCSV);
                  // this.handleData(this.state.infoCSV);
                    
                } }
                
                onError = {this.handleError}
                inputId="CSVstyling"
                inputStyle={{border: '1px solid blue', color: 'deeppink'}}
                inputType = "color"
                inputValue="#e66465"
              />
            </Container>
      
            <input type="color" id="head" name="head" readOnly value="#e66465"/>
             
           
           

      
          </div>
        );
    } 
}

export default State_CSVReader;

/*
            <div style = {{ border: '1px solid red', display: 'flex', width: '100%', justifyContent: 'center'}}>
            {this.state.dataCSV.length > 1
              ? 
              <Container>
                <p>length is {this.state.dataCSV.length}</p>
                
                
                {this.dataCSV.map(item => 
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
*/