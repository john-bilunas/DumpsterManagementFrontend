import React, { useState, useEffect } from 'react';
import AddRental from './Rentals/AddRental';
import RentalListItem from './Rentals/RentalListItem';
import SearchBar from './Util/SearchBar';
const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [getRentalErrorMessage, setGetRentalErrorMessage] = useState('');
  //state for search bar text
  const [filterText, setFilterText] = useState('');
  //set state for table rows
  const [tableRows, setTableRows] = useState([]);
  console.log('Filtered Text: ' + filterText);
  // Create the "table" header for the rows that are being displayed for the list of customers
  const tableHeader = (
    <div className="table-row row-header rental-row">
      <div className="rental-name-column">Name</div>
      <div className="rental-dropoff-column">Drop off</div>
      <div className="rental-pickup-column">Pick up</div>
      <div className="rental-address-column">Address</div>
      <div className="rental-dumpster-column">Dumpster</div>
      <div className="rental-phone-column">Phone</div>
      <div className="rental-email-column">Email</div>
    </div>
  );

  // Iterate over all rentals and create a list item of them.

  useEffect(() => {
    if (rentals.length > 0) {
      setTableRows(
        rentals
          .filter((rental) => {
            const fullName = `${rental.first_name} ${rental.last_name}`;
            return fullName.toLowerCase().includes(filterText.toLowerCase());
          })
          .map((rental) => {
            //create object of all rental information needed
            const fullName = `${rental.first_name} ${rental.last_name}`;
            // const dropoff = rental.dropoff_date.split('T')[0];
            const dropoffYearMonthDay = rental.dropoff_date.split('T')[0].split('-');
            const dropoff = `${dropoffYearMonthDay[1]}/${dropoffYearMonthDay[2]}/${dropoffYearMonthDay[0]}`;

            const pickupYearMonthDay = rental.pickup_date.split('T')[0].split('-');
            const pickup = `${pickupYearMonthDay[1]}/${pickupYearMonthDay[2]}/${pickupYearMonthDay[0]}`;
            let address = `${rental.house_number} ${rental.street_name}, `;
            if (rental.apt !== null) address += `${rental.apt}`;
            address += `${rental.city}, ${rental.state} `;
            if (rental.zip !== null) address += `${rental.zip}`;
            const dumpster = `#${rental.dumpster_id} - ${rental.size} Yards`;
            const phone = `${rental.phone.slice(0, 1)}-${rental.phone.slice(
              1,
              4
            )}-${rental.phone.slice(4, 7)}-${rental.phone.slice(-4)}`;
            const email = rental.email;

            return (
              <RentalListItem
                key={rental.id}
                fullName={fullName}
                dropoff={dropoff}
                pickup={pickup}
                address={address}
                dumpster={dumpster}
                phone={phone}
                email={email}
                rental_id={rental.rental_id}
              />
            );
          })
      );
    }
  }, [filterText, rentals]);

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
  // console.log('all rentals: ', rentals);
  return (
    <div className="full-page-width-containers surface">
      <h2>Rentals</h2>

      <AddRental rentals={rentals} setRentals={setRentals} />
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

export default Rentals;
