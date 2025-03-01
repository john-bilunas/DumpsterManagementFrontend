import React, {useState} from 'react'
import AddAddress from './AddAddress';
const CustomerListItem = (props) => {

    //create state for important info
    const [id] = useState(props.id);
    const [firstName] = useState(props.row.first_name);
    const [lastName] = useState(props.row.last_name);
    const [phone, setPhone] = useState(props.row.phone);
    const [email, setEmail] = useState(props.row.email);
    const [isAddAddress, setIsAddAddress] = useState(false);
    
      const [addAddressErrorMessage, setAddAddressErrorMessage] = useState('');

    //generate list items for addresses
    let addresses;
    if(props && props.row && props.row.addresses){
        addresses = props.row.addresses.map( (address) => {
            let addressText = `${address.house_number} ${address.street_name}, `;//`${}`

            if(address.apt !== null) addressText+= `${address.apt}, `;
            addressText+= `${address.city}, ${address.state} `;
            if(address.zip !== null) addressText+= `${address.zip}`;
            // console.log(addressText)
            return <li>{addressText}</li>




        });
    }
    
    console.log(props)
    const phoneFormat = `${phone.slice(0,1)}-${phone.slice(1,4)}-${phone.slice(4,7)}-${phone.slice(-4)}`;
    

    // Parent event handler
    const onAddAddress = async () => {

        try{
  
        }catch(err){
  
        }
  
      }    
  return (
    <div className= 'table-row'>
        <div className= 'customer-name-column'>{`${firstName} ${lastName}`}</div>
        <div className= 'customer-phone-column'>{phoneFormat}</div>
        <div className= 'customer-email-column'>{email}</div>
        <div className= 'customer-address-column'>
            {/* <span>{isActive === 1? ('Yes') : ('No')}</span> */}
            {/* <button onClick= {onChangeActiveStatus}>{isActive === 1 ? ('Deactivate') : ('Activate')}</button> */}
            <ul>
                {addresses.length > 0 ? <>{addresses}</> : <>This customer does not have an address.</>}
                
            </ul>
            {/* <button onClick= {() => { setIsAddAddress( (prev) => !prev)}}>Add Address</button> */}
            {isAddAddress? <AddAddress onAddAddress= {onAddAddress} setIsAddAddress= {setIsAddAddress}/> : <><button onClick= {() => { setIsAddAddress( (prev) => !prev)}}>Add Address</button></>}
            {/* {isAddAddress? <AddAddress onAddAddress= {onAddAddress}/> : <></>} */}

        </div>
    </div> 
    
  )
}

export default CustomerListItem;