import React, { useState, useEffect } from 'react';

const RentalListItem = ({ fullName, dropoff, pickup, address, dumpster, phone, email }) => {
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
      <div className="top-left-icon"></div>
      <div className="entire-row-container">
        <div className="row-display-content">
          <div className="cell rental-name-column">{fullName}</div>
          <div className="cell rental-dropoff-column">{dropoff}</div>
          <div className="cell rental-pickup-column">{pickup}</div>
          <div className="cell rental-address-column">{address}</div>
          <div className="cell rental-dumpster-column">{dumpster}</div>
          <div className="cell rental-phone-column">{phone}</div>
          <div className="cell rental-email-column">{email}</div>
        </div>
        <div className="row-additional-content"></div>
      </div>
    </div>
  );
};

export default RentalListItem;
