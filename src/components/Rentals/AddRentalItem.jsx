import React, { useState, useEffect } from 'react';

const AddItem = ({ rental_id }) => {
  // rental_id, item_id, quantity

  //   const [rentalId, setRentalId] = useState(-1);
  const [quantity, setQuantity] = useState(0);

  const [itemList, setItemList] = useState([]);
  const [allItemsErrorMessage, setAllItemsErrorMessage] = useState('');

  const [itemCategoriesList, setItemCategoriesList] = useState([]);
  const [allItemCategoriesErrorMessage, setAllItemCategoriesErrorMessage] = useState('');

  const [chosenCategory, setChosenCategory] = useState(-1);
  const [chosenItem, setChosenItem] = useState(-1);
  const [itemsByChosenCategory, setItemsByChosenCategory] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [addRentalItemErrorMessage, setAddRentalItemErrorMessage] = useState('');
  // useEffect to get all items
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        // Fetch all dumpsters
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items`);
        // Check if the response was successful

        // Parse json response
        const data = await response.json();
        if (data.errorMessage) {
          throw Error(data.errorMessage);
        } else {
          const currentItems = data.message.filter((item) => {
            return item.current === 1;
          });
          setItemList(currentItems);
          setAllItemsErrorMessage('');
        }
        // Set error message to display to users what went wrong.
      } catch (err) {
        setAllItemsErrorMessage(err.message);
      }
    };
    fetchAllItems();
  }, []);

  // useEffect to get all item categories
  useEffect(() => {
    const fetchAllItemCaregories = async () => {
      try {
        // Fetch all dumpsters
        const response = await fetch(`${process.env.REACT_APP_API_URL}/itemCategories`);
        // Check if the response was successful

        // Parse json response
        const data = await response.json();
        if (data.errorMessage) {
          throw Error(data.errorMessage);
        } else {
          setItemCategoriesList(data.message);
          setAllItemCategoriesErrorMessage('');
        }
        // Set error message to display to users what went wrong.
      } catch (err) {
        setAllItemCategoriesErrorMessage(err.message);
      }
    };
    fetchAllItemCaregories();
  }, []);

  // Create a list of option tags with the categories
  useEffect(() => {
    if (itemCategoriesList.length > 0) {
      setCategoryOptions(
        itemCategoriesList.map((el) => {
          return <option value={el.id}>{el.type}</option>;
        })
      );
    }
  }, [itemCategoriesList]);

  useEffect(() => {
    setItemsByChosenCategory((prev) => {
      return itemList
        .filter((el) => Number(el.category_id) === Number(chosenCategory))
        .map((el) => {
          return <option value={el.id}> {`${el.name} ($${el.price})`}</option>;
        });
    });
  }, [chosenCategory, itemList]);

  const onAddRentalIten = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          rental_id,
          item_id: chosenItem,
          quantity: quantity,
        }),
      };
      const addResponse = await fetch(`${process.env.REACT_APP_API_URL}/rentalItems`, options);
      const addData = await addResponse.json();
      console.log('add data error message:', addData);
      // Check for any errors from the server
      if (addData.errorMessage) throw new Error(addData.errorMessage);
      // Update state for dumpsters and remove possible previous error messages
      setAddRentalItemErrorMessage('');
      // setRentals((prevList) => [...prevList, addData.message]);
      console.log('Success adding a rental.');
      return 'Success!';
    } catch (err) {
      console.log('Error adding rental: ', err.message);
      setAddRentalItemErrorMessage(err.message);
      return;
    }
  };
  // useEffect();
  console.log('chosen category', chosenCategory);
  console.log('chosen item', chosenItem);
  console.log('rental', rental_id);
  console.log('quantity', quantity);
  // console.log('itemList', itemList);
  // console.log('itemCategoriesList', itemCategoriesList);
  // console.log('itemsByCategory', itemsByChosenCategory);
  return (
    <div className="form-container add-address">
      <div className="add-form">
        <form id="add-address">
          {/* name, price, current, category_id */}
          <div className="inputs">
            {/* Choose a category */}
            <div className="input">
              <label htmlFor="item-category"> Item Category: </label>
              <select
                name="item-category"
                id="item-category"
                onChange={(e) => {
                  setChosenCategory(e.target.value);
                }}
              >
                <option value={-1}>Please select an item category...</option>
                {categoryOptions}
              </select>
            </div>
            {/* Choose an item */}
            <div className="input">
              <label htmlFor="item"> Item: </label>
              <select
                name="item"
                id="item"
                onChange={(e) => {
                  setChosenItem(e.target.value);
                }}
              >
                <option value={-1}>Please select an item category...</option>
                {itemsByChosenCategory}
              </select>
            </div>
            {/* Quantity */}
            <div className="quantity">
              <label htmlFor="quantity"> Drop off date: </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                name="quantity"
                min="0"
                max="100"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="button-options">
            {/*  rental_id, item_id, quantity*/}
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                const addResponse = await onAddRentalIten();
                if (addResponse === 'Success!') {
                  // Reset state
                  setChosenCategory(-1);
                  setChosenItem(-1);
                  setQuantity(0);
                }
              }}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
