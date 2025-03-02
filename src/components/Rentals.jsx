import React from 'react';
import AddRental from './Rentals/AddRental';
const Rentals = () => {
  return (
    <div className="full-page-width-containers surface">
      <h2>Customers</h2>

      <AddRental />
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
