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
        <form id= "add-address">
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
                {/* <div className="input">
                      <label htmlFor="state"> State: </label>
                      <input type="text" id= 'state' value={state} name= 'state' required onChange= { (e) => {setState(e.target.value)}}/>
                </div> */}
                <div className="input">
                    <label htmlFor="state"> State: </label>
                        <select name="state" id="state" onChange={(e) => { setState(e.target.value); }}>
                            <option>Please select a state...</option>
                            <option value={'CT'} >Connecticut</option>                      
                            <option value={'MA'} >Massachusetts</option>
                            <option value={'NH'} >New Hampshire</option>
                            <option value={'RI'} >Rhode Island</option>
                        </select>
                    </div>
                <div className="input">
                      <label htmlFor="zip"> Zip code: </label>
                      <input type="text" id= 'zip' value={zip} name= 'zip'  placeholder= "optional" onChange= { (e) => {setZip(e.target.value)}}/>
                </div>
                <div className="input">
                      <label htmlFor="apt"> Apt.: </label>
                      <input type="text" id= 'apt' value={apt} name= 'apt'  placeholder= "optional" onChange= { (e) => {setApt(e.target.value)}}/>
                </div>
            </div>
            <div className= "button-options">
            <button type= "submit" onClick= { async (e) => {
                    e.preventDefault();
                    const addResponse = await onAddAddress({
                        house_number: houseNumber.length === 0? null : houseNumber,
                        street_name: street.length === 0? null : street,
                        city: city.length === 0? null : city,
                        state: state.length === 0? null : state,
                        zip: zip.length === 0? null : zip,
                        apt: apt.length === 0? null : apt,
                    });
                    if(addResponse === 'Success!'){
                        // Reset state
                        setHouseNumber('');
                        setStreet('');
                        setCity('');
                        setState('');
                        setZip('');
                        setApt('');
                        
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

        const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [apt, setApt] = useState('');
*/
export default AddAddress;