import React from 'react'
import {Link} from "react-router-dom"
const Header = () => {
  return (
    <nav>
        <ul>
        <li>
                <Link to= "/">Home</Link>
            </li>
            <li>
                <Link to= "/Customers">Customers</Link>
            </li>
            <li>
                <Link to= "/Rentals">Rentals</Link>
            </li>
            <li>
                <Link to= "/Inventory">Inventory and Pricing</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Header;