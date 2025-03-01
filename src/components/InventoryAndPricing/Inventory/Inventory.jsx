import React, {useState, useEffect} from 'react'
import InventoryListItem from './InventoryListItem';
import AddDumpster from './AddDumpster'
const Inventory = () => {

    // state for list of dumpsters
    const [dumpsterList, setDumpsterList] = useState([]);
    const [allDumpstersErrorMessage, setAllDumpstersErrorMessage] = useState('');
    const [addDumpstersErrorMessage, setAddDumpstersErrorMessage] = useState('');

    // fetch all dumpsters in useEffect
    useEffect( () => {
         const fetchAllDumpsters = async () => {
            try{
                // Fetch all dumpsters
                const response = await fetch(`${process.env.REACT_APP_API_URL}/dumpsters`);
                console.log('response:', response);
                // Check if the response was successful
                
                // Parse json response
                const data = await response.json();
                    console.log('all dumpsters', data)
                if(data.errorMessage){
                    throw Error(data.errorMessage);
                } else{
                    setAllDumpstersErrorMessage('');
                    setDumpsterList(data.message);
                }
            // Set error message to display to users what went wrong.
            }catch(err){
                setAllDumpstersErrorMessage(err.message);
            }
        }
         fetchAllDumpsters();



    }, []);

    // Create the "table" header for the rows that are being displayed for the list of dumpsters
    const tableHeader = ((
        <div className= 'table-row row-header inventory-row'>
            <div className= 'inventory-dumpster-column'>Dumpster Number</div>
            <div className= 'inventory-size-column'>Size</div>
            <div className= 'inventory-active-column'>Active</div>
        </div>         
    ));
    // Create the rows to be displayed about each dumpster
    let tableRows;
    if(Array.isArray(dumpsterList) && dumpsterList.length > 0){
        tableRows = dumpsterList.map( (row) => {
                return (<InventoryListItem key= {row.id} id= {row.id} size= {row.size} isActive= {row.is_active} header={false}/>)
            });
    }

    //Event handler for adding a dumpster
    const onAddDumpster = async (size) => {

        try{

            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({size})
            }
            const addResponse = await fetch(`${process.env.REACT_APP_API_URL}/dumpsters`, options);
            const addData = await addResponse.json();
            console.log('ret: ', addData);
            // Check for any errors from the server
            if(addData && addData.errorMessage) throw new Error(addData.errorMessage);
            console.log('post');
            // Update state for dumpsters and remove possible previous error messages
            
            setAddDumpstersErrorMessage('');
            console.log('addData', addData.message)
            setDumpsterList((prevList) => [...prevList, addData.message])
            return 'Success!';
        }catch(err){
            console.log('err:', err.message);
            setAddDumpstersErrorMessage(err.message);
            return;
        }
    }

    console.log('error message', addDumpstersErrorMessage)
  return (

    <div className= 'individual-inventory-and-pricing-containers surface'>
        <h2>Inventory</h2>
        <div className="form-container">
            <AddDumpster onAddDumpster= {onAddDumpster} addDumpstersErrorMessage= {addDumpstersErrorMessage}/>
            {addDumpstersErrorMessage.length !== 0? (<p className="error center">{addDumpstersErrorMessage}</p>) : <></>}
        </div>
        
        <div >
            {tableHeader}
            <div>
                {tableRows}
            </div>
        </div>
    </div>
  )
}

export default Inventory;