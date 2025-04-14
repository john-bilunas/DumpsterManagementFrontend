import React, { useState, useEffect } from 'react';

const DisplayInvoice = ({ onGetRentalItems, rental_id, fetchSwitch }) => {
  const [items, setItems] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      await onGetRentalItems(rental_id, setItems);
    };
    getItems();
  }, [onGetRentalItems, rental_id, fetchSwitch]);

  // This useEffect is used to create the table rows for the invoice
  useEffect(() => {
    let total = 0;
    const itemRows = items.map((el) => {
      total += el.price * el.quantity;
      return (
        <tr>
          <td>{el.name}</td>
          <td>{el.quantity}</td>
          <td>{`$${el.price}`}</td>
        </tr>
      );
    });
    // this is used to add the total row to the end of the table
    itemRows.push(
      <tr className="total-row">
        <td>Total</td>
        <td></td>
        <td>{`$${total}`}</td>
      </tr>
    );
    setTableRows(itemRows);
  }, [items]);

  console.log('rental items: ', items);
  return (
    <>
      {items.length === 0 ? (
        <div className="invoice-container">
          <h3>Invoice</h3>
          <p className="invoice-message">No invoice items to display.</p>
        </div>
      ) : (
        <div className="invoice-container">
          <h3>Invoice</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {tableRows}
          </table>
        </div>
      )}
    </>
  );
};

export default DisplayInvoice;
