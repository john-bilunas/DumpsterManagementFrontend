import React from 'react'

const PricingItem = ({id, name, price, categoryId, current, onChangeActiveStatus}) => {


  return (
    <div className= 'table-row inventory-row'>
        <div className= 'pricing-name-column'>{name}</div>
        <div className= 'pricing-price-column'>{price}</div>
        <div className= 'pricing-archive-column'>
            <button type= 'submit' onClick= { async (e) => {

                await onChangeActiveStatus({current: !current, id});
            }}>Archive</button>

        </div>
    </div> 
  )
}

export default PricingItem;