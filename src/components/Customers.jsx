import React, { useState, useEffect } from 'react';
import CustomerListItem from './Customers/CustomerListItem';
import AddCustomer from './Customers/AddCustomer';
import SearchBar from './Util/SearchBar';
const Customers = () => {
  // State
  const [customersList, setCustomersList] = useState([]);
  const [customersListErrorMessage, setCustomersListErrorMessage] = useState('');

  const [addCustomerErrorMessage, setAddCustomerErrorMessage] = useState('');

  const [filterText, setFilterText] = useState('');
  // Fetch all customers in useEffect once
  useEffect(() => {
    //create function to perform fetch
    const fetchAllCustomers = async () => {
      try {
        const results = await fetch(`${process.env.REACT_APP_API_URL}/customers`);
        const data = await results.json();

        if (data && data.errorMessage) {
          throw new Error(data.errorMessage);
        } else {
          //set state of customers list and reset any errors
          setCustomersList(data.message);
          setCustomersListErrorMessage('');
        }
      } catch (err) {
        //set error state
        setCustomersListErrorMessage(err.message);
      }
    };
    fetchAllCustomers();
  }, []);

  // Create the "table" header for the rows that are being displayed for the list of customers
  const tableHeader = (
    <div className="table-row row-header inventory-row">
      <div className="customer-name-column">Name</div>
      <div className="customer-phone-column">Phone</div>
      <div className="customer-email-column">Email</div>
      <div className="customer-address-column">Addresses</div>
    </div>
  );

  // Create the rows to be displayed about each dumpster
  let tableRows;
  if (Array.isArray(customersList) && customersList.length > 0) {
    tableRows = customersList
      .filter((el) => {
        return (
          `${el.first_name} ${el.last_name}`.toLowerCase().includes(filterText.toLowerCase()) ||
          el.email.toLowerCase().includes(filterText.toLowerCase()) ||
          el.phone.includes(filterText)
        );
      })
      .map((row) => {
        return (
          <CustomerListItem
            key={row.id}
            id={row.id}
            row={row}
            header={false}
            customersList={customersList}
            setCustomersList={setCustomersList}
          />
        );
      });
  }
  /*
    Structure
    first_name - string
    last_name - string
    phone -10 characters
    email - string
*/
  const onAddCustomer = async ({ first_name, last_name, phone, email }) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, phone, email }),
      };
      const addResponse = await fetch(`${process.env.REACT_APP_API_URL}/customers`, options);
      const addData = await addResponse.json();
      console.log('add data error message:', addData);
      // Check for any errors from the server
      if (addData.errorMessage) throw new Error(addData.errorMessage);
      // Update state for dumpsters and remove possible previous error messages
      setAddCustomerErrorMessage('');
      //Update the displayed customers to include the new one
      setCustomersList((prev) => {
        return [...prev, addData.message];
      });

      return 'Success!';
    } catch (err) {
      console.log('in error');
      setAddCustomerErrorMessage(err.message);
      return;
    }
  };

  console.log('Customers list: ', customersList);
  return (
    <div className="full-page-width-containers surface">
      <h2>Customers</h2>
      <AddCustomer onAddCustomer={onAddCustomer} />
      <SearchBar searchText={filterText} setSearchText={setFilterText} />
      <div className="scrollable-table-container">
        <div className="table-container">
          {tableHeader}
          <div className="table-body-container">{tableRows}</div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
