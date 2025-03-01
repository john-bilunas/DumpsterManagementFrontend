import React, {useState} from 'react'


/*
Structure
    id - auto increment
    customer_id - FK
    house_number - string (could use number, but just to cover anything strange/uncommon)
    street_name - string
    city - string
    state - 2 characters
    zip - 5 characters
    apt - string (20 character max)
*/
const AddAddress = ({onAddAddress, setIsAddAddress}) => {
    
    
    const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [apt, setApt] = useState('');


  return (

    

    <div className="form-container add-address">
        <div  className= "add-form">
        <form id= "add-item">
            {/* name, price, current, category_id */}
            <div className= 'inputs'>
                <div className="input">
                        <label htmlFor="house"> House number: </label>
                        <input type="text" id= 'house' value={houseNumber} name= 'house' onChange= { (e) => {setHouseNumber(e.target.value)}}/>
                </div>
                <div className="input">
                        <label htmlFor="street"> Street: </label>
                        <input type="text" id= 'street' value={street} name= 'street' onChange= { (e) => {setStreet(e.target.value)}}/>
                </div>
                <div className="input">
                      <label htmlFor="city"> City: </label>
                      <input type="text" id= 'city' value={city} name= 'city' required onChange= { (e) => {setCity(e.target.value)}}/>
                </div>
                <div className="input">
                      <label htmlFor="state"> State: </label>
                      <input type="text" id= 'state' value={state} name= 'state' required onChange= { (e) => {setState(e.target.value)}}/>
                </div>
                <div className="input">
                      <label htmlFor="zip"> Zip code: </label>
                      <input type="text" id= 'zip' value={zip} name= 'zip'  onChange= { (e) => {setZip(e.target.value)}}/>
                </div>
                <div className="input">
                      <label htmlFor="apt"> Apt.: </label>
                      <input type="text" id= 'apt' value={apt} name= 'apt'  onChange= { (e) => {setApt(e.target.value)}}/>
                </div>
            </div>
            <div>
            <button type= "submit" onClick= { async (e) => {
                    e.preventDefault();
                    const addResponse = await onAddAddress();
                    if(addResponse === 'Success!'){
                        // Reset state
                        // setSize(0);
                    } 
                }}>Add Address</button>
                <button className= "close" type= "submit" onClick= { () => {
                    setIsAddAddress( (prev) => false);
                }}>Close</button>
            </div>
                
        </form>
    </div>
    </div>
    
  )
}

export default AddAddress;