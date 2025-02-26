import React from 'react'

const PricingItem = ({id, name, price, categoryId, current, onChangeActiveStatus}) => {


  return (
    <div className= 'table-row inventory-row'>
        <div>{name}</div>
        <div>{price}</div>
        <div>
            <button type= 'submit' onClick= { async (e) => {

                await onChangeActiveStatus({current: !current, id});
            }}>Archive</button>

        </div>
    </div> 
  )
}

export default PricingItem;