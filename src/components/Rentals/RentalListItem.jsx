import React, { useState, useEffect } from 'react';
import AddRentalItem from './AddRentalItem';
import DisplayInvoice from './DisplayInvoice';
const RentalListItem = ({
  fullName,
  dropoff,
  pickup,
  address,
  dumpster,
  phone,
  email,
  rental_id,
}) => {
  // Possible useEffect for when dates change to handle update.

  const trashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-trash-2"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );

  //switch is used to determine if the invoice needs to be updated in the interface
  const [fetchSwitch, setFetchSwitch] = useState(false);

  const flipSwitch = () => {
    setFetchSwitch((prev) => !prev);
  };

  const [isShowInvoice, setIsShowInvoice] = useState(false);
  const onGetRentalItems = async (id, setItems) => {
    try {
      const results = await fetch(`${process.env.REACT_APP_API_URL}/rentalItems/${id}`);
      const data = await results.json();

      if (data && data.errorMessage) {
        throw new Error(data.errorMessage);
      } else {
        //set state of customers list and reset any errors
        setItems(data.message);
        // setErrorMessage('');
      }
    } catch (err) {
      //set error state
      //   setErrorMessage(err.message);
    }
  };

  return (
    <div className="table-row">
      {/* <div className="top-left-icon">
        {isEdit ? (
          <>
            <div className="edit-button" onClick={onUpdateCustomer}>
              {saveIcon}
            </div>
            <div className="edit-button" onClick={() => setIsEdit((prev) => !prev)}>
              {undoIcon}
            </div>
          </>
        ) : (
          <div className="edit-button" onClick={() => setIsEdit((prev) => !prev)}>
            {editIcon}
          </div>
        )}
      </div> */}
      <div className="toggle-icon">
        <span
          className="toggle"
          onClick={() => {
            setIsShowInvoice((prev) => !prev);
          }}
        >
          {isShowInvoice === false ? 'Show invoice' : 'Hide invoice'}
        </span>
      </div>
      <div className="entire-row-container toggle-row">
        <div className="row-display-content">
          <div className="cell rental-name-column">{fullName}</div>
          <div className="cell rental-dropoff-column">{dropoff}</div>
          <div className="cell rental-pickup-column">{pickup}</div>
          <div className="cell rental-address-column">{address}</div>
          <div className="cell rental-dumpster-column">{dumpster}</div>
          <div className="cell rental-phone-column">{phone}</div>
          <div className="cell rental-email-column">{email}</div>
        </div>
        {isShowInvoice === false ? (
          <> </>
        ) : (
          <div className="row-additional-content rental-additional-content">
            <AddRentalItem rental_id={rental_id} flipSwitch={flipSwitch} />
            <DisplayInvoice
              onGetRentalItems={onGetRentalItems}
              rental_id={rental_id}
              fetchSwitch={fetchSwitch}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalListItem;
