import React, {useState, useEffect} from 'react'
import InventoryListItem from '../Inventory/InventoryListItem';
import AddItem from '../Pricing/AddItem'

const Pricing = () => {

    // state for list of dumpsters
    const [itemList, setItemList] = useState([]);
    const [allItemCategoriesList, setAllItemCategoriesList] = useState([]);

    // State for error messages - empty string will be falst for conditionals
    const [allItemCategoriesErrorMessage, setallItemCategoriesErrorMessage] = useState('');
    const [allItemsErrorMessage, setAllItemsErrorMessage] = useState('');
    const [addItemErrorMessage, setAddItemErrorMessage] = useState('');

    // fetch all dumpsters in useEffect
    useEffect( () => {
         const fetchAllItems = async () => {
            try{
                // Fetch all dumpsters
                const response = await fetch(`${process.env.REACT_APP_API_URL}/items`);
                console.log('response:', response);
                // Check if the response was successful
                
                // Parse json response
                const data = await response.json();
                    console.log('all items', data)
                if(data.errorMessage){
                    throw Error(data.errorMessage);
                } else{
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
               console.log('response:', response);   
               // Parse json response
               const data = await response.json();
                   console.log('all item categories', data)
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

    // Create the "table" header for the rows that are being displayed for the list of dumpsters
    // const tableHeader = ((
    //     <div className= 'table-row row-header'>
    //         <div>Name</div>
    //         <div>Price</div>
    //         <div>Current</div>
    //     </div>         
    // ));


    // Create the rows to be displayed about each dumpster
    // let tableRows;
    // if(Array.isArray(itemList) && itemList.length > 0){
    //     tableRows = itemList.map( (row) => {
    //             return (<InventoryListItem key= {row.id} id= {row.id} name= {row.name} price= {row.price} categoryId= {row.category_id} current= {row.current} header={false}/>)
    //         });
    // }

    //Event handler for adding a dumpster
    // const onAddItem = async ({name, price, current, category_id}) => {

    //     try{

    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({name, price, current, category_id})
    //         }
    //         const addResponse = await fetch(`${process.env.REACT_APP_API_URL}/items`, options);
    //         const addData = await addResponse.json();
    //         console.log('pre');
    //         // Check for any errors from the server
    //         if(addData.errorMessage) throw new Error(addData.errorMessage);
    //         console.log('post');
    //         // Update state for dumpsters and remove possible previous error messages
            
    //         setAddItemErrorMessage('');
    //         console.log('addData', addData.message)
    //         setItemList((prevList) => [...prevList, addData.message])
    //         return 'Success!';
    //     }catch(err){
    //         setAddItemErrorMessage(err.errorMessage);
    //         return;
    //     }
    // }

    //Event handler for adding a dumpster
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
            console.log('addItemData', addData.message)
            setItemList((prevList) => [...prevList, addData.message])
            return 'Success!';
        }catch(err){
            setAddItemErrorMessage(err.errorMessage);
            return;
        }
    }

  return (

    <div className= 'inventory-and-pricing-containers'>
        <h2>Inventory And Pricing</h2>
        <AddItem allItemCategoriesList= {allItemCategoriesList} onAddItem= {onAddItem}/>

        {/* <div className= 'table-container'>
            {tableHeader}
            <div>
                {tableRows}
            </div>
        </div> */}
    </div>
  )
}

export default Pricing;