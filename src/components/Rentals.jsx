import React, { useState, useEffect } from 'react';
import AddRental from './Rentals/AddRental';
const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [getRentalErrorMessage, setGetRentalErrorMessage] = useState('');

  useEffect(() => {
    const getAllRentals = async () => {
      try {
        const results = await fetch(`${process.env.REACT_APP_API_URL}/rentals`);
        const data = await results.json();

        if (data && data.errorMessage) {
          throw new Error(data.errorMessage);
        } else {
          //set state of customers list and reset any errors
          setRentals(data.message);
          setGetRentalErrorMessage('');
        }
      } catch (err) {
        //set error state
        setGetRentalErrorMessage(err.message);
      }
    };
    getAllRentals();
  }, []);
  console.log('all rentals: ', rentals);
  return (
    <div className="full-page-width-containers surface">
      <h2>Customers</h2>

      <AddRental rentals={rentals} setRentals={setRentals} />
      {/* <AddCustomer onAddCustomer= {onAddCustomer}/>
    <div className= 'table-container'>
          {tableHeader}
          <div>
              {tableRows}
          </div>
      </div> */}
    </div>
  );
};

export default Rentals;
