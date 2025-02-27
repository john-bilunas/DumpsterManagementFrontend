import React, {useState, useEffect} from 'react'
import InventoryListItem from '../Inventory/InventoryListItem';
import PricingItem from './PricingItem';
import AddItem from '../Pricing/AddItem'

const Pricing = () => {

    // state for list of dumpsters
    const [itemList, setItemList] = useState([]);
    const [allItemCategoriesList, setAllItemCategoriesList] = useState([]);

    // State for error messages - empty string will be falst for conditionals
    const [allItemCategoriesErrorMessage, setallItemCategoriesErrorMessage] = useState('');
    const [allItemsErrorMessage, setAllItemsErrorMessage] = useState('');
    const [addItemErrorMessage, setAddItemErrorMessage] = useState('');
    const [updateItemErrorMessage, setUpdateItemErrorMessage] = useState('');

    // fetch all dumpsters in useEffect
    useEffect( () => {
         const fetchAllItems = async () => {
            try{
                // Fetch all dumpsters
                const response = await fetch(`${process.env.REACT_APP_API_URL}/items`);
                // Check if the response was successful
                
                // Parse json response
                const data = await response.json();
                if(data.errorMessage){
                    throw Error(data.errorMessage);
                } else{
                    setItemList(data.message);
                    setAllItemsErrorMessage('');
                    setAddItemErrorMessage(data.message);
                }
            // Set error message to display to users what went wrong.
            }catch(err){
                setAllItemsErrorMessage(err.message);
            }
        }
         fetchAllItems();



    }, []);

    //fetch all item categories
    useEffect( () => {
        const fetchAllItemCategories = async () => {
           try{
               // Fetch all dumpsters
               const response = await fetch(`${process.env.REACT_APP_API_URL}/itemCategories`);
               // Parse json response
               const data = await response.json();
               // Check if the response was successful
               if(data.errorMessage){
                   throw Error(data.errorMessage);
               } else{
                setallItemCategoriesErrorMessage('');
                   setAllItemCategoriesList(data.message);
               }
           // Set error message to display to users what went wrong.
           }catch(err){
            setallItemCategoriesErrorMessage(err.message);
           }
       }
        fetchAllItemCategories();
   }, []);

    // Event Handler for Archiving items that have changed price.
    const onChangeActiveStatus = async ({current, id}) => {
        try{

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({current})
            }

            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/items/${id}`, options);
            const updatedData = await updateResponse.json();
            // Check if there was an error on the server
            if(updatedData.errorMessage) throw new Error(updatedData.errorMessage);
            // Remove any previous errors
            setUpdateItemErrorMessage(''); 
            setItemList((prev) => {  return prev.filter( (items) => { return items.id !== id})})
        }catch(err){
            //  Set error string for adding a dumpster
            setUpdateItemErrorMessage(err.errorMessage);
        }
        
    };
    //Event handler for adding an item
    const onAddItem = async ({name, price, current, category_id}) => {

        try{

            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name, price, current, category_id})
            }
            const addResponse = await fetch(`${process.env.REACT_APP_API_URL}/items`, options);
            const addData = await addResponse.json();
            // Check for any errors from the server
            if(addData.errorMessage) throw new Error(addData.errorMessage);
            // Update state for dumpsters and remove possible previous error messages
            setAddItemErrorMessage('');
            setItemList((prevList) => [...prevList, addData.message])
            return 'Success!';
        }catch(err){
            setAddItemErrorMessage(err.errorMessage);
            return;
        }
    }   

    // Create the "table" header for the rows that are being displayed for the list of dumpsters
    const tableHeader = ((
        <div className= 'table-row row-header inventory-row'>
            <div>Name</div>
            <div>Price</div>
            <div>Archive</div>
        </div>         
    ));


    // Create the rows to be displayed about each dumpster
    let tableRows;
    if(Array.isArray(itemList) && itemList.length > 0){
        tableRows = itemList.filter( (el) => el.current === 1).map( (row) => {
                return (<PricingItem key= {row.id} id= {row.id} name= {row.name} price= {row.price} categoryId= {row.category_id} current= {row.current} header={false} onChangeActiveStatus= {onChangeActiveStatus}/>)
            });
    }


  return (

    <div className= 'individual-inventory-and-pricing-containers surface'>
        <h2>Pricing</h2>
        <div className="center">
            <AddItem allItemCategoriesList= {allItemCategoriesList} onAddItem= {onAddItem}/>
        </div>
        <div className= 'table-container'>
            {tableHeader}
            <div>
                {tableRows}
            </div>
        </div>
    </div>
  )
}

export default Pricing;