import React, {useState, useEffect} from 'react';
import HooksCSVReader from './hooksCSVReader';
import {Button, Modal} from 'semantic-ui-react';
// import State_CSVReader from './state_CSVReader';
// import DropDownTest from './DropDownTest';

function App() {
 
  const [modalState, toggleModal] = useState(false);
  
  useEffect(() => {
    console.log('modal state is ', modalState);
  }, [modalState]);

  const openModal = () => {
    toggleModal(true)
  }

  const closeModal= () => {
    toggleModal(false)
  }


  return (
    <div style = {{ display: 'flex', flexDirection: 'column'}}>


      <div style = {{border: '1px solid seagreen', borderRadius: '5x solid seagreen', width: '90%', margin: '0 auto'}}>
        <Modal 
          trigger = {<Button onClick = {openModal}>Use CSV data</Button>}
          open = {modalState}
          // onClose = {toggleModal(false)}
        
        
        >
        <Modal.Content>
          <HooksCSVReader  closeModal = {closeModal}/>
        
        </Modal.Content>  
        
        
        </Modal>
        
      </div>


      

    </div>
  );
}

export default App;
