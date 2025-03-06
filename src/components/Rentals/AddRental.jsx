import { setDriver } from 'mongoose';
import React, { useState, useEffect } from 'react';

const AddRental = ({ rentals, setRentals }) => {
  const [dropoff, setDropoff] = useState(new Date(Date.now()).toISOString().split('T')[0]);
  const [pickup, setPickup] = useState(
    new Date(Date.now() + 604800000).toISOString().split('T')[0]
  );

  const [size, setSize] = useState(null); // used for selecting a size in check availability
  const [allSizes, setAllSizes] = useState([]); // used for displaying sizes to user
  const [allCustomers, setAllCustomers] = useState([]);
  const [allAddresses, setAllAddresses] = useState([]);

  // Add rental state
  const [customer, setCustomer] = useState('-1');
  const [address, setAddress] = useState('-1');
  const [getAllSizesErrorMessage, setGetAllSizesErrorMessage] = useState('');
  const [getAllCustomersErrorMessage, setGetAllCustomersErrorMessage] = useState('');

  const [availableDumpsters, setAvailableDumpsters] = useState([]);
  const [lockedinDropoff, setLockedinDropoff] = useState('Check availability to add.');
  const [lockedinPickup, setLockedinPickup] = useState('Check availability to add.');
  const [lockedInDumpster, setLockedinDumpster] = useState('Check availability to add.');
  const [getAvailableDumpsterError, setGetAvailableDumpsterError] = useState('');

  const [bookRentalErrorMessage, setBookRentalErrorMessage] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  useEffect(() => {
    //create function to perform fetch
    const fetchDumpsterSizes = async () => {
      try {
        const results = await fetch(`${process.env.REACT_APP_API_URL}/dumpsters/sizes`);
        const data = await results.json();

        if (data && data.errorMessage) {
          throw new Error(data.errorMessage);
        } else {
          //set state of customers list and reset any errors
          setAllSizes(data.message);
          setGetAllSizesErrorMessage('');
        }
      } catch (err) {
        //set error state
        setGetAllSizesErrorMessage(err.message);
      }
    };
    fetchDumpsterSizes();

    //create function to perform fetch
    const fetchAllCustomers = async () => {
      try {
        const results = await fetch(`${process.env.REACT_APP_API_URL}/customers`);
        const data = await results.json();

        if (data && data.errorMessage) {
          throw new Error(data.errorMessage);
        } else {
          //set state of customers list and reset any errors
          setAllCustomers(data.message);
          setGetAllCustomersErrorMessage('');
        }
      } catch (err) {
        //set error state
        setGetAllCustomersErrorMessage(err.message);
      }
    };
    fetchAllCustomers();
  }, []);

  // Create options for dropdown sizes
  const sizeOptions = allSizes.map((el) => {
    return <option value={el}>{`${el} Yards`}</option>;
  });

  // Create options for dropdown sizes
  const customerOptions = allCustomers.map((el) => {
    return <option value={el.id}>{`${el.first_name} ${el.last_name}`}</option>;
  });

  // Create options for dropdown sizes
  let addressOptions = [];
  if (allAddresses && allAddresses.length !== 0) {
    addressOptions = allAddresses.map((el) => {
      return <option value={el.id}>{`${el.house_number} ${el.street_name}, ${el.city}`}</option>;
    });
  }

  // Check availability for dates and size
  const onCheckAvailability = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ size, dropoff, pickup }),
      };
      const addResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/dumpsters/availability`,
        options
      );
      const data = await addResponse.json();
      console.log('add data error message:', data);
      // Check for any errors from the server
      if (data.errorMessage) throw new Error(data.errorMessage);
      // Update state for dumpsters and remove possible previous error messages
      setLockedinDropoff(dropoff);
      setLockedinPickup(pickup);
      setGetAvailableDumpsterError('');
      if (data.message.length > 0) {
        setAvailableDumpsters(data.message);
        setLockedinDumpster(data.message[0]);
        setAvailabilityMessage(`${data.message.length} dumpsters are available for this time.`);
      } else {
        setAvailableDumpsters(-1);
        setAvailabilityMessage(`No dumpsters are available for this time.`);
      }

      return 'Success!';
    } catch (err) {
      setGetAvailableDumpsterError(err.message);
      return;
    }
  };

  const onAddRental = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customer,
          address_id: address,
          dumpster_id: lockedInDumpster,
          dropoff_date: lockedinDropoff,
          pickup_date: lockedinPickup,
        }),
      };
      const addResponse = await fetch(`${process.env.REACT_APP_API_URL}/rentals`, options);
      const addData = await addResponse.json();
      console.log('add data error message:', addData);
      // Check for any errors from the server
      if (addData.errorMessage) throw new Error(addData.errorMessage);
      // Update state for dumpsters and remove possible previous error messages
      setBookRentalErrorMessage('');
      setRentals((prevList) => [...prevList, addData.message]);
      console.log('Success adding a rental.');
      return 'Success!';
    } catch (err) {
      console.log('Error adding rental: ', err.message);
      setBookRentalErrorMessage(err.message);
      return;
    }
  };
  console.log('booking obj', {
    customer,
    address,
    lockedInDumpster,
    lockedinDropoff,
    lockedinPickup,
  });
  console.log(availableDumpsters);
  console.log('rentals:', rentals);
  return (
    <div className="add-rental-forms">
      {/*         Check availability form         */}
      <div className="form-container add-customer">
        <div className="add-form">
          <form id="check-dumpster-form">
            <div className="inputs">
              {/* Drop off input */}
              <div className="input">
                <label htmlFor="dropoff"> Drop off date: </label>
                <input
                  type="date"
                  id="dropoff"
                  value={dropoff}
                  name="dropoff"
                  onChange={(e) => {
                    setDropoff(e.target.value);
                  }}
                />
              </div>
              {/* Pick up input */}
              <div className="input">
                <label htmlFor="pickup"> Drop off date: </label>
                <input
                  type="date"
                  id="pickup"
                  value={pickup}
                  name="pickup"
                  onChange={(e) => {
                    setPickup(e.target.value);
                  }}
                />
              </div>
              {/* Dumpster size input */}
              <div className="input">
                <label htmlFor="selectSize"> Size: </label>
                <select
                  name="selectSize"
                  id="selectSize"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  <option>Please select a dumpster size...</option>
                  {sizeOptions}
                </select>
              </div>
            </div>
            <div className="button-options">
              <button
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  const addResponse = await onCheckAvailability();
                  if (addResponse === 'Success!') {
                    //reset state
                    // setName('');
                    // setPrice('');
                  }
                }}
              >
                Check Availability
              </button>
            </div>
          </form>
        </div>
        <p className="error center">{availabilityMessage}</p>
      </div>

      {/* Create a rental form */}
      <div className="form-container add-customer">
        <div className="add-form">
          <form id="add-rental-form">
            <div className="inputs">
              {/* Select Customer */}
              <div className="input">
                <label htmlFor="customer"> Customer: </label>
                <select
                  name="customer"
                  id="selectcustomerSize"
                  onChange={(e) => {
                    setCustomer(e.target.value);
                    console.log(JSON.stringify(e.target.value));
                    const findAddresses = () => {
                      const cust = allCustomers.filter((el) => {
                        return String(el.id) === e.target.value;
                      });
                      if (cust && cust[0]) setAllAddresses(cust[0].addresses);
                    };
                    findAddresses();
                  }}
                >
                  <option value="-1">Please select a customer...</option>
                  {customerOptions}
                </select>
              </div>
              {/* Select Address */}
              {customer !== '-1' ? (
                <div className="input">
                  <label htmlFor="address"> Address: </label>
                  <select
                    name="address"
                    id="address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  >
                    <option value="-1">Please select an address...</option>
                    {addressOptions}
                  </select>
                </div>
              ) : (
                <></>
              )}
              {/* Drop off input */}
              <div className="input">
                <label htmlFor="dropoff"> Drop off date: </label>
                <input
                  type="date"
                  id="dropoff"
                  value={lockedinDropoff}
                  name="dropoff"
                  onChange={(e) => {
                    setDropoff(e.target.value);
                  }}
                />
              </div>
              {/* Pick up input */}
              <div className="input">
                <label htmlFor="pickup"> Drop off date: </label>
                <input
                  type="date"
                  id="pickup"
                  value={lockedinPickup}
                  name="pickup"
                  onChange={(e) => {
                    setPickup(e.target.value);
                  }}
                />
              </div>
              {/* Dumpster size input */}
              <div className="input">
                <label htmlFor="size"> Dumpster Size: </label>
                <input
                  disabled
                  type="text"
                  id="size"
                  value={lockedInDumpster}
                  name="size"
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                />
              </div>
            </div>
            <div className="button-options">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  onAddRental();
                }}
              >
                Book Rental
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRental;
