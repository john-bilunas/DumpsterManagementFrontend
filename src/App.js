import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InventoryAndPricing from './components/InventoryAndPricing/InventoryAndPricing';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Header/>
    <main>
        {/* Render components in the main */}
      <Routes>
        <Route path= "/" element = {<Home/>}/>
        <Route path= "/Inventory" element= { <InventoryAndPricing/>}/>
        <Route path= "Customers" element = {<Customers/>}/>
        <Route path= "/Rentals" element= {<Rentals/>}/>
        
      </Routes>
    </main>
    <Footer/>
      
    </>
  );
}

export default App;
