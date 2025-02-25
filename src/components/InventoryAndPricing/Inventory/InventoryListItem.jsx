import React, {useState} from 'react'

const InventoryListItem = (props) => {
    
    const {header} = props;
    const [id] = useState(props.id);
    const [size, setSize] = useState(props.size);
    const [isActive, setIsActive] = useState(props.isActive);
    const [updateError, setUpdateError] = useState('');
    /*
        Make these state so that they can be updated from patch
        rowId, size, isActive
    */

    const onChangeActiveStatus = async () => {
        try{

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({is_active:!isActive})
            }

            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/dumpsters/${id}`, options);
            const updatedData = await updateResponse.json();
            // Check if there was an error on the server
            if(updatedData.errorMessage) throw new Error(updatedData.errorMessage);
            console.log('ud', updatedData)
            setIsActive(updatedData.message.is_active);
            // Remove any previous errors
            setUpdateError(''); 
        }catch(err){
            //  Set error string for adding a dumpster
            setUpdateError(err.errorMessage);
        }
        
    };



  return (
    <div className= 'inventory-row'>
        <div>{id}</div>
        <div>{size}</div>
        <div>
            <span>{isActive === 1? ('Yes') : ('No')}</span>
            <button onClick= {onChangeActiveStatus}>{isActive === 1 ? ('Deactivate') : ('Activate')}</button>

        </div>
    </div> 
  )
}

export default InventoryListItem;