import React, { useState } from 'react';
import AddAddress from './AddAddress';
const CustomerListItem = (props) => {
  const { customersList, setCustomersList, row } = props;
  //create state for important info
  const [id] = useState(props.id);
  const [firstName] = useState(props.row.first_name);
  const [lastName] = useState(props.row.last_name);
  const [phone, setPhone] = useState(props.row.phone);
  const [email, setEmail] = useState(props.row.email);
  const [isAddAddress, setIsAddAddress] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [editPhone, setEditPhone] = useState(phone);
  const [editEmail, setEditEmail] = useState(email);

  const [addAddressErrorMessage, setAddAddressErrorMessage] = useState('');
  const [updateCustomerErrorMessage, setUpdateCustomerErrorMessage] = useState('');
  const addSymbol = (
    <svg
      className="add-symbol size-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="edit-icon size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );

  const saveIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-save save-icon"
    >
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );

  const undoIcon = (
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
      className="lucide lucide-rotate-ccw undo-icon"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );

  //generate list items for addresses
  let addresses;
  if (props && props.row && props.row.addresses) {
    addresses = props.row.addresses.map((address) => {
      let addressText = `${address.house_number} ${address.street_name}, `; //`${}`

      if (address.apt !== null) addressText += `${address.apt}, `;
      addressText += `${address.city}, ${address.state} `;
      if (address.zip !== null) addressText += `${address.zip}`;
      // console.log(addressText)
      return <li>{addressText}</li>;
    });
  }

  console.log('row', props.row);
  const phoneFormat = `${phone.slice(0, 1)}-${phone.slice(1, 4)}-${phone.slice(4, 7)}-${phone.slice(
    -4
  )}`;

  // Parent event handler
  const onAddAddress = async ({ house_number, street_name, city, state, zip, apt }) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ customer_id: id, house_number, street_name, city, state, zip, apt }),
      };
      const addResponse = await fetch(`${process.env.REACT_APP_API_URL}/address`, options);
      const addData = await addResponse.json();
      console.log('add data error message:', addData);
      // Check for any errors from the server
      if (addData.errorMessage) throw new Error(addData.errorMessage);
      // Update state for dumpsters and remove possible previous error messages
      setAddAddressErrorMessage('');
      //Update the displayed customers addresses

      setCustomersList((prev) => {
        return prev.map((customer) => {
          if (!customer.addresses) customer.addresses = [];
          if (customer.id === id) {
            return {
              ...customer,
              addresses: [...customer.addresses, addData.message],
            };
          } else {
            return customer;
          }
        });
      });
      return 'Success!';
    } catch (err) {
      setAddAddressErrorMessage(err.message);
      return;
    }
  };

  const onUpdateCustomer = async () => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          first_name: row.first_name,
          last_name: row.last_name,
          phone: editPhone.length === 0 ? null : editPhone,
          email: editEmail.length === 0 ? null : editEmail,
        }),
      };

      const updateResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/customers/${row.id}`,
        options
      );
      const updatedData = await updateResponse.json();
      // Check if there was an error on the server
      if (updatedData.errorMessage) throw new Error(updatedData.errorMessage);
      console.log('updated data', updatedData);
      // Remove any previous errors
      setUpdateCustomerErrorMessage('');
      // Change is edit
      setIsEdit((prev) => false);

      // setCustomersList((prev) => { return prev.map((customer) => {
      //     if(customer.id === row.id){
      //         console.log('found id')
      //         return {...customer, ...updatedData.message};
      //     }else{
      //         return customer;
      //     }
      // })});
      setPhone(updatedData.message.phone);
      setEmail(updatedData.message.email);
    } catch (err) {
      //  Set error string for adding a dumpster
      setUpdateCustomerErrorMessage(err.errorMessage);
    }
  };
  console.log(isEdit);
  return (
    <div className="table-row">
      <div className="test">
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
      </div>

      <div className="row-extension-container">
        <div className="row-display-content">
          {/* {isEdit? 
                <>
                <span className= 'edit-button' onClick={() => {}}>{saveIcon}</span>
                <span className= 'edit-button' onClick={() => setIsEdit((prev) => !prev)}>{undoIcon}</span>
                </>:
                <span className= 'edit-button' onClick={() => setIsEdit((prev) => !prev)}>{editIcon}</span>} */}

          <div className="cell customer-name-column">{`${firstName} ${lastName}`}</div>
          {!isEdit ? (
            <>
              <div className="cell customer-phone-column">{phoneFormat}</div>
              <div className="cell customer-email-column">{email}</div>
            </>
          ) : (
            // change to inputs
            <>
              <input
                type="text"
                id="editphone"
                value={editPhone}
                name="editphone"
                className="cell customer-phone-column"
                onChange={(e) => {
                  setEditPhone(e.target.value);
                }}
              />
              <input
                type="text"
                id="editemail"
                value={editEmail}
                name="editemail"
                className="cell customer-email-column"
                onChange={(e) => {
                  setEditEmail(e.target.value);
                }}
              />
              {/* <div className= 'cell customer-phone-column'>{phoneFormat}</div>
                     <div className= 'cell customer-email-column'>{email}</div> */}
            </>
          )}

          <div className="cell customer-address-column">
            <ul>
              {Array.isArray(addresses) && addresses.length > 0 ? (
                <>{addresses}</>
              ) : (
                <>This customer does not have an address.</>
              )}
            </ul>
          </div>
        </div>
        <div className="row-additional-content">
          {isAddAddress ? (
            <AddAddress
              onAddAddress={onAddAddress}
              setIsAddAddress={setIsAddAddress}
              addSymbol={{ addSymbol }}
            />
          ) : (
            // <><button onClick= {() => { setIsAddAddress( (prev) => !prev)}}>Add Address</button></>}
            <div className="add-button-and-label-container">
              <button
                className="add-button"
                onClick={() => {
                  setIsAddAddress((prev) => !prev);
                }}
              >
                {addSymbol}
              </button>
              <div className="add-label">Add Address</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerListItem;
