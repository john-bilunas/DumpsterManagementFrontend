import React from 'react';
function SearchBar({ searchText, setSearchText }) {
  //create a function to handle the change of the search bar text
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <>
      <input
        className="search-bar"
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Filter..."
      />
    </>
  );
}

export default SearchBar;
