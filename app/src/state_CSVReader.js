import React, {useState} from 'react';
import {Button, Container} from 'semantic-ui-react';
import CSVReader from 'react-csv-reader';
import Loader from 'react-loader-spinner';

class State_CSVReader extends React.Component {
    state = {
        dataCSV: [],
        loadingData: false,
    }

    handleData = (data) => {
        
        this.setState({loadingData: true});

        setTimeout(()=> {
            console.log("TIMEOUT going now");
            this.setState(() => {
                return {dataCSV: data, loadingData: false}
            })
        }, 3000);
        
        
        // this.setState(() => {
        //     return {dataCSV: data}
        // })
    
        console.log('inside handler infoCSV >>> ', this.state.dataCSV);
        this.showData(this.state.dataCSV);
         console.log('inside handler infoCSV again >>> ', this.state.dataCSV);
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
            {this.state.dataCSV.length 
                ? 
                <div>
                    <p> Length is {this.state.dataCSV.length} </p> 
                <Container>    
                    {this.state.dataCSV.map(item => 
                    <ul key = {item[0]}>
                        <li>{item[0]}</li>
                        <li>{item[1]}</li>
                        <li>{item[2]}</li>
                        <li>{item[3]}</li>
                        <li>{item[4]}</li>
                    
                    </ul>
                    )}
                </Container>      

                </div>
                
                
                : <p> No data yet </p> 
            }
            {this.state.loadingData 
                ? 
                    <Loader style = {{border: '1px solid blue', display: 'flex', justifyContent: 'center'}}
                            width = {25} height= {25} color = 'pink' type = 'TailSpin'/> 
                : null
            }
            
            
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
