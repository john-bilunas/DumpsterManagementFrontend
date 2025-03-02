import React,{useState} from 'react'


const AddCustomer = ({onAddCustomer}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');


/*
    Structure
    first_name - string
    last_name - string
    phone -10 characters
    email - string
*/


    

    return (
    <div className="form-container add-customer">
    <div  className= "add-form">
    <form id= "add-customer">
        {/* name, price, current, category_id */}
        <div className= 'inputs'>
            <div className="input">
                    <label htmlFor="first"> First name: </label>
                    <input type="text" id= 'first' value={firstName} name= 'first' onChange= { (e) => {setFirstName(e.target.value)}}/>
            </div>
            <div className="input">
                    <label htmlFor="last"> Last name: </label>
                    <input type="text" id= 'last' value={lastName} name= 'last' onChange= { (e) => {setLastName(e.target.value)}}/>
            </div>
            <div className="input">
                  <label htmlFor="phone"> Phone Number: </label>
                  <input type="text" id= 'phone' value={phone} name= 'phone'   onChange= { (e) => {setPhone(e.target.value)}}/>
            </div>
            <div className="input">
                  <label htmlFor="email"> E-mail: </label>
                  <input type="email" id= 'email' value={email} name= 'email'  onChange= { (e) => {setEmail(e.target.value)}}/>
            </div>
        </div>
        <div className= "button-options">
        <button type= "submit" 
        onClick= { async (e) => {
                e.preventDefault();
                const addResponse = await onAddCustomer({
                    first_name: firstName.length === 0? null: firstName,
                    last_name: lastName.length === 0? null: lastName,
                    phone: phone.length === 0? null: phone,
                    email: email.length === 0? null: email

                });
                console.log('addresponse', addResponse)
                if(addResponse === 'Success!'){
                    // Reset state
                    // setSize(0);
                    setFirstName('');
                    setLastName('');
                    setPhone('');
                    setEmail('');
                } 
            }}
            >Add Customer</button>
        </div>
            
    </form>
</div>
</div>
  )
}

export default AddCustomer;