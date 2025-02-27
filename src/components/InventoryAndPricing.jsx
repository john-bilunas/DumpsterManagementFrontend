import React, {useState, useEffect} from 'react'
import Inventory from './InventoryAndPricing/Inventory/Inventory';
import Pricing from './InventoryAndPricing/Pricing/Pricing';
const InventoryAndPricing = () => {


    
  return (

    <div id= 'inventory-and-pricing-container'>
        <Inventory/>
        <Pricing/>
    </div>
  )
}

export default InventoryAndPricing